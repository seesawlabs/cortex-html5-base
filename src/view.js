/* global window */

import Logger from './logger.js';

// const CAMPAIGN = 'com.cortexpowered.campaigns.test-campaign';

var moment = require('moment-timezone');

class View {
  constructor() {
    this.container = window.document.getElementById('container');
    this.rows = [];

    this.updateInterval = null;

    this.hourElement = window.document.getElementById('hour');
    this.minuteTensElement = window.document.getElementById('minute-tens');
    this.minuteOnesElement = window.document.getElementById('minute-ones');
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
  }

  /**
   * Render the placeholder or the main view.
   *
   * Every time the app receives a 'hidden' event this method will get called.
   */
  render() {
    Logger.log('Rendering a new view.');

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
    this.updateInterval = window.setInterval(() => {
      // SBC devices are configured in the GMT timezone, but are in NYC.
      // For that reason we have to count down to 9pm GMT, which is
      // 5pm EDT (at least for the duration of this creative's lifetime).
      var now = Date.now();
      var fivePM = new Date().setHours(21, 0, 0, 0);

      var hours = 0;
      var minutes = 0;
      var seconds = 0;
      var minutesTens = '0';
      var minutesOnes = '0';

      Logger.log(`Now (ms): ${now}, Target (ms): ${fivePM}`);

      if (now < fivePM) {
        // Calculate time left
        var diff = fivePM - now;
        seconds = Math.floor((diff / 1000) % 60);
        minutes = Math.floor((diff / (1000 * 60)) % 60);
        hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

        hours = Math.min(hours, 9); // Cap hours at 9
        minutes += 1; // add one so that the timer hits zero at EXACTLY 5pm
        minutesTens = (minutes < 10) ? '0' : String(minutes)[0];
        minutesOnes = (minutes < 10) ? String(minutes) : String(minutes)[1];

        Logger.log(`Difference is ${hours}:${minutes}:${seconds}`);
      }

      this.hourElement.innerHTML = String(hours);
      this.minuteTensElement.innerHTML = minutesTens;
      this.minuteOnesElement.innerHTML = minutesOnes;
    }, 1000);
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
   */
  _render() {
    window.clearInterval(this.updateInterval);
  }
}

module.exports = View;
