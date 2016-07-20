/* global window */

import Placeholder from './placeholder.js';
import Logger from './logger.js';

const NYC_CO_NAMESCAPE = 'nyc-co-';

class View {
  constructor() {
    this.placeholder = new Placeholder();

    this.rows = [];
    this.images = [];
    this.currentRow = 0;

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
    this.rows = data;

    // Clean up container
    this.images.forEach(item => {
      this.mainDiv.removeChild(item.element);
    });

    this.images = [];

    this.rows.forEach(row => {
      const img = new window.Image();
      img.id = `nyc-co-${row.id}`;
      img.src = row.source.source_url;
      img.className = 'invisible slide';

      this.mainDiv.appendChild(img);
      this.images.push({element: img});
    });
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
    if (this.currentRow >= this.rows.length) {
      this.currentRow = 0;
    }

    const row = this.rows[this.currentRow];
    this.currentRow += 1;
    const img = window.document.getElementById(NYC_CO_NAMESCAPE + row.id);

    img.className = 'visible slide';
    this.mainBar.innerHTML = row.user.username;
    this.mainAvatar.src = row.user.avatar;
  }

  createInitialDom() {
    this.div = window.document.getElementById('container');

    this.mainDiv = window.document.createElement('div');
    this.mainDiv.className = 'placeholder nyc-co-main';

    this.mainImg = window.document.createElement('img');
    this.mainImg.src = "assets/images/nyc-co-copy.png";
    this.mainImg.className = 'nyc-co-copy';

    this.mainLogo = window.document.createElement('img');
    this.mainLogo.src = "assets/images/nyc-co.png";
    this.mainLogo.className = 'nyc-co-logo';

    this.mainBar = window.document.createElement('div');
    this.mainBar.className = 'nyc-co-bar';

    this.mainAvatar = window.document.createElement('img');
    this.mainAvatar.className = 'nyc-co-avatar';

    this.div.appendChild(this.mainDiv);
    this.mainDiv.appendChild(this.mainAvatar);
    this.mainDiv.appendChild(this.mainBar);
    this.mainDiv.appendChild(this.mainImg);
    this.mainDiv.appendChild(this.mainLogo);
  }
}

module.exports = View;
