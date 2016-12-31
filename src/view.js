/* global window */

import Placeholder from './placeholder.js';
import axios from 'axios';
import Logger from './logger.js';

// import moment from 'moment';
// import moment from 'moment-timezone';

class View {
  constructor() {
    this.placeholder = new Placeholder();
    this.media = null;
    this.createInitialDom();
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
  setData(data) {
  }

  /**
   * Render the placeholder or the main view.
   *
   * Every time the app receives a 'hidden' event this method will get called.
   */
  render() {
    if (this.media) {
      return;
    }
    axios
      .get('https://api.wetmet.net/mediaapi/geturl.php?user_key=YXBpQHBtdmIuY29t&private_key=b034f751-f663-f557-2a82-76fdf69934b3&media_source=115-27-01&media_item=current&media_extension=mp4')
      .then(response => {
        Logger.log('RESPONSE', response.data);
        this.media = response.data;
      });
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
    if (this.video.src === this.media) {
      return;
    }
    // For this app, we don't need to do anything.
    this.video.src = this.media;
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

  create(tag, className) {
    const el = window.document.createElement(tag);
    el.className = className;
    el.id = className;
    return el;
  }

  createInitialDom() {
    this.div = window.document.getElementById('container');

    const tv = this.create('div', 'tv');
    const img = this.create('img', 'tv-image');
    img.src = 'assets/images/tv.png';
    tv.appendChild(img);

    this.video = this.create('video', 'content');
    this.video.autoplay = true;

    this.div.appendChild(this.video);
    this.div.appendChild(tv);
    this.updateView();
  }
}

module.exports = View;
