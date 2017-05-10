/* global window */

import Logger from './logger.js';

// const CAMPAIGN = 'com.cortexpowered.campaigns.test-campaign';

var moment = require('moment');

class View {
  constructor() {
    this.container = window.document.getElementById('container');

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
    // This creative does not use any data
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
    var now = moment();
    var fivePM = moment().startOf('day').add(17, 'hours');
    var hours = 0;
    var minutes = 0;
    var minutesOnes = 0;
    var minutesTens = 0;

    if (now.isBefore(fivePM)) {
      // Calculate time left
      var diff = fivePM.valueOf() - now.valueOf();
      var duration = moment.duration(diff);
      hours = Math.min(duration.hours(), 9); // Cap hours at 9
      minutes = duration.minutes() + 1; // add one so that the timer hits zero at EXACTLY 5pm
      minutesTens = (minutes < 10) ? '0' : String(minutes)[0];
      minutesOnes = (minutes < 10) ? String(minutes) : String(minutes)[1];
    }

    this.hourElement.innerHTML = hours;
    this.minuteTensElement.innerHTML = minutesTens;
    this.minuteOnesElement.innerHTML = minutesOnes;
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
  }
}

module.exports = View;
