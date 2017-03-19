import * as moment from 'moment';
import {Request} from '../Request';
import {Response} from '../Response';
import {set as setInDynamo} from '../helpers/dynamoDb';

export function getBinType(request: Request, response: Response): void {
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

export function setBinDay(request: Request, response: Response): void {
  const day = request.getSlotValue('BinDay');

  // if no day, then bail out
  if (!day) {
    response.speechText = 'Sorry I didn\'t understand that, please try again';
    response.repomptText = 'Sorry I didn\'t understand that, please try again';
    return response.send();
  }

  const data = {
    binDay: day
  };

  setInDynamo(request.userId, data)
    .then(() => {
      response.speechText = `I have remembered your bin day as ${day}`;
      response.send();
    })
    .catch((err) => {
      console.error(err);
      response.speechText = 'Sorry I had trouble remembering that, please try again';
      response.send();
    });
}
