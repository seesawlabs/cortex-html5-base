/* global window */

import Placeholder from './placeholder.js';
import Logger from './logger.js';

// const CAMPAIGN = 'com.cortexpowered.campaigns.open-loop';
const IFRAME = 'https://dp.openloop.media/ise/US/YouTube-e/StreetNewYork/LNKNYC/sync/';

const IFRAME_TIMEOUT = 5000;

class View {
  constructor() {
    this.placeholder = new Placeholder();
    // Hold off on rendering the placeholder just yet. We need to check
    // and see if the iFrame source is available (below).

    this.container = window.document.getElementById('container');

    // Create the iFrame (but don't append yet)
    this.frame = window.document.createElement('iframe');
    this.frame.className = 'content';
    this.frame.id = 'content';
    this.frame.width = '100%';
    this.frame.height = '100%';

    // Create the dyanamic script tag. We need this to test whether the iFrame
    // endpoint is even available to display. Checking for iFrame load errors
    // by setting iframe.src directly is next to impossible, and using XMLHttpRequest
    // objects results in cross origin request issues. This is a workaround for
    // making sure that the iFrame source URL is actually live before trying to render it.
    // This way we can react appropriately by potentially displaying the placeholder
    // instead of a nasty 404 page.
    this.script = window.document.createElement('script');

    this.loaded = false;
    this.timedOut = false;

    this.script.onload = function() {
      // The iframe is confirmed to be loadable. Let's append it now.
      this.loaded = true;
      Logger.log('iFrame source confirmed operational.');
      this.container.appendChild(this.frame);
    }.bind(this);

    // Attach and begin load
    this.script.src = IFRAME;
    this.container.appendChild(this.script);

    // Wait a bit for a response.
    window.setTimeout(function() {
      if (!this.loaded) {
        // We waited, and the iframe failed to load. Assume that the endpoint
        // is down and display the placeholder.
        Logger.log('The iFrame source is unavailable!');
        this.timedOut = true;
        this.placeholder.render();
      }
    }.bind(this), IFRAME_TIMEOUT);
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
    // This creative doesn't use any data
  }

  /**
   * Render the placeholder or the main view.
   *
   * Every time the app receives a 'hidden' event this method will get called.
   */
  render() {
    if (this.timedOut) {
      Logger.log('iFrame source timed out. Skipping render.');
      return;
    }

    Logger.log('Rendering new view with iFrame src: ' + IFRAME);

    if (this.frame && this.frame.src === "") {
      this.frame.src = IFRAME;
    }
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
  }
}

module.exports = View;
