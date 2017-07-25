// import Logger from "./logger.js";
const inside = require('point-in-polygon');

class Geofencing {

  /**
   * Checks whether the given `latitude` and `longitude` are within
   * the given `polygon`.
   * `polygon` should be an array of lat/long coordinates, e.g.:
   *
   *   [
   *     [40.000, -70.000],
   *     [41.000, -71.000],
   *     [42.000, -72.000],
   *     [43.000, -73.000]
   *   ]
   *
   * @param {number} latitude The latitude of the coordinate to check
   * @param {number} longitude The longitude of the coordinate to check
   * @param {array} polygon Array of lat/long coordinates defining a polygon
   * @return {boolean} True if lat/long is within polygon, false otherwise
   */
  static latLongWithinPolygon(latitude, longitude, polygon) {
    // Scale all values up to give the algorithm better resolution.
    // Otherwise the polygons are considered extremely tiny by the algorithm.
    const poly = polygon.map(coord => {
      return coord.map(v => {
        return v * 1000;
      });
    });
    return inside([latitude * 1000, longitude * 1000], poly);
  }

  /**
   * Converts a string of shape "40.000,-70.000 41.000,-71.000 42.000,-72.000"
   * into a polygon as defined by `latLongWithinPolygon`.
   *
   * @param {string} str The string to convert
   * @return {array} The array representation of a polygon
   */
  static stringToPolygon(str) {
    return str.split(' ').map(coordStr => {
      return coordStr.split(",");
    });
  }
}

module.exports = Geofencing;
