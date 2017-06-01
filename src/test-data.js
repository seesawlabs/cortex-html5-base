/* eslint-disable */

const TEST_DATA = [
  {
	"_index": "london",
	"hour": 0,
	"icon": "chancerain",
	"icon_url": "http://icons.wxug.com/i/c/k/nt_chancerain.gif",
	"mday": 3,
	"mon": 6,
	"temp_english": 63,
	"temp_metric": 17
  },
  {
	"_index": "london",
	"hour": 9,
	"icon": "mostlycloudy",
	"icon_url": "http://icons.wxug.com/i/c/k/mostlycloudy.gif",
	"mday": 2,
	"mon": 6,
	"temp_english": 66,
	"temp_metric": 19
  },
  {
	"_index": "london",
	"hour": 12,
	"icon": "mostlycloudy",
	"icon_url": "http://icons.wxug.com/i/c/k/mostlycloudy.gif",
	"mday": 2,
	"mon": 6,
	"temp_english": 71,
	"temp_metric": 22
  },
  {
	"_index": "london",
	"hour": 1,
	"icon": "chancerain",
	"icon_url": "http://icons.wxug.com/i/c/k/nt_chancerain.gif",
	"mday": 3,
	"mon": 6,
	"temp_english": 63,
	"temp_metric": 17
  },
  {
	"_index": "london",
	"hour": 3,
	"icon": "chancerain",
	"icon_url": "http://icons.wxug.com/i/c/k/nt_chancerain.gif",
	"mday": 3,
	"mon": 6,
	"temp_english": 61,
	"temp_metric": 16
  },
  {
	"_index": "london",
	"hour": 7,
	"icon": "cloudy",
	"icon_url": "http://icons.wxug.com/i/c/k/cloudy.gif",
	"mday": 3,
	"mon": 6,
	"temp_english": 59,
	"temp_metric": 15
  },
  {
	"_index": "london",
	"hour": 10,
	"icon": "mostlycloudy",
	"icon_url": "http://icons.wxug.com/i/c/k/mostlycloudy.gif",
	"mday": 2,
	"mon": 6,
	"temp_english": 69,
	"temp_metric": 21
  },
  {
	"_index": "london",
	"hour": 13,
	"icon": "mostlycloudy",
	"icon_url": "http://icons.wxug.com/i/c/k/mostlycloudy.gif",
	"mday": 2,
	"mon": 6,
	"temp_english": 72,
	"temp_metric": 22
  },
  {
	"_index": "london",
	"hour": 21,
	"icon": "cloudy",
	"icon_url": "http://icons.wxug.com/i/c/k/cloudy.gif",
	"mday": 2,
	"mon": 6,
	"temp_english": 68,
	"temp_metric": 20
  },
  {
	"_index": "london",
	"hour": 20,
	"icon": "cloudy",
	"icon_url": "http://icons.wxug.com/i/c/k/cloudy.gif",
	"mday": 2,
	"mon": 6,
	"temp_english": 70,
	"temp_metric": 21
  },
  {
	"_index": "london",
	"hour": 2,
	"icon": "clear",
	"icon_url": "http://icons.wxug.com/i/c/k/nt_clear.gif",
	"mday": 2,
	"mon": 6,
	"temp_english": 61,
	"temp_metric": 16
  },
  {
	"_index": "london",
	"hour": 18,
	"icon": "cloudy",
	"icon_url": "http://icons.wxug.com/i/c/k/cloudy.gif",
	"mday": 2,
	"mon": 6,
	"temp_english": 72,
	"temp_metric": 22
  },
  {
	"_index": "london",
	"hour": 5,
	"icon": "partlycloudy",
	"icon_url": "http://icons.wxug.com/i/c/k/partlycloudy.gif",
	"mday": 2,
	"mon": 6,
	"temp_english": 55,
	"temp_metric": 13
  },
  {
	"_index": "london",
	"hour": 8,
	"icon": "mostlycloudy",
	"icon_url": "http://icons.wxug.com/i/c/k/mostlycloudy.gif",
	"mday": 2,
	"mon": 6,
	"temp_english": 63,
	"temp_metric": 17
  },
  {
	"_index": "london",
	"hour": 4,
	"icon": "chancerain",
	"icon_url": "http://icons.wxug.com/i/c/k/nt_chancerain.gif",
	"mday": 3,
	"mon": 6,
	"temp_english": 60,
	"temp_metric": 16
  },
  {
	"_index": "london",
	"hour": 2,
	"icon": "chancerain",
	"icon_url": "http://icons.wxug.com/i/c/k/nt_chancerain.gif",
	"mday": 3,
	"mon": 6,
	"temp_english": 61,
	"temp_metric": 16
  },
  {
	"_index": "london",
	"hour": 9,
	"icon": "mostlycloudy",
	"icon_url": "http://icons.wxug.com/i/c/k/mostlycloudy.gif",
	"mday": 3,
	"mon": 6,
	"temp_english": 60,
	"temp_metric": 16
  },
  {
	"_index": "london",
	"hour": 8,
	"icon": "mostlycloudy",
	"icon_url": "http://icons.wxug.com/i/c/k/mostlycloudy.gif",
	"mday": 3,
	"mon": 6,
	"temp_english": 59,
	"temp_metric": 15
  },
  {
	"_index": "london",
	"hour": 17,
	"icon": "mostlycloudy",
	"icon_url": "http://icons.wxug.com/i/c/k/mostlycloudy.gif",
	"mday": 2,
	"mon": 6,
	"temp_english": 73,
	"temp_metric": 23
  },
  {
	"_index": "london",
	"hour": 6,
	"icon": "cloudy",
	"icon_url": "http://icons.wxug.com/i/c/k/cloudy.gif",
	"mday": 3,
	"mon": 6,
	"temp_english": 59,
	"temp_metric": 15
  },
  {
	"_index": "london",
	"hour": 7,
	"icon": "mostlycloudy",
	"icon_url": "http://icons.wxug.com/i/c/k/mostlycloudy.gif",
	"mday": 2,
	"mon": 6,
	"temp_english": 60,
	"temp_metric": 16
  },
  {
	"_index": "london",
	"hour": 14,
	"icon": "mostlycloudy",
	"icon_url": "http://icons.wxug.com/i/c/k/mostlycloudy.gif",
	"mday": 2,
	"mon": 6,
	"temp_english": 73,
	"temp_metric": 23
  },
  {
	"_index": "london",
	"hour": 11,
	"icon": "chancerain",
	"icon_url": "http://icons.wxug.com/i/c/k/chancerain.gif",
	"mday": 2,
	"mon": 6,
	"temp_english": 70,
	"temp_metric": 21
  },
  {
	"_index": "london",
	"hour": 1,
	"icon": "clear",
	"icon_url": "http://icons.wxug.com/i/c/k/nt_clear.gif",
	"mday": 2,
	"mon": 6,
	"temp_english": 63,
	"temp_metric": 17
  },
  {
	"_index": "london",
	"hour": 3,
	"icon": "clear",
	"icon_url": "http://icons.wxug.com/i/c/k/nt_clear.gif",
	"mday": 2,
	"mon": 6,
	"temp_english": 59,
	"temp_metric": 15
  },
  {
	"_index": "london",
	"hour": 22,
	"icon": "chancerain",
	"icon_url": "http://icons.wxug.com/i/c/k/nt_chancerain.gif",
	"mday": 2,
	"mon": 6,
	"temp_english": 66,
	"temp_metric": 19
  },
  {
	"_index": "london",
	"hour": 16,
	"icon": "mostlycloudy",
	"icon_url": "http://icons.wxug.com/i/c/k/mostlycloudy.gif",
	"mday": 2,
	"mon": 6,
	"temp_english": 73,
	"temp_metric": 23
  },
  {
	"_index": "london",
	"hour": 19,
	"icon": "cloudy",
	"icon_url": "http://icons.wxug.com/i/c/k/cloudy.gif",
	"mday": 2,
	"mon": 6,
	"temp_english": 71,
	"temp_metric": 22
  },
  {
	"_index": "london",
	"hour": 5,
	"icon": "cloudy",
	"icon_url": "http://icons.wxug.com/i/c/k/cloudy.gif",
	"mday": 3,
	"mon": 6,
	"temp_english": 59,
	"temp_metric": 15
  },
  {
	"_index": "london",
	"hour": 6,
	"icon": "partlycloudy",
	"icon_url": "http://icons.wxug.com/i/c/k/partlycloudy.gif",
	"mday": 2,
	"mon": 6,
	"temp_english": 57,
	"temp_metric": 14
  },
  {
	"_index": "london",
	"hour": 10,
	"icon": "partlycloudy",
	"icon_url": "http://icons.wxug.com/i/c/k/partlycloudy.gif",
	"mday": 3,
	"mon": 6,
	"temp_english": 62,
	"temp_metric": 17
  },
  {
	"_index": "london",
	"hour": 23,
	"icon": "chancerain",
	"icon_url": "http://icons.wxug.com/i/c/k/nt_chancerain.gif",
	"mday": 2,
	"mon": 6,
	"temp_english": 65,
	"temp_metric": 18
  },
  {
	"_index": "london",
	"hour": 11,
	"icon": "partlycloudy",
	"icon_url": "http://icons.wxug.com/i/c/k/partlycloudy.gif",
	"mday": 3,
	"mon": 6,
	"temp_english": 63,
	"temp_metric": 17
  },
  {
	"_index": "london",
	"hour": 0,
	"icon": "clear",
	"icon_url": "http://icons.wxug.com/i/c/k/nt_clear.gif",
	"mday": 2,
	"mon": 6,
	"temp_english": 65,
	"temp_metric": 18
  },
  {
	"_index": "london",
	"hour": 15,
	"icon": "cloudy",
	"icon_url": "http://icons.wxug.com/i/c/k/cloudy.gif",
	"mday": 2,
	"mon": 6,
	"temp_english": 73,
	"temp_metric": 23
  },
  {
	"_index": "london",
	"hour": 4,
	"icon": "clear",
	"icon_url": "http://icons.wxug.com/i/c/k/nt_clear.gif",
	"mday": 2,
	"mon": 6,
	"temp_english": 55,
	"temp_metric": 13
  }
];

module.exports = TEST_DATA;
