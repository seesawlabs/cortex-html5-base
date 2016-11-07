/* global window */

import Placeholder from './placeholder.js';
import Logger from './logger.js';

// import moment from 'moment';
// import moment from 'moment-timezone';

class View {
  constructor() {
    this.placeholder = new Placeholder();
    this.createInitialDom();
    this.timeZone = 'America/New_York';
  }

  cleanImages() {
    // Sanity Checks
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
  setData(data) { }

  /**
   * Render the placeholder or the main view.
   *
   * Every time the app receives a 'hidden' event this method will get called.
   */
  render() { }

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
  _render() { }

  setItem(item) { }

  createInitialDom() {
    Logger.log('Creating initial DOM');

    let elect = 1478656800000;
    console.log(this.calculate(elect - (new Date()).valueOf()));
    this.div = window.document.getElementById('container');
  }
  calculate(t) {
    let cd = 24 * 60 * 60 * 1000;
    let ch = 60 * 60 * 1000;
    let days = Math.floor(t / cd);
    let hours = Math.floor((t - days * cd) / ch);
    let minutes = Math.round((t - days * cd - hours * ch) / 60000);

    let pad = function(n) {
      return n < 10 ? '0' + n : n;
    };
    if (minutes === 60) {
      hours++;
      minutes = 0;
    }
    if (hours === 24) {
      days++;
      hours = 0;
    }
    hours = pad(hours);
    minutes = pad(minutes);
    return {days, hours, minutes};
  }
}

module.exports = View;
