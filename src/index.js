/**
 * Created by steve on 24/10/2016.
 */
import { IntentHandler } from './IntentHandler';
import { Responder } from './Responder';

/**
 * Lambda handler which is called when alexa calls our skill
 * @param event {object} the alexa request object
 * @param context {object} unused
 * @param callback {function} callback function for lambda result
 * @returns {*} void
 */
export function handler(event, context, callback) {
  try {
    // validate alexa skill id
    if (event.session.application.applicationId !== 'ALEXA_SKILL_ID') {
      return callback('Invalid Application ID');
    }

    const responder = new Responder(callback);

    switch (event.request.type) {
      case 'LaunchRequest':
        responder.setCard('Unknown command, you could try asking "Which bin should I put out?"');
        responder.setResponseText('Unknown command, you could try asking "Which bin should I put out?"');
        responder.setReprompt('Try asking "Which bin should I put out?"');
        responder.respond(false);
        break;
      case 'IntentRequest':
        const intentHandler = new IntentHandler(event.request, event.session, responder);
        intentHandler.handleIntent(event.request.intent.name);
        break;
      case 'SessionEndedRequest':
        callback();
        break;
      default:
        return responder.errorHandler(`Unknown request type ${event.request.type}`);
    }
  } catch (err) {
    console.log(err);
    callback(err);
  }
}
