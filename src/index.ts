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

    switch (event.request.type) {
      case 'LaunchRequest':
        return callback(null, responder.buildResponse(welcomeMessage()));
      case 'Intent':
        break;
      default:
        return callback(null, responder.respondUnknown(event));
    }

    // TODO switch by intent type

    const binType = intents.getBinType(new Date());
    callback(null, responder.buildResponse(`You should put the ${binType} bin out on Tuesday.`));
  } catch (err) {
    console.log(err);
    callback(err);
  }
}
