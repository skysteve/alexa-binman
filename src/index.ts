import {AlexaCustomSkillRequest} from '../types/AlexaCustomSkillRequest';
import * as intents from './handlers/intents';
import {welcomeMessage} from './handlers/defaults';
import * as responder from './responder';

declare var process;

export function handler(event: AlexaCustomSkillRequest, context: any, callback: Function): any {
  try {
    if (event.session.application.applicationId !== process.env.ALEXA_SKILL_ID) {
      callback('Invalid Application ID');
    }

    console.log('**', event);

    // handle request type
    switch (event.request.type) {
      case 'LaunchRequest':
        return callback(null, responder.buildResponse(welcomeMessage()));
      case 'IntentRequest':
        break;
      default:
        return callback(null, responder.respondUnknown(event));
    }

    // handle intents
    switch (event.request.intent.name) {
      case 'GetBinType':
        const binType = intents.getBinType(new Date());
        return callback(null, responder.buildResponse(`You should put the ${binType} bin out on Tuesday.`));
      default:
        return callback(null, responder.respondUnknown(event));
    }
  } catch (err) {
    console.log(err);
    callback(err);
  }
}
