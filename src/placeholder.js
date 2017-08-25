/* global window */

import Logger from './logger.js';

const PLACEHOLDER_ID = 'placeholder';

class Placeholder {
  constructor() {
    this.hidden = false;
  }

  /**
   * Display a placeholder view.
   *
   * This method will get called when the app starts initially. It is expected
   * to render some meaningful view without relying on dynamic data.
   *
   * In this demo, we simply display a fullscreen placeholder image.
   *
   * The view generated will get hidden once the data arrives using the
   * Placeholder.hide() method.
   *
   */
  render() {
    const div = window.document.getElementById(PLACEHOLDER_ID);

    if (div === null) {
      Logger.log('Rendering the placeholder image.');

      const img = new window.Image();
      img.src = "assets/images/placeholder.jpg";
      img.onerror = e => {
        console.error("Failed to load the placeholder image: ", e);
      };

      const div = window.document.createElement('div');
      div.id = PLACEHOLDER_ID;
      div.className = 'placeholder';
      div.appendChild(img);

      window.document.body.appendChild(div);
    }
  }

  /**
   * Hide the placeholder view.
   *
   * This method gets called when the app receives data and the placeholder
   * is no longer needed.
   *
   * TODO: Implement this method according to your needs.
   */
  hide() {
    Logger.log('Destroying the placeholder image.');

    const div = window.document.getElementById(PLACEHOLDER_ID);
    if (div !== null) {
      div.parentNode.removeChild(div);
    }
  }
}

module.exports = Placeholder;
