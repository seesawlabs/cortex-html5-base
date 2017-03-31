/* global window */

import Placeholder from './placeholder.js';
import Logger from './logger.js';

// TODO: Change this.
// const CAMPAIGN = 'com.cortexpowered.campaigns.test-campaign';

class View {

  constructor() {
    this.placeholder = new Placeholder();

    this.rows = [];
    this.currentRow = 0;
    this.deviceId = '';
    this.adSlots = {}

    this.container = window.document.getElementById('container');
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
   * TODO: Implement this method according to your needs.
   *
   * @param {array} data The data rows.
   */
  setData(data) {
    this.rows = data;
  }

  setUpAdUnit(city, venue) {
    switch (city) {
      case "New York":
        city = null
        break;
      case "Staten Island":
        city = "StatenIsland"
        break;
      default:
        break;
    }

    const id = `ad_${city || 'NY'}_${Date.now()}`;
    this.container.appendChild(this.createElement(id, 'ad'));

    window.googletag.cmd.push(() => {
      const unit = `/148446784/Link.NYC${city ? '-' + city : ''}`;
      window.googletag
        .defineSlot(unit, [1080, 1920], id)
        // .setTargeting('Venue', [venue])
        .addService(window.googletag.pubads())
    });

    window.googletag.cmd.push(() => {
      window.googletag.pubads().enableSingleRequest();
      window.googletag.enableServices();
      window.googletag.display(id);
    })
  }

  createElement(id, className, tag = 'div') {
    const element = document.createElement(tag)
    element.classList.add(className)
    element.id = id

    return element
  }

  /**
   * Render the placeholder or the main view.
   *
   * Every time the app receives a 'hidden' event this method will get called.
   */
  render() {
    if (!this.rows || !this.rows.length) {
      return;
    }

    this._render();
    return;
    // Logger.log('Rendering a new view.');
    // if (this.rows === null || this.rows.length === 0) {
    //   Tracker.track(this.deviceId, CAMPAIGN, 'placeholder');
    //   this.placeholder.render();
    //   return;
    // }
    //
    // this.placeholder.hide();
    // Tracker.track(this.deviceId, CAMPAIGN, 'normal');
    // this._render();
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
   *
   * TODO: Implement this method according to your needs.
   */
  updateView() {
    // For this app, we don't need to do anything.

    const {
      city,
      _index,
    } = this.rows[this.currentRow];

    this.currentRow++;
    if (this.currentRow >= this.rows.length) {
      this.currentRow = 0;
    }

    this.setUpAdUnit(city, _index);
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
    // while(this.container.firstChild) {
    //   this.container.removeChild(this.container.firstChild)
    // }
  }
}

module.exports = View;
