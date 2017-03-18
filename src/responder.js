'use strict';

module.exports = {
  buildResponse(output) {
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
};
