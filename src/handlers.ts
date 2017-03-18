'use strict';
import * as moment from 'moment';

export = {
  defaults: {
    welcomeMessage() {
      return 'Welcome to the bin man skill. This skill will let you do things';
    }
  },
  intents: {
    getBinType(date) {
      const bins = ['general waste', 'recycling'];
      let result = bins[0];

      // use odd/even week number to calculate which bin it is
      if (moment(date).weekYear() % 2) {
        result = bins[1];
      }

      // if we haven't got to tuesday, return the result
      if (date.getDay() <= 2) {
        return result;
      }

      // otherwise get the other bin (next week's bin')
      return bins.filter(bin => bin !== result).join('');
    }
  }
};
