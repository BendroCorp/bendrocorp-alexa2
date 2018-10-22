import { ErrorHandler, HandlerInput, RequestHandler, SkillBuilders } from 'ask-sdk-core';
import { Response,  SessionEndedRequest } from 'ask-sdk-model';
import * as moment_ from 'moment'
import { ApiService } from '../services/api.service';
import { Globals } from '../globals';

export const EventsIntentHandler : RequestHandler = {
    canHandle(handlerInput : HandlerInput) : boolean {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'EventIntent';
    },
    handle(handlerInput : HandlerInput) : Promise<Response> {
      const moment = moment_;
      const api:ApiService = new ApiService(new Globals)
      const accessToken = handlerInput.requestEnvelope.session.user.accessToken
      if (accessToken) {
        // Not at all confusing - https://stackoverflow.com/questions/50116998/http-request-with-alexa-and-lambda-on-sdk-v2-how-to-make-it-works :D
         return new Promise<Response>((resolve, reject) => {
          api.events(accessToken).then((response) => {
            if (response.data.length > 0) {
              // Response text
              let responseText:string = ""

              if (response.data.length == 1) {
                responseText = `There is currently 1 event scheduled called ${response[0].name}. The event is scheduled for ${moment(response[0].start_date_ms).format('MMMM Do YYYY, h:mm:ss a')}.`
              } else {
                // there is more that one
                responseText = `There are currently ${response.data.length} events scheduled: `

                // Iterate through each of the items
                for (let index = 0; index < response.data.length; index++) {
                  const event = response.data[index];
                  responseText = `${responseText} There is an event called ${event.name}. The event is scheduled for ${moment(event.start_date_ms).format('MMMM Do YYYY, h:mm:ss a')}. `
                }

                responseText = `${responseText} There are no other events scheduled`

                resolve(handlerInput.responseBuilder
                  .speak(responseText)
                  .withSimpleCard('BendroCorp Events', responseText)
                  .getResponse() as Response) 
            }

              this.handler.response.speak(responseText)
            } else {
              let speechText = "There are currently no upcoming events scheduled. Maybe check back later."
              resolve(handlerInput.responseBuilder
                .speak(speechText)
                .withSimpleCard('No Upcoming Events', speechText)
                .getResponse() as Response) 
            }
          }).catch((error) => {
            console.log(error)
          
            resolve(handlerInput.responseBuilder.speak('I encountered an issue while trying to retrieve events. Please try again later!')
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

          resolve(response)
         });        
      }

      // const speechText = "This is the stub for events"
      // return handlerInput.responseBuilder
      //   .speak(speechText)
      //   // .withSimpleCard('Hello World', speechText)
      //   .getResponse();
    },
  };