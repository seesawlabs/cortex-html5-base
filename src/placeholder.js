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

  /**
   * Hide the placeholder view.
   *
   * This method gets called when the app receives data and the placeholder
   * is no longer needed.
   *
   */
  hide() {
    if (this.hidden) {
      // View is already hidden, no need to update the DOM again.
      return;
    }

    Logger.log('Hiding the placeholder image.');

    const div = window.document.getElementById(PLACEHOLDER_ID);
    div.className = 'placeholder invisible';

    this.hidden = true;
  }

  show() {
    if (!this.hidden) {
      //View is already hidden, no need to update the DOM again.
      return;
    }

    Logger.log('Showing the placeholder image.');

    const div = window.document.getElementById(PLACEHOLDER_ID);
    if (div) {
      div.className = 'placeholder';
      this.hidden = false;
    } else {
      Logger.log('No placeholder has been rendered yet, show() failed.');
    }
  }
}

module.exports = Placeholder;
