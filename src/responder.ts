import {AlexaCustomSkillRequest} from '../types/AlexaCustomSkillRequest';

export function buildResponse(output: string): any {
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

export function respondUnknown(request: AlexaCustomSkillRequest): any {
  console.error('Unknown request', JSON.stringify(request, null, 2));
  const message = 'Sorry failed to understand the request';
  return {
    version: '1.0',
    response: {
      outputSpeech: {
        type: 'PlainText',
        text: message
      },
      card: {
        type: 'Simple',
        title: 'Bin Man',
        content: message
      },
      shouldEndSession: true
    }
  };
}