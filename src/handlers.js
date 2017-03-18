'use strict';
const dateHelpers = require('./dateHelpers');

module.exports = {
  getBinType(date) {
    const bins = ['general waste', 'recycling'];
    let result = bins[0];

    // use odd/even week number to calculate which bin it is
    if (dateHelpers.getWeekNumber(date) % 2) {
      result = bins[1];
    }

    // if we haven't got to tuesday, return the result
    if (date.getDay() <= 2) {
      return result;
    }

    // otherwise get the other bin (next week's bin')
    return bins.filter(bin => bin !== result).join('');
  }
};
