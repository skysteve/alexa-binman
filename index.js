'use strict';
const handlers = require('./src/handlers');
const responder = require('./src/responder');

module.exports.handler = function handler(event, context, callback) {
  try {
    if (event.session.application.applicationId !== process.env.ALEXA_SKILL_ID) {
      callback('Invalid Application ID');
    }

    console.log('**', event);

    switch (event.type) {
      case 'LaunchRequest':
        return handlers.defaults.welcomeMessage();
      case 'Intent':
        break;
      default:
        return responder.respondUnknown(event);
    }

    // TODO switch by intent type

    const binType = handlers.intents.getBinType(new Date());
    callback(null, responder.buildResponse(`You should put the ${binType} bin out on Tuesday.`));
  } catch (err) {
    console.log(err);
    callback(err);
  }
};
