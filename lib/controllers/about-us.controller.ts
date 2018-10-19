import { ErrorHandler, HandlerInput, RequestHandler, SkillBuilders } from 'ask-sdk-core';
import { Response,  SessionEndedRequest } from 'ask-sdk-model';


export const AboutUsRequestHandler : RequestHandler = {
    canHandle(handlerInput : HandlerInput) : boolean {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AboutUsIntent';
    },
    handle(handlerInput : HandlerInput) : Response {
      const speechText = "<p>Sure I'll read what appears in the about section of the BendroCorp web site.</p><p>Throughout the history of our corporation we’ve always been devoted to the little people. The people forgotten by emperors, the people forgotten by democratic governments obsessed with massive building projects and the people that the mega corporations forget. The colonies that most people never think of - the small time mining installations, the farms and the everyday people living throughout the verse.</p><p>The mission of BendroCorp will to help facilitate the next great human expansion by assisting the average citizen with their expansion into the ever growing verse - by logistically supporting colonies, be assisting citizens in the construction of homesteads and outposts and by pushing the known boundaries of space itself. Together we will expand the frontier.</p>";
  
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withSimpleCard('About BendroCorp', speechText)
        .getResponse();
    },
  };