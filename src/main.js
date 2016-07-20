/* global window */

require('../css/main.css');

import View from './view.js';
import Data from './data.js';
import Simulator from './simulator.js';
import Logger from './logger.js';
import {READY_EVENT} from './events.js';

const DATASET_ID = 'com.intersection.media.data.weather.forecastio.nyc';

/**
 * Starts the app in simulation mode.
 *
 * This function will get called only when the NODE_ENV variable is set to
 * 'development'. Check out package.json to see how we set this variable.
 *
 * In simulation mode, the app is expected to run on non-Cortex environments.
 * The Simulator will dispatch all necessary Cortex events. It will also
 * periodically dispatch the data stored in './test-data.js'. You can update
 * the event dispatch times in './data.js'.
 */
function simulateCortexEnvironment() {
  const simulator = new Simulator();
  simulator.run();
}

/**
 * App starting point.
 *
 * Creates the View and Data instances. Enters the simulation mode in dev
 * environment.
 */
function main() {
  const view = new View();
  view.render();

  window.addEventListener(READY_EVENT, () => {
    Logger.log('Received the cortex-ready event.');

    const data = new Data(DATASET_ID, view);
    data.init();
  });

  if (process.env.NODE_ENV === 'development') {
    simulateCortexEnvironment();
  }
}

module.exports = main();
