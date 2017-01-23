import axios from 'axios';
import Logger from './logger';

const USER_KEY = 'YXBpQHBtdmIuY29t';
const PRIVATE_KEY = 'b034f751-f663-f557-2a82-76fdf69934b3';

class Wetmet {
  constructor(options = {}) {
    this.sources = [
      '230-01-01',
      '230-02-01',
      '230-03-01',
      '230-04-01',
      '230-05-01',
      '231-01-01',
      '231-02-01',
      '231-03-01',
      '231-04-01',
      '231-05-01',
      '234-02-01',
      '235-02-01',
      '235-01-01',
      '233-03-01',
      '232-02-01'
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
