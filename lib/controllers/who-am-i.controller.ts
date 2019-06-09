import { ErrorHandler, HandlerInput, RequestHandler, SkillBuilders } from 'ask-sdk-core';
import { Response,  SessionEndedRequest } from 'ask-sdk-model';
import { ApiService } from '../services/api.service';
import { Globals } from '../globals';

export const WhoAmIRequestHandler : RequestHandler = {
  canHandle(handlerInput : HandlerInput) : boolean {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
    && handlerInput.requestEnvelope.request.intent.name === 'WhoAmIIntent'
  },
  handle(handlerInput : HandlerInput) : Promise<Response> {
    let api:ApiService = new ApiService(new Globals)
    let accessToken = handlerInput.requestEnvelope.session.user.accessToken

    if (accessToken) {
      return new Promise((resolve, reject) => {
        api.me(accessToken).then((response) => {
          let responseText:string = ""

          responseText = `You are ${response.data.main_character.first_name} ${response.data.main_character.last_name}. You are in the following primary roles. `

          response.data.roles.forEach(element => {
            responseText = `${responseText} ${element.name}. `
          });

          resolve(handlerInput.responseBuilder
            .speak(responseText)
            .getResponse() as Response)
        }).catch((error) => {
          console.log(error)          
          resolve(handlerInput.responseBuilder.speak('I encountered an issue trying to retrieve your user information from BendroCorp. Please try again later!')
          .getResponse() as Response);
         });
       });
    } else {
      return new Promise<Response>((resolve, reject) => {
        const auxResponse = "It looks like you have not linked your BendroCorp account with the Alexa voice service yet. I have added a link card to your Alexa app. You will need to link your account before you can access any personalized features."
        let response =  handlerInput.responseBuilder
        .speak(auxResponse)
        .withLinkAccountCard()
        .getResponse();

        resolve(response as Response)
      });
    };
  },
};