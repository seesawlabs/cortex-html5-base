/* global window */

import Placeholder from './placeholder.js';
import Logger from './logger.js';
import moment from 'moment';
import 'moment-timezone';

class View {
  constructor() {
    this.placeholder = new Placeholder();

    this.rows = [];
    this.currentRow = 0;
    this.deviceId = '';

    this.creativeContainer = window.document.getElementById(
    'creativeContainer');
    this.creativeHeaderAsOf = window.document.getElementById(
    'creativeHeaderAsOf');

    this.domElements = {};
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
      this.placeholder.render();
      return;
    }
    this.placeholder.hide();
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

  addList(rows) {
    const normal = 'Good Service';
    const asofLondon = moment.tz(rows[0].asof, 'Europe/London');
    const asOf = moment(asofLondon, ["HH mm"]).format("HH:mm");
    this.creativeHeaderAsOf.innerHTML = `as of ${asOf}`;
    rows.forEach(line => {
      this.domElements[line.line_id] = window.document.getElementById(line.line_id);
      this.domElements[`status-${line.line_id}`] = window.document.getElementById(`status-${line.line_id}`);
      this.domElements[line.line_id].innerHTML = line.name;
      this.domElements[`status-${line.line_id}`].innerHTML = line.status;
      this.domElements[`status-${line.line_id}`].classList.remove('not-good');
      if (line.status !== normal) {
        this.domElements[`status-${line.line_id}`].classList.add('not-good');
      }
    });
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
    this.creativeContainer.style.display = 'block';
    this.addList(this.rows);
  }
}

module.exports = View;
