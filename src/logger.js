/* global APP_NAME */

class Logger {
  static log(msg, ...args) {
    if (args && args.length > 0) {
      console.log(`${APP_NAME}-${new Date().getTime()}: ${msg}`, ...args);
    } else {
      console.log(`${APP_NAME}-${new Date().getTime()}: ${msg}`);
    }
  }

  static error(msg, ...args) {
    if (args && args.length > 0) {
      console.error(`${APP_NAME}-${new Date().getTime()}: ${msg}`, ...args);
    } else {
      console.error(`${APP_NAME}-${new Date().getTime()}: ${msg}`);
    }
  }
}

module.exports = Logger;
