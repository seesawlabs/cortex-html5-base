/* global window */

import {TEST_DATA, LOC_DATA, EMPTY_DATA} from './test-data.js';
import Logger from './logger.js';
import {VISIBLE_EVENT, HIDDEN_EVENT, READY_EVENT} from './events.js';

// Dispatch the cortex-ready event in 2secs.
const DISPATCH_CORTEX_READY_TIME = 2000;

// Dispatch vistar-hidden event every 5secs.
const DISPATCH_VISTAR_HIDDEN_INTERVAL = 5000;

// Send data updates every 4 seconds.
const DISPATCH_DATA_UPDATES_INTERVAL = 4000;

var useEmptyData = false;

class Simulator {
  run() {
    Logger.log('Running the app in simulation mode.');

    window.Cortex = {
      onData: (dsId, fun) => {
        if (dsId === 'com.intersection.linknyc.locationdata') {
          fun(LOC_DATA, false);
        } else {
          setInterval(() => {
            if (useEmptyData) {
              fun(EMPTY_DATA, false);
            } else {
              fun(TEST_DATA, false);
            }
            useEmptyData = !useEmptyData;
          }, DISPATCH_DATA_UPDATES_INTERVAL);
        }
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
