/* global window */
import _first from 'lodash/first';

import Placeholder from './placeholder.js';
import Logger from './logger.js';

const GAME = 'cavalierswarriors';

class View {
  constructor() {
    this.placeholder = new Placeholder();

    this.rows = [];
    this.current = 1;
    this.deviceId = '';

    // Current Game
    this.game = null;

    this.container = window.document.getElementById('container');
  }

  isMyGame(row) {
    return (row.away_name + row.home_name).toLowerCase() === GAME ||
      (row.home_name + row.away_name).toLowerCase() === GAME;
  }

  gameInProgress(row) {
    return row.status !== 'SCHEDULED';
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

    if (!this.rows.length) {
      return;
    }

    this.game = _first(this.rows
      .filter(this.isMyGame)
      .filter(this.gameInProgress));

    if (this.game && this.game.status.toLowerCase() !== 'scheduled') {
      this.placeholder.hide();
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
    this.container.className = `bg${this.current}`;
    this.current = this.current === 1 ? 2 : 1;

    // For this app, we don't need to do anything.
    if (!this.game) {
      this.container.innerHTML = '';
      return;
    }

    let status = `<span>${this.game.clock}</span> ${this.ndth(this.game.period)} QTR`;

    // if (this.game && this.game.status.toLowerCase() === 'final') {
    //   this.container.innerHTML = `<img src="assets/images/post-game.jpg" />`;
    //   return;
    // }

    switch (this.game.status.toLowerCase()) {
      // Handle end of periods and halftime
      case "end of period":
        if (this.game.period === 2) {
          status = 'Halftime';
        } else {
          status = `End of ${this.ndth(this.game.period)}`;
        }
        break;
      case "final":
      case "full time":
        status = 'FINAL SCORES';
        break;
      default:
        break;
    }

    const html = `
      <div class="output">
        <div class="team team1">
          <div class="team-name">${this.game.away_name}</div>
          <div class="team-score">${this.game.away_score}</div>
        </div>

        <div class="team team2">
          <div class="team-name">${this.game.home_name}</div>
          <div class="team-score">${this.game.home_score}</div>
        </div>
        <div class="status">${status}</div>
      </div>
    `;

    this.container.innerHTML = html;
  }

  ndth(number) {
    switch (number) {
      case 1: return '1st';
      case 2: return '2nd';
      case 3: return '3rd';
      case 4: return '4th';
      default: return '';
    }
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
