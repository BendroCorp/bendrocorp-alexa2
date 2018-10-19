import { ErrorHandler, HandlerInput, RequestHandler, SkillBuilders } from 'ask-sdk-core';
import { Response,  SessionEndedRequest } from 'ask-sdk-model';
import { PhraseService } from "../services/phrase.service"

export const LaunchRequestHandler : RequestHandler = {
    canHandle(handlerInput : HandlerInput) : boolean {
      return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput : HandlerInput) : Response {
      let phrase:PhraseService = new PhraseService
      let speechText:string


      if (handlerInput.requestEnvelope.session.user.accessToken) {
        speechText = `Welcome to BendroCorp! ${phrase.quipMe()} Is there something I can do for you today?`
        return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt("Are you sure there is nothing I can do?")
        .getResponse()
        
      } else {
        speechText = "Welcome to BendroCorp's Alexa integration! It looks like you have not linked your BendroCorp account with the Alexa voice service yet. I have added a link card to your Alexa app. You will need to link your account before you can access any personalized features. Please note that this is only available to BendroCorp members!"
        return handlerInput.responseBuilder
        .speak(speechText)
        .withLinkAccountCard()
        .getResponse()
      }
    },
  };