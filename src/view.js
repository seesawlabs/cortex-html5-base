/* global window */

import Placeholder from './placeholder.js';
import Logger from './logger.js';

class View {
  constructor() {
    this.placeholder = new Placeholder();
    this.placeholder.render();
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
    this.rows = data;
    if (!data || data.length === 0)
      return;

    // Filter out any listings that have invalid columns
    this.rows = this.rows.filter(r => {
      for (var col in r) {
        if (!r[col]) {
          Logger.log(`Skipping listing ${r["id"]}, invalid column value for ${col}.`);
          return false;
        }
      }
      return true;
    });

    // Preload all images
    this.rows.map(row => {
      const img = new window.Image();
      img.src = row.large_image_uri;
      return true;
    });
  }

  /**
   * Render the placeholder or the main view.
   *
   * Every time the app receives a 'hidden' event this method will get called.
   */
  render() {
    Logger.log('Rendering a new view.', this.rows);
    if (!this.rows || this.rows.length === 0) {
      this.placeholder.show();
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
    // Cycle the carousel
    this.current = (this.current + 1) % this.rows.length;
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
   */
  _render() {
    const current = this.current;
    const previous = (current - 1) < 0 ? this.rows.length - 1 : current - 1;
    const next = (current + 1) % this.rows.length;

    if (previous === current) {
      this.renderCard('itemPrevious', null);
    } else {
      this.renderCard('itemPrevious', this.rows[previous]);
    }

    this.renderCard('itemCurrent', this.rows[current]);
    this.renderCard('labels', this.rows[current], this.rows.length);

    if (next === current) {
      this.renderCard('itemNext', null);
    } else {
      this.renderCard('itemNext', this.rows[next]);
    }
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  renderCard(id, row, total) {
    const el = window.document.getElementById(id);

    if (!row) {
      el.classList.add('hidden');
      return;
    }

    el.classList.remove('hidden');

    const _count = el.querySelectorAll(`[ssl-count]`);
    Array.prototype.map.call(_count, dom => {
      dom.innerHTML = total;
    });

    // Handle conditionals
    const _if = el.querySelectorAll(`[ssl-if]`);
    Array.prototype.map.call(_if, dom => {
      const visible = function(str) {
        return eval(str);
      }.call({row}, dom.getAttribute('ssl-if'));
      if (visible && !dom.classList.contains('hidden')) {
        dom.classList.add('hidden');
      } else {
        dom.classList.remove('hidden');
      }
    });

    // Fill in templates
    for (const k in row) {
      if (row[k]) {
        const key = `ssl-${k}`;
        const dom = el.querySelector(`[${key}]`);
        if (!dom) {
          continue;
        }

        let value = row[k];
        const attr = dom.getAttribute(key);

        if (attr !== '') {
          switch (attr) {
            case "backgroundImage":
              dom.style.backgroundImage = `url(${value})`;
              continue;
            case "currency":
              value = `$${this.numberWithCommas(value)}`;
              break;
            case "number":
              value = this.numberWithCommas(value);
              break;
            default:
              value = eval("`" + dom.getAttribute(key) + "`");
              break;
          }
        }
        dom.innerHTML = value;
      }
    }

    // _bedroom =  {{item.bedrooms}} bed{{item.bedrooms != 1 ? \'s\' : \'\'}}
    // _bathrooms = {{item.bathrooms}} bath{{item.bathrooms != 1 ? \'s\' : \'\'}}
    // _sqft =  {{item.size_sqft|number}}
  }


  create(tag, className) {
    const el = window.document.createElement(tag);
    el.className = className;
    el.id = className;
    return el;
  }

  createInitialDom() {
    this.container = window.document.getElementById('container');
  }
}

module.exports = View;
