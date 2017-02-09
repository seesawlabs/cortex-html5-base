/* global window */

import TEST_DATA from './test-data.js';
import TEST_DATA2 from './test-data2.js';
import Logger from './logger.js';
import {VISIBLE_EVENT, HIDDEN_EVENT, READY_EVENT} from './events.js';

// Dispatch the cortex-ready event in 2secs.
const DISPATCH_CORTEX_READY_TIME = 2000;

// Dispatch vistar-hidden event every 5secs.
const DISPATCH_VISTAR_HIDDEN_INTERVAL = 5000;

// Send data updates every 4 seconds.
const DISPATCH_DATA_UPDATES_INTERVAL = 4000;

class Simulator {
  run() {
    Logger.log('Running the app in simulation mode.');

    window.Cortex = {
      onData: (dsId, fun) => {
        setTimeout(() => {
          fun(TEST_DATA, false);
        }, DISPATCH_DATA_UPDATES_INTERVAL);

        setInterval(() => {
          fun(TEST_DATA2, false);
        }, DISPATCH_DATA_UPDATES_INTERVAL + 10500);
      }
    };

    setTimeout(() => {
      window.dispatchEvent(new window.Event(READY_EVENT));
      setInterval(() => {
        window.dispatchEvent(new window.Event(HIDDEN_EVENT));
        window.dispatchEvent(new window.Event(VISIBLE_EVENT));
      }, DISPATCH_VISTAR_HIDDEN_INTERVAL);
    }, DISPATCH_CORTEX_READY_TIME);
  }
}

module.exports = Simulator;
