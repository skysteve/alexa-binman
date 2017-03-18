'use strict';
const handlers = require('./src/handlers');

module.exports.handler = function handler(event, context, callback) {
  try {
    if (event.session.application.applicationId !== process.env.ALEXA_SKILL_ID) {
      callback('Invalid Application ID');
    }

    console.log('**', event);
    console.log('##', context);

    const binType = handlers.getBinType(new Date());
    callback(null, buildResponse(`You should put the ${binType} bin out on Tuesday.`));
  } catch (err) {
    console.log(err);
    callback(err);
  }
};
