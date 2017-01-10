/* global window */

import Placeholder from './placeholder.js';
import Logger from './logger.js';

const MAX_DIFFERENCE = 30;

class View {
  constructor() {
    this.placeholder = new Placeholder();
    this.placeholder.render();
    this.rows = [];
    this.show = false;
    this.current = 0;
    this.createInitialDom();
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
    if (!data || data.length === 0)
      return;
    this.rows = data;
  }

  convertCtoF(val) {
    return val * 1.8 + 32;
  }

  tempDifference(val1, val2, max) {
    return Math.abs(val1 - val2) > max;
  }

  /**
   * Render the placeholder or the main view.
   *
   * Every time the app receives a 'hidden' event this method will get called.
   */
  render() {
    this.bermuda = this.rows.filter(item => {
      return item.name === 'Bermuda';
    });
    this.manhattan = this.rows.filter(item => {
      return item.name === 'Manhattan';
    });

    this.show = false;

    if (this.bermuda.length === 0 || this.bermuda.length === 0) {
      return;
    }

    this.bermuda = this.convertCtoF(this.bermuda[0].main.temp);
    this.manhattan = this.convertCtoF(this.manhattan[0].main.temp);

    this.show = this.tempDifference(
      this.bermuda,
      this.manhattan,
      MAX_DIFFERENCE
    );

    Logger.log(this.show);
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
    if (this.show) {
      // Update the DOM
      this.manhattanDiv.innerHTML = `${Math.round(this.manhattan)}°`;
      this.bermudaDiv.innerHTML = `${Math.round(this.bermuda)}°`;

      // Hide the placeholder
      this.placeholder.hide();
      return;
    }

    this.placeholder.show();
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
    this.placeholder.show();
  }

  create(tag, className) {
    const el = window.document.createElement(tag);
    el.className = className;
    el.id = className;
    return el;
  }

  createInitialDom() {
    this.div = window.document.getElementById('container');
    this.manhattanDiv = this.create('div', 'man-temp');
    this.bermudaDiv = this.create('div', 'bermuda-temp');

    this.div.appendChild(this.manhattanDiv);
    this.div.appendChild(this.bermudaDiv);
  }
}

module.exports = View;
