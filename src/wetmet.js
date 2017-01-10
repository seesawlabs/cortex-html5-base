import axios from 'axios';
import Logger from './logger';

const USER_KEY = 'YXBpQHBtdmIuY29t';
const PRIVATE_KEY = 'b034f751-f663-f557-2a82-76fdf69934b3';

class Wetmet {
  constructor(options = {}) {
    this.sources = [
      '115-07-01',
      '115-18-01',
      '115-26-01',
      '115-27-01'
    ];
    const {
      source = this.randomSource()
    } = options;
    this.source = source;
  }

  randomSource() {
    return this.sources[Math.floor(Math.random() * this.sources.length)];
  }

  getUrl({type}) {
    const url = `https://api.wetmet.net/mediaapi/geturl.php?user_key=${USER_KEY}&private_key=${PRIVATE_KEY}&media_source=${this.source}&media_item=current&media_extension=${type}`;

    Logger.log(`URL: ${url}`);
    return url;
  }

  getAsset({type}) {
    return axios
      .get(this.getUrl({type}))
      .then(response => {
        return response.data;
      });
  }
}

module.exports = Wetmet;
