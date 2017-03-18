export type AlexaCustomSkillRequest = {
  'version': 'string';
  'session': {
    'new': boolean;
    'sessionId': 'string';
    'application': {
      'applicationId': 'string'
    };
    'attributes': {
      'string': {}
    };
    'user': {
      'userId': 'string';
      'accessToken': 'string'
    }
  };
  'context': {
    'System': {
      'application': {
        'applicationId': 'string'
      };
      'user': {
        'userId': 'string';
        'accessToken': 'string'
      };
      'device': {
        'supportedInterfaces': {
          'AudioPlayer': {}
        }
      }
    };
    'AudioPlayer': {
      'token': 'string';
      'offsetInMilliseconds': number;
      'playerActivity': 'string'
    }
  };
  'request': {
    'type': 'LaunchRequest',
    'requestId': 'string',
    'timestamp': 'string',
    'locale': 'string'
  }

};
