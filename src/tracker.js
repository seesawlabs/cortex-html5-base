import Ajax from './ajax.js';

// TODO: Change this with a production token.
const TOKEN = '89ad46b44b3591f5a7d7a664d6b438c018c5e3339036d5906b6540e808551a6e';
const API_URL = 'https://fleet.cortexpowered.com/api/track';

class Tracker {
  static track(deviceId, campaign, view) {
    const clientTime = new Date().getTime();
    const opts = {
      url: API_URL,
      type: 'POST',
      data: {
        token: TOKEN,
        deviceId: deviceId,
        campaign: campaign,
        view: view,
        clientTime: clientTime
      }
    };

    Ajax.request(opts)
      .then(resp => {
        console.info("Track successful: ", {
          deviceId: deviceId,
          campaign: campaign,
          view: view,
          clientTime: clientTime
        }, resp);
      }).catch(e => {
        console.warn("Track failed: ", {
          deviceId: deviceId,
          campaign: campaign,
          view: view,
          clientTime: clientTime
        }, e);
      });
  }
}

module.exports = Tracker;
