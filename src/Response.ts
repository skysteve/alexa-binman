import {AlexaCustomSkillRequest} from '../types/AlexaCustomSkillRequest';
import {AlexaCustomSkillResponse} from "../types/AlexaCustomSkillResponse";

declare var process;

const DEBUG = process.env.DEBUG;
const RESPONSE_VERSION = '1.0';
const SKILL_TITLE = 'Bin Man';

export class Response {
  private callback: Function;
  private request: AlexaCustomSkillRequest;
  private _endSession: boolean;
  private _cardContent: string;
  private _speechText: string;

  /**
   * Initialise the responder with a callback to call when done
   * @param callback
   */
  constructor(callback: Function, request: AlexaCustomSkillRequest) {
    this.callback = callback;
    this.request = request;
    this._endSession = true; // by default end the session

    if (DEBUG) {
      console.log('INCOMING_REQUEST', JSON.stringify(request, null, 2));
    }
  }

  /**
   * Send the response to the user
   * (make sure speech and (optional) card content are set
   */
  public send(): void {
    if (!this._speechText) {
      console.error('no speech text set');
      this.callback('no speech text set');
    }

    // build the response
    const response: AlexaCustomSkillResponse = {
      version: RESPONSE_VERSION,
      response: {
        outputSpeech: {
          type: 'PlainText',
          text: this._speechText
        },
        card: {
          type: 'Simple',
          title: SKILL_TITLE,
          content: this._cardContent
        },
        shouldEndSession: this._endSession
      }
    };

    // if no card content, don't return a card
    if (!this._cardContent) {
      delete response.response.card;
    }

    // send the response
    this.callback(null, response);
  }

  /**
   * Log and send unknown request message
   * @param request
  */
  public sendUnknownRequest(): void {
    console.error('Unknown request', JSON.stringify(this.request, null, 2));

    const message = 'Sorry I failed to understand your request, please try again';
    this.callback(null, {
      version: RESPONSE_VERSION,
      response: {
        outputSpeech: {
          type: 'PlainText',
          text: message
        },
        card: {
          type: 'Simple',
          title: SKILL_TITLE,
          content: message
        },
        shouldEndSession: true
      }
    });
  }

  /* getters and setters */

  set endSession(endSession: boolean) {
    this._endSession = endSession;
  }

  set cardContent(text: string) {
    this._cardContent = text;
  }

  set speechText(text: string) {
    this._speechText = text;
  }
}
