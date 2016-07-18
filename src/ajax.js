/* global window */

import Promise from 'promise';

class Ajax {
  static request(options) {
    return new Promise((resolve, reject) => {
      const method = options.type || 'GET';
      let url = options.url;

      if (options.data && method === 'GET') {
        url = `${url}?${Ajax.toQuery(options.data)}`;
      }

      const xhr = Ajax.newXHR();
      xhr.onload = function(e) {
        if (this.status === 200) {
          if (options.dataType === 'json') {
            resolve(JSON.parse(this.response));
          } else {
            resolve(this.response);
          }
          return;
        }
        reject({status: this.status, response: this.response});
      };

      xhr.onerror = reject;
      xhr.open(method, url, true);

      if (options.data && ['POST', 'PUT', 'DELETE'].find(m => m === method)) {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(options.data));
      } else {
        xhr.send();
      }
    });
  }

  static newXHR() {
    return new window.XMLHttpRequest();
  }

  static toQuery(data) {
    if (data) {
      const query = [];
      Object.keys(data).forEach(key => {
        const k = encodeURIComponent(key);
        const v = encodeURIComponent(data[key]);
        query.push(`${k}=${v}`);
      });

      return query.join('&');
    }

    return '';
  }
}

module.exports = Ajax;
