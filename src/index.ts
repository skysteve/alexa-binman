import {AlexaCustomSkillRequest} from '../types/AlexaCustomSkillRequest';
import * as intents from './handlers/intents';
import {welcomeMessage, handleNo, handleYes} from './handlers/defaults';
import {Response} from './Response';

declare var process;

export function handler(event: AlexaCustomSkillRequest, context: any, callback: Function): any {
  try {
    if (event.session.application.applicationId !== process.env.ALEXA_SKILL_ID) {
      callback('Invalid Application ID');
    }

    const response = new Response(callback, event);

    // handle request type
    switch (event.request.type) {
      case 'LaunchRequest':
        return welcomeMessage(response);
      case 'IntentRequest':
        break;
      default:
        return response.sendUnknownRequest();
    }

    // handle intents
    switch (event.request.intent.name) {
      case 'GetBinType':
        return intents.getBinType(response);
      case 'AMAZON.NoIntent':
        return handleNo(event, response);
      case 'AMAZON.YesIntent':
        return handleYes(event, response);
      default:
        return response.sendUnknownRequest();
    }
  } catch (err) {
    console.log(err);
    callback(err);
  }
}
