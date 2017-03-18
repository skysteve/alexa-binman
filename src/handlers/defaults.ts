import {Response} from '../Response';

export function welcomeMessage(response: Response): void {
  response.speechText = 'Welcome to the bin man skill. This skill will let you do things';
  response.send();
}
