import {Response} from '../Response';
import {AlexaCustomSkillRequest} from '../../types/AlexaCustomSkillRequest';

export function welcomeMessage(response: Response): void {
  response.speechText = 'Welcome to the bin man skill. You will need to tell me which day your bin is collected. Would you like to do that now?';
  response.repomptText = 'Would you like me to save which day of the week your bin is collected?';
  response.addSessionAttributes({requestedBinDay: true});
  response.send();
}

export function handleYes(event: AlexaCustomSkillRequest, response: Response): void {
  if (!event.session.attributes) {
    response.speechText = 'Sorry, I don\'t know what you want to do, please try again';
    return response.send();
  }

  // user want's to set their bin day
  if (event.session.attributes.requestedBinDay) {
    response.speechText = 'Which day is your bin collected?';
    response.repomptText = 'Sorry, I didn\'t catch that. Which day is your bin collected?';
    response.send();
  }
}

export function handleNo(event: AlexaCustomSkillRequest, response: Response): void {
  if (!event.session.attributes) {
    response.speechText = 'Sorry, I don\'t know what you want to do, please try again';
    return response.send();
  }

  // user want's to set their bin day (or not as the case may be)
  if (event.session.attributes.requestedBinDay) {
    response.speechText = 'No problem. Simply say "Alexa ask bin man to set my bin day to Monday" when you\'re ready.'
    return response.send();
  }
}
