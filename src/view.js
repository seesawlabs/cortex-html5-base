/* global window */

import Placeholder from './placeholder.js';
import Logger from './logger.js';
import Tracker from './tracker.js';

// TODO: Change this.
const CAMPAIGN = 'com.cortexpowered.campaigns.test-campaign';

class View {
  constructor() {
    this.placeholder = new Placeholder();

    this.rows = [];
    this.currentRow = 0;
    this.deviceId = '';

    this.container = window.document.getElementById('container');
  }

  cleanImages() {
    // Sanity Checks
    if (!this.container || !this.rows || this.rows.length === 0)
      return;

    // Clean up container
    if (this.container && this.rows && this.rows.length) {
      this.rows.forEach(row => {
        // If this element isn't the parent
        if (row.img.parentNode !== this.container)
          return;
        this.container.removeChild(row.img);
      });
    }
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
    if (!data || data.length === 0)
      return;

    if (data && data.length > 0) {
      this.deviceId = data[0]._device_id;
      this.cleanImages();
      this.rows = data.map(row => {
        const img = new window.Image();
        img.src = row.image.url;
        img.className = 'slide';
        return {img};
      });
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
      Tracker.track(this.deviceId, CAMPAIGN, 'placeholder');
      this.placeholder.render();
      return;
    }

    this.placeholder.hide();
    Tracker.track(this.deviceId, CAMPAIGN, 'normal');
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
   * TODO: Implement this method according to your needs.
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
    this.cleanImages();
    if (this.currentRow >= this.rows.length) {
      this.currentRow = 0;
    }
    const row = this.rows[this.currentRow++];
    this.setItem(row);
  }

  setItem(item) {
    this.container.appendChild(item.img);
  }

}

module.exports = View;
