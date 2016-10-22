'use strict'; // eslint-disable-line strict
import { getWeekNumber } from './dateHelpers';

function buildResponse(output) {
  console.log('building response', output);
  return {
    version: '1.0',
    response: {
      outputSpeech: {
        type: 'PlainText',
        text: output
      },
      card: {
        type: 'Simple',
        title: 'Bin Man',
        content: output
      },
      shouldEndSession: true
    }
  };
}

function getBinType(date) {
  const bins = ['Green', 'Recycling'];
  let result = bins[0];

  // use odd/even week number to calculate which bin it is
  if (getWeekNumber(date) % 2) {
    result = bins[1];
  }

  // if we haven't got to tuesday, return the result
  if (date.getDay() <= 2) {
    return result;
  }

  // otherwise get the other bin (next week's bin')
  return bins.filter(bin => bin !== result).join('');
}

export function handler(event, context, callback) { // eslint-disable-line import/prefer-default-export
  try {
    if (event.session.application.applicationId !== 'ID') {
      callback('Invalid Application ID');
    }

    const binType = getBinType(new Date());
    callback(null, buildResponse(`You should put the ${binType} bin out`));
  } catch (err) {
    console.log(err);
    callback(err);
  }
}