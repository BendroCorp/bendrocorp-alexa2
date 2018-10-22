import { ErrorHandler, HandlerInput, RequestHandler, SkillBuilders } from 'ask-sdk-core';
import { Response,  SessionEndedRequest } from 'ask-sdk-model';

export const EltrapRequestHandler : RequestHandler = {
    canHandle(handlerInput : HandlerInput) : boolean {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'EltrapIntent'
    },
    handle(handlerInput : HandlerInput) : Response {  
      return handlerInput.responseBuilder
        .speak("He scares me...he really does...<amazon:effect name=\"whispered\">I mean did you hear what happened to the Dread Pirate Roberts when he got a hold of him?</amazon:effect> The ground crews ordered <emphasis level=\"strong\">at least ten</emphasis> cases of bleach just to clean up the ship floor!")
        .withSimpleCard('Director Edltrap', "He scares me...he really does...I mean did you hear what happened to the Dread Pirate Roberts when he got a hold of him? The ground crews ordered at least ten cases of bleach just to clean up the ship floor!")
        .getResponse();
    },
  };