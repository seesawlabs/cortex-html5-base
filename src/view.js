/* global window */

import Placeholder from './placeholder.js';
import Logger from './logger.js';

// TODO: Change this.
// const CAMPAIGN = 'com.cortexpowered.campaigns.test-campaign';

class View {
  constructor() {
    this.placeholder = new Placeholder();

    this.rows = [];
    this.currentRow = 0;
    this.deviceId = '';

    this.roundName = window.document.getElementById('round-name');
    this.eventName = window.document.getElementById('event-name');
    this.playerOne = window.document.getElementById('player-1');
    this.playerTwo = window.document.getElementById('player-2');
    this.playerStatsOne = window.document.getElementById('stats-player1-name');
    this.playerStatsTwo = window.document.getElementById('stats-player2-name');
    this.playerOneCountry = window.document.getElementById('player-1-country');
    this.playerTwoCountry = window.document.getElementById('player-2-country');
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
    this.rows = data.filter(row => {
      if (row.details.Type !== 'S') {
        return false;
      }
      return true;
    });

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
    if (this.rows === null || this.rows.length === 0 || this.rows[0]._index === "empty") {
      this.placeholder.render();
      return;
    }
    this.placeholder.hide();
    this._render();
  }

  clearScores() {
    const points = window.document.getElementsByClassName('stats-points');
    Array.from(points).forEach(point => {
      point.innerText = "";
    });
  }

  loadScores(scores, playerNumber) {
    scores.forEach(row => {
      const point = window.document.getElementById(`player-${playerNumber}-point-${row.Set}`);
      point.innerText = row.Score;
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
    Logger.log(`The view has ${this.rows.length} data rows. ` +
               `Displaying row #${this.currentRow}.`);
    const row = this.rows[this.currentRow];
    this.currentRow += 1;
    this.eventName.innerText = row.details.Event;
    this.roundName.innerText = row.details.RoundName;
    this.playerOne.innerText = row.team1_players[0].ShortName;
    this.playerTwo.innerText = row.team2_players[0].ShortName;
    this.playerStatsOne.innerText = row.team1_players[0].LastName;
    this.playerStatsTwo.innerText = row.team2_players[0].LastName;
    this.playerOneCountry.innerText = `(${row.team1_players[0].Nationality})`;
    this.playerTwoCountry.innerText = `(${row.team2_players[0].Nationality})`;
    this.clearScores();
    this.loadScores(row.team1_scores, 1);
    this.loadScores(row.team2_scores, 2);
  }
}

module.exports = View;
