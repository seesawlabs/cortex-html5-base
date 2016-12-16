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
   * TODO: Implement this method according to your needs.
   */
  render() {
    Logger.log('Rendering the placeholder image.');

    this.img = new window.Image();
    this.img.onerror = e => {
      console.error("Failed to load the placeholder image: ", e);
    };

    this.setRandomImage();

    const div = window.document.createElement('div');
    div.id = PLACEHOLDER_ID;
    div.className = 'placeholder';
    div.appendChild(this.img);

    window.document.body.appendChild(div);
  }

  setRandomImage(append) {
    const imgId = Math.ceil(Math.random() * 7);
    this.img.src = `assets/images/placeholders/${imgId}.jpg`;
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
      // View is already hidden, no need to update the DOM again.
      return;
    }

    Logger.log('Hiding the placeholder image.');

    const div = window.document.getElementById(PLACEHOLDER_ID);
    div.className = 'placeholder';

    this.hidden = false;
  }
}

module.exports = Placeholder;
