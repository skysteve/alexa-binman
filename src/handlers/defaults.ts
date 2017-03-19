import {Request} from '../Request';
import {Response} from '../Response';

export function welcomeMessage(response: Response): void {
  // TODO check if already know the correct days and ask the user if they want to override them

  response.speechText = 'Welcome to the bin man skill. You will need to tell me which day your bin is collected. Would you like to do that now?';
  response.repomptText = 'Would you like me to save which day of the week your bin is collected?';
  response.addSessionAttributes({requestedBinDay: true});
  response.send();
}

export function handleYes(request: Request, response: Response): void {
  if (!request.hasSessionAttributes()) {
    response.speechText = 'Sorry, I don\'t know what you want to do, please try again';
    return response.send();
  }

  // user want's to set their bin day
  if (request.getSessionAttribute('requestedBinDay')) {
    response.speechText = 'Which day is your bin collected?';
    response.repomptText = 'Sorry, I didn\'t catch that. Which day is your bin collected?';
    response.send();
  }
}

export function handleNo(request: Request, response: Response): void {
  if (!request.hasSessionAttributes()) {
    response.speechText = 'Sorry, I don\'t know what you want to do, please try again';
    return response.send();
  }

  // user want's to set their bin day (or not as the case may be)
  if (request.getSessionAttribute('requestedBinDay')) {
    response.speechText = 'No problem. Simply say "Alexa ask bin man to set my bin day to Monday" when you\'re ready.';
    return response.send();
  }
}
