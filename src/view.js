/* global window */

import Placeholder from './placeholder.js';
import Logger from './logger.js';

class View {
  constructor() {
    this.placeholder = new Placeholder();
    this.rows = [];
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

  /**
   * Render the placeholder or the main view.
   *
   * Every time the app receives a 'hidden' event this method will get called.
   */
  render() {
    Logger.log('Rendering a new view.', this.rows);
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
    Logger.log(this.rows);

    if (this.current >= this.rows.length) {
      this.current = 0;
    }
    this.text.innerHTML = this._createTweet(this.rows[this.current]);

    this.current++;
  }

  _parseLinks(text) {
    const r = /(^|\s)(#|@)(\w*[a-zA-Z_]+\w*)/ig;
    return text.replace(r, ' <a href="#">$2$3</a>');
  }

  _createTweet(tweet) {
    return `<div><strong>@${tweet.posted_by.screen_name}</strong><p>${this._parseLinks(tweet.text)}</p></div>`;
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

  create(tag, className) {
    const el = window.document.createElement(tag);
    el.className = className;
    el.id = className;
    return el;
  }

  createInitialDom() {
    this.div = window.document.getElementById('container');
    this.text = this.create('div', 'twitterText');

    const bg = new window.Image();
    bg.src = 'assets/images/thanksgiving.png';
    bg.id = 'containerBackground';
    bg.className = 'containerBackground';
    this.div.appendChild(bg);
    this.div.appendChild(this.text);
  }
}

module.exports = View;
