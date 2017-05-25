/* global window */

import Placeholder from './placeholder.js';
import Logger from './logger.js';
// import Tracker from './tracker.js';

// const CAMPAIGN = 'com.cortexpowered.campaigns.ny-lotto';

class View {
  constructor() {
    this.placeholder = new Placeholder();

    this.rows = [];
    this.currentRow = 0;
    this.deviceId = '';

    this.container = window.document.getElementById('container');
    this.megamillionsJackpotSpan = window.document.getElementById('megamillions-jackpot');
    this.powerballJackpotSpan = window.document.getElementById('powerball-jackpot');
    this.megamillionsQuantifierSpan = window.document.getElementById('megamillions-quantifier');
    this.powerballQuantifierSpan = window.document.getElementById('powerball-quantifier');
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
   */
  updateView() {
    // For this app, we don't need to do anything.
  }

  /**
   * Given a jackpot amount string (e.g. "250.0"),
   * returns an object containing the properly rounded amount
   * and the accompanying unit:
   * {
   *   amount: "250"
   *   unit: "MILLION"
   * }
   *
   * or
   *
   * {
   *   amount: "1.2"
   *   unit: "BILLION"
   * }
   *
   * Unit is all caps because that's how it's displayed in the UI.
   *
   * @param {string} jackpot The jackpot amount as a string
   * @return {Object} The jackpot object
   */
  parseJackpot(jackpot) {
    var floatJackpot = parseFloat(jackpot);
    var amount;
    var unit;

    // Check if we're in the billions
    if (floatJackpot >= 1000) {
      var jackpotBillions = floatJackpot / 1000;
      amount = String(jackpotBillions.toFixed(1));
      unit = "BILLION";
    } else if (floatJackpot < 1) {
      var jackpotThousands = floatJackpot * 1000;
      amount = String(jackpotThousands.toFixed(0));
      unit = "THOUSAND";
    } else {
      amount = String(parseInt(jackpot, 10));
      unit = "MILLION";
    }

    return {
      amount,
      unit
    };
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
    if (this.currentRow >= this.rows.length) {
      this.currentRow = 0;
    }
    Logger.log(`The view has ${this.rows.length} data rows. ` +
               `Displaying row #${this.currentRow}.`);
    const row = this.rows[this.currentRow];
    this.currentRow += 1;

    var megamillions = this.parseJackpot(row.megamillions_nextjackpot);
    var powerball = this.parseJackpot(row.powerball_nextjackpot);

    this.megamillionsJackpotSpan.innerText = megamillions.amount;
    this.megamillionsQuantifierSpan.innerText = megamillions.unit;
    this.powerballJackpotSpan.innerText = powerball.amount;
    this.powerballQuantifierSpan.innerText = powerball.unit;
  }
}

module.exports = View;
