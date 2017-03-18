import {Response} from '../Response';

export function welcomeMessage(response: Response): void {
  response.speechText = 'Welcome to the bin man skill. Would you like to set your bin day?';
  response.repomptText = 'Would you like me to save which day of the week your bin is collected?';
  response.send();
}
