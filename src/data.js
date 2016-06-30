/* global window */

import Logger from './logger.js';
import {VISIBLE_EVENT, HIDDEN_EVENT} from './events.js';

class Data {
  constructor(datasetId, view) {
    this.datasetId = datasetId;
    this.view = view;
    this.newData = null;
  }

  init() {
    window.addEventListener(HIDDEN_EVENT, () => {
      Logger.log('Received vistar-hidden event.');
      if (this.newData !== null && this.newData.length > 0) {
        this.view.setData(this.newData);
        this.newData = null;
      }

      this.view.render();
    });

    window.addEventListener(VISIBLE_EVENT, () => {
      Logger.log('Received vistar-visible event.');
      this.view.updateView();
    });

    Logger.log(`Listening to dataset: ${this.datasetId}`);
    window.Cortex.onData(this.datasetId, (data, cached) => {
      Logger.log('Received data from Silo.', {cached: cached, data: data});

      if (data === null || data.length === 0) {
        return Logger.log('Ignoring empty data from Silo.');
      }

      this.newData = data;
    });
  }
}

module.exports = Data;
