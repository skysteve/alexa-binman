import * as moment from 'moment';
import {Response} from '../Response';
import {AlexaCustomSkillRequest} from '../../types/AlexaCustomSkillRequest';

export function getBinType(response: Response): void {
  const bins = ['general waste', 'recycling'];
  const date = new Date();
  let result = bins[0];
  let binType;

  // use odd/even week number to calculate which bin it is
  if (moment(date).weekYear() % 2) {
    result = bins[1];
  }

  // if we haven't got to tuesday, return the result
  if (date.getDay() <= 2) {
    binType = result;
  } else {
    // otherwise get the other bin (next week's bin')
    binType = bins.filter(bin => bin !== result).join('');
  }

  response.speechText = `You should put the ${binType} bin out on Tuesday.`;
  response.cardContent = `You should put the ${binType} bin out on Tuesday.`;
  response.send();
}

export function setBinDay(event: AlexaCustomSkillRequest, response: Response): void {
  // TODO
}
