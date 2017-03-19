import {AlexaCustomSkillRequest, SkillRequest, SkillSession} from '../types/AlexaCustomSkillRequest';

export class Request {
  private event: AlexaCustomSkillRequest;

  constructor(event: AlexaCustomSkillRequest) {
    this.event = event;
  }

  public get intentName() {
    if (this.request.intent) {
      return this.request.intent.name;
    }

    return 'UNKNOWN';
  }

  public get applicationId() {
    return this.session.application.applicationId;
  }

  public get userId() {
    return this.session.user.userId;
  }

  public get sessionAttributes() {
    return this.session.attributes || {};
  }

  public getSessionAttribute(key: string): any {
    return this.sessionAttributes[key];
  }

  public getSlotValue(key: string) {
    if (!this.request.intent || !this.request.intent.slots) {
      return;
    }

    return this.request.intent.slots[key];
  }

  public hasSessionAttributes() {
    return Object.keys(this.sessionAttributes).length > 0;
  }

  public get requestType() {
    return this.request.type;
  }

  private get request(): SkillRequest {
    return this.event.request;
  }

  private get session(): SkillSession {
    return this.event.session;
  }
}
