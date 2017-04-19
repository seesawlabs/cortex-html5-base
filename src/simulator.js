/* global window */

import TEST_DATA from './test-data.js';
import Logger from './logger.js';
import {VISIBLE_EVENT, HIDDEN_EVENT, READY_EVENT} from './events.js';

// Dispatch the cortex-ready event in 2secs.
const DISPATCH_CORTEX_READY_TIME = 2000;

// Dispatch vistar-hidden event every 5secs.
const DISPATCH_VISTAR_HIDDEN_INTERVAL = 5000;

// Send data updates every 4 seconds.
const DISPATCH_DATA_UPDATES_INTERVAL = 4000;

var test_data = TEST_DATA;

function getRandomSubarray(arr, size) {
  var shuffled = arr.slice(0), i = arr.length, temp, index;
  while (i--) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(0, size);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

class Simulator {
  run() {
    Logger.log('Running the app in simulation mode.');

    window.Cortex = {
      onData: (dsId, fun) => {
        setInterval(() => {
          var d = getRandomSubarray(test_data, getRandomInt(0, test_data.length));
          fun(d, false);
        }, DISPATCH_DATA_UPDATES_INTERVAL);
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
