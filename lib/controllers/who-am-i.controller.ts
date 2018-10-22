import { ErrorHandler, HandlerInput, RequestHandler, SkillBuilders } from 'ask-sdk-core';
import { Response,  SessionEndedRequest } from 'ask-sdk-model';
import { ApiService } from '../services/api.service';
import { Globals } from '../globals';

// export const WhoAmIRequestHandler : RequestHandler = {
//     canHandle(handlerInput : HandlerInput) : boolean {
//       return handlerInput.requestEnvelope.request.type === 'IntentRequest'
//       && handlerInput.requestEnvelope.request.intent.name === 'WhoAmIIntent'
//     },
//     handle(handlerInput : HandlerInput) : Response {
//       let api:ApiService = new ApiService(new Globals)
//       let accessToken = handlerInput.requestEnvelope.session.user.accessToken
//       if (accessToken) {
//         api.me(accessToken).subscribe(
//           response => {
//             // let responseText:string = ""

//             const responseText = `You are ${response.main_character.first_name} ${response.main_character.last_name}. You are in the following primary roles. `

//             // response.roles.forEach(element => {
//             // responseText = `${responseText} ${element.title}. `
//             // });

//             return handlerInput.responseBuilder
//             .speak(responseText)
//             .getResponse();
//           },
//           error => {
//             console.error(error);
//             return handlerInput.responseBuilder
//             .speak("I received an error while attempting to fetch your user data from BendroCorp. Please contact an executive member on Discord.")
//             .getResponse();
//           }
//         )
//       } else {
//           let speechText = "It looks like you have not linked your BendroCorp account with the Alexa voice service yet. I have added a link card to your Alexa app. You will need to link your account before you can access any personalized features."
//           return handlerInput.responseBuilder
//           .speak(speechText)
//           .withLinkAccountCard()
//           .getResponse();
//       }
//     },
//   };

export const WhoAmIRequestHandler : RequestHandler = {
  canHandle(handlerInput : HandlerInput) : boolean {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
    && handlerInput.requestEnvelope.request.intent.name === 'WhoAmIIntent'
  },
  handle(handlerInput : HandlerInput) : Response {
    const speechText = "This is a test of who am i"

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      // .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};