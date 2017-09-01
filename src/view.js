/* global window */

const IFRAME = 'http://linknyc-jetblue.s3-website-us-east-1.amazonaws.com/?crtx_mode=skip&id=';
// const IFRAME = 'http://localhost:8081/kiosk.html?crtx_mode=skip&id=';

class View {
  constructor() {
    // this.placeholder = new Placeholder();
    this.swapped = false;
    /* TODO: Get default frameid */
    this.frameid = null;
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
    // window.document.getElementById('output').value = JSON.stringify(data || {dummy: true});
    this.frameid = data && data.length && data[0]._index;
    this.frameid = this.frameid.replace(/(-[lr]?)$/ig, '');
  }

  /**
   * Render the placeholder or the main view.
   *
   * Every time the app receives a 'hidden' event this method will get called.
   */
  render() {
    const src = `${IFRAME}${this.frameid}&_=${Date.now()}`;

    if (this.swapped) {
      this.frame1.src = src;
    } else {
      this.frame2.src = src;
    }

    this.swap();
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
    if (this.frame1.style.zIndex === '20') {
      this.frame1.contentWindow.postMessage({
        call: 'sendVisible',
        value: 'VISIBLE'
      }, '*');
    }
    if (this.frame2.style.zIndex === '20') {
      this.frame2.contentWindow.postMessage({
        call: 'sendVisible',
        value: 'VISIBLE'
      }, '*');
    }
    if (this.frame1.style.zIndex === '10') {
      this.frame1.contentWindow.postMessage({
        call: 'sendVisible',
        value: 'HIDDEN'
      }, '*');
    }
    if (this.frame2.style.zIndex === '10') {
      this.frame2.contentWindow.postMessage({
        call: 'sendVisible',
        value: 'HIDDEN'
      }, '*');
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

  setItem(item) { }

  create(tag, className) {
    const el = window.document.createElement(tag);
    el.className = className;
    el.id = className;
    return el;
  }

  swap() {
    if (this.swapped) {
      this.frame1.style.zIndex = 10;
      this.frame2.style.zIndex = 20;
    } else {
      this.frame2.style.zIndex = 10;
      this.frame1.style.zIndex = 20;
    }

    this.swapped = !this.swapped;
  }

  createInitialDom() {
    this.div = window.document.getElementById('container');
    this.frame1 = this.create('iframe', 'content1');
    this.frame1.name = 'frame1-hidden';
    this.frame1.width = '100%';
    this.frame1.height = '100%';
    this.div.appendChild(this.frame1);

    this.frame2 = this.create('iframe', 'content2');
    this.frame2.name = 'frame2-hidden';
    this.frame2.width = '100%';
    this.frame2.height = '100%';
    this.div.appendChild(this.frame2);

    this.render();
  }
}

module.exports = View;
