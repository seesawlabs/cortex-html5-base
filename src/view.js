/* global window */

import Placeholder from './placeholder.js';
import Logger from './logger.js';
// import Tracker from './tracker.js';

// const CAMPAIGN = 'com.cortexpowered.campaigns.test-campaign';

class View {
  constructor() {
    this.placeholder = new Placeholder();

    this.rows = [];
    this.currentRow = 0;
    this.deviceId = '';

    this.container = window.document.getElementById('container');
    this.adId = "ad";
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
   */
  setData(data) {
    this.rows = data;

    if (data && data.length > 0) {
      this.deviceId = data[0]._device_id;
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
   *
   */
  updateView() {
    if (window.googletag) {
      Logger.log("Enabling GPT services and displaying ad");

      window.googletag.cmd.push(function () {
        window.googletag.enableServices();
        window.googletag.display(this.adId);
      }.bind(this));
    }
  }

  createAdUnit() {
    Logger.log("Creating new ad unit");
    var div = window.document.createElement("div");
    div.style = "width:1080px;height:1920px;";
    div.id = this.adId;
    this.container.appendChild(div);

    window.googletag.cmd.push(function() {
      window.googletag.defineSlot('/6075/kiran-dooh', [1080, 1920], this.adId)
        .addService(window.googletag.pubads());
      window.googletag.pubads().set("page_url", "https://www.google.com");
      window.googletag.pubads().enableSingleRequest();
    }.bind(this));
  }

  destroyAdUnit() {
    if (window.googletag) {
      Logger.log("Destroying old ad slots");
      window.googletag.destroySlots();
    }

    var unit = window.document.getElementById(this.adId);
    if (unit && unit.parentNode) {
      Logger.log("Destroying old ad unit");
      unit.parentNode.removeChild(unit);
    }
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
    this.currentRow += 1;
    if (this.currentRow >= this.rows.length) {
      this.currentRow = 0;
    }
    Logger.log(`The view has ${this.rows.length} data rows. ` +
               `Displaying row #${this.currentRow}.`);

    this.destroyAdUnit();
    this.createAdUnit();
  }
}

module.exports = View;
