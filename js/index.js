'use strict'; // eslint-disable-line strict

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

function getWeekNumber(d) {
  // Copy date so don't modify original
  d = new Date(+d);
  d.setHours(0, 0, 0);
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setDate(d.getDate() + 4 - (d.getDay() || 7)); // eslint-disable-line no-mixed-operators
  // Get first day of year
  const yearStart = new Date(d.getFullYear(), 0, 1); // eslint-disable-line no-mixed-operators
  // Calculate full weeks to nearest Thursday
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  // Return array of year and week number
  return weekNo;
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

exports.handler = (event, context, callback) => {
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
};
