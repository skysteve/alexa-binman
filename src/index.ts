import {AlexaCustomSkillRequest} from '../types/AlexaCustomSkillRequest';
import * as intents from './handlers/intents';
import {welcomeMessage, handleNo, handleYes} from './handlers/defaults';
import {Request} from './Request';
import {Response} from './Response';

declare var process;

export function handler(event: AlexaCustomSkillRequest, context: any, callback: Function): any {
  try {
    const request = new Request(event);

    if (request.applicationId !== process.env.ALEXA_SKILL_ID) {
      callback('Invalid Application ID');
    }

    const response = new Response(callback, event);

    // handle request type
    switch (request.requestType) {
      case 'LaunchRequest':
        return welcomeMessage(response);
      case 'IntentRequest':
        break;
      default:
        return response.sendUnknownRequest();
    }

    // handle intents
    switch (request.intentName) {
      case 'GetBinType':
        return intents.getBinType(request, response);
      case 'GetBinDay':
        return intents.getBinDay(request, response);
      case 'SetBinDay':
        return intents.setBinDay(request, response);
      case 'AMAZON.NoIntent':
        return handleNo(request, response);
      case 'AMAZON.YesIntent':
        return handleYes(request, response);
      default:
        return response.sendUnknownRequest();
    }
  } catch (err) {
    console.log(err);
    callback(err);
  }
}
