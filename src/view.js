/* global window */

import Placeholder from './placeholder.js';
import Logger from './logger.js';
import Geofencing from './geofencing.js';
import moment from 'moment';
import 'moment-timezone';
// import Tracker from './tracker.js';

// const CAMPAIGN = 'com.linknyc.campaigns.oem';

class View {
  constructor() {
    this.placeholder = new Placeholder();

    this.rows = [];
    this.currentRow = 0;
    this.deviceId = '';
    this.latitude = 0;
    this.longitude = 0;
    this.container = window.document.getElementById('container');
    this.updated = window.document.getElementById('oem-updated');
    this.header = window.document.getElementById('oem-header');
  }

  /**
   * Set the incoming data from Silo.
   *
   * This method will only get called when the app is no longer visible on the
   * screen. The Incoming data is expected to be a non-empty array of objects
   * as retreived from Silo.
   *
   * This method is a good place to manipulate the incoming data as needed.
   *
   * It is strongly recommended to preload/cache images or any other media
   * files. Consider creating the necessary invisible DOM elements in this
   * method. In the render() method you can make the needed elements visible.
   *
   * e.g.
   * setData(rows) {
   *   for (const row of rows) {
   *     const img = new window.Image();
   *     img.src = row.image_url;
   *     img.onerror = () => {
   *       // log error
   *     }
   *     img.className = 'invisible';
   *     this.container.appendChild(img);
   *     this.images.push(img);
   *   }
   * }
   *
   * _render() {
   *   const img = this._selectImg();
   *   img.className = 'visible';
   * }
   *
   * @param {array} data The data rows.
   * @param {string} tag The tag denoting which dataset this data is coming from
   */
  setData(data, tag) {
    if (tag === 'loc') {
      // This is location data. Just need to extract lat/long.
      if (data && data.length > 0) {
        const locData = data[0];
        this.deviceId = locData._device_id;
        this.latitude = locData.latitude;
        this.longitude = locData.longitude;
        Logger.log(`Device ${this.deviceId} has coordinates ` +
                   `(${this.latitude}, ${this.longitude})`);
      }
    } else if (tag === 'oem') {
      // This is emergency alert data
      // Note: It may be possible for this data to get set prior to the location data coming in.
      // In that case, lat/long will be the coordinate (0,0) which is technically valid, but not in NY.
      // Any alert tied to an explicit lat/long will then just be filtered out as usual.
      this.rows = data;

      if (data && data.length > 0) {
        // Filter alerts to only include those that are relevant to this device
        // based on its lat/long coordinate.
        this.rows = this.rows.filter(alert => {
          if (alert.area !== undefined) {
            const area = JSON.parse(alert.area);

            // Alerts that don't have an array of polygons are relevant to ALL devices.
            if (!Array.isArray(area)) {
              Logger.log(`Alert ${alert.cap_id} is relevant to all devices. area is not an array.`);
              return true;
            }

            const polygons = area.map(o => {
              return o.polygon;
            }).filter(poly => {
              return poly !== undefined;
            }).map(poly => {
              return Geofencing.stringToPolygon(poly);
            });

            // The device needs to be within SOME polygon in the given area; there may be many.
            return polygons.some((poly, index, arr) => {
              return Geofencing.latLongWithinPolygon(this.latitude, this.longitude, poly);
            });
          }

          // This row doesn't look like an alert, ignore it.
          return false;
        });

        Logger.log(`${this.rows.length} rows survived alert pruning with device coordinates (${this.latitude},${this.longitude})`);
      }
    }
  }

  /**
   * Render the placeholder or the main view.
   *
   * Every time the app receives a 'hidden' event this method will get called.
   */
  render() {
    Logger.log('Rendering a new view.');
    if (this.rows === null || this.rows.length === 0) {
      // Tracker.track(this.deviceId, CAMPAIGN, 'placeholder');
      this.placeholder.render();
      return;
    }

    this.placeholder.hide();
    // Tracker.track(this.deviceId, CAMPAIGN, 'normal');
    this._render();
  }

  /**
   * Update the view before displaying it on the screen.
   *
   * Every time the app receives a 'visible' event this method will get called.
   * This is the place to make changes to the view before it becomes visible
   * on the screen. For instance, if you want to display the current time
   * accurately, you should update the time data on this method.
   *
   * Prefer rendering the view in this._render() as much as possible as that
   * method will get called when the app is in the background. Only implement
   * this method when you need to perform some actions right before the view
   * becomes visible on the screen.
   */
  updateView() {
    // For this app, we don't need to do anything.
  }

  /**
   * Handles rendering of the main view.
   *
   * This method will get called every time the app receives a 'hidden' event
   * and we have data stored in this.rows. This is the place where you actually
   * render some content on the screen based on the incoming dynamic data.
   *
   * Current implementation simply iterates over rows and displays a single row
   * every time the app is visible on the screen.
   *
   * It is important to be as efficient as possible in this method. Try to
   * make as few DOM manipulations as possible. Reusing DOM elements is better
   * than recreating them every time this method is called.
   *
   * TODO: Implement this method according to your needs.
   */
  _render() {
    this.container.style.display = 'block';
    if (this.currentRow >= this.rows.length) {
      this.currentRow = 0;
    }
    Logger.log(`The view has ${this.rows.length} data rows. ` +
               `Displaying row #${this.currentRow}.`);
    const row = this.rows[this.currentRow];
    this.currentRow += 1;

    const updatedNY = moment.tz(row.sent, 'America/New_York');
    const updated = moment(updatedNY, ["HH mm"]).format("MM/DD/YYYY [at] hh:mm A");
    this.header.innerText = [row.severity, row.event].join(' ').replace(/(\b\S+\b)\s+\b\1\b/ig, '$1');
    this.updated.innerText = `Issued: ${updated}`;
    this.container.className = '';
    this.container.classList.add(row.severity.toLowerCase());
  }
}

module.exports = View;
