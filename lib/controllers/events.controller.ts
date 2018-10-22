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
    handle(handlerInput : HandlerInput) : Response {
      const moment = moment_;
      const api:ApiService = new ApiService(new Globals)
      const accessToken = handlerInput.requestEnvelope.session.user.accessToken
      if (accessToken) {
        let response = api.events(accessToken).then((response) => {
          const events = response.data;
          const speechText = `This is the stub for events and there are ${events.length} events!`
          return handlerInput.responseBuilder
          .speak(speechText)
          // .withSimpleCard('Hello World', speechText)
          .getResponse();
        })
        .catch((reason) => {
          const speechText = "This is the stub for events and something went wrong!"

          return handlerInput.responseBuilder
          .speak(speechText)
          // .withSimpleCard('Hello World', speechText)
          .getResponse();
        })
        
        // const speechText = "This is the stub for events and you have an access token!"
        // return handlerInput.responseBuilder
        // .speak(speechText)
        // // .withSimpleCard('Hello World', speechText)
        // .getResponse();



        // api.events(handlerInput.requestEnvelope.session.user.accessToken).subscribe(
        //   response => {
        //     if (response.length > 0) {
        //       // Response text
        //       let responseText:string = ""

        //       if (response.length == 1) {
        //         responseText = `There is currently 1 event scheduled called ${response[0].name}. The event is scheduled for ${moment(response[0].start_date_ms).format('MMMM Do YYYY, h:mm:ss a')}.`
        //       } else {
        //         // there is more that one
        //         responseText = `There are currently ${response.length} events scheduled: `

        //         // Iterate through each of the items
        //         response.forEach(function(ev){
        //             responseText = `${responseText} There is an event called ${ev.name}. The event is scheduled for ${moment(ev.start_date_ms).format('MMMM Do YYYY, h:mm:ss a')}. `
        //         })

        //         responseText = `${responseText} There are no other events scheduled`

        //         return handlerInput.responseBuilder
        //         .speak(responseText)
        //         .withSimpleCard('BendroCorp Events', responseText)
        //         .getResponse();
        //     }

        //       this.handler.response.speak(responseText)
        //     } else {
        //       let speechText = "There are currently no upcoming events scheduled. Maybe check back later."
        //       return handlerInput.responseBuilder
        //       .speak(speechText)
        //       .withSimpleCard('No Upcoming Events', speechText)
        //       .getResponse();
        //     }
        //   },
        //   err => {
        //     console.error(err);
        //     let speechText = "I received an error while attempting to fetch events data from BendroCorp. Please contact an executive member on Discord."
        //     return handlerInput.responseBuilder
        //     .speak(speechText)
        //     .withSimpleCard('Error Fetching Events', speechText)
        //     .getResponse();
        //   }
        // )
      } else {
        const auxResponse = "It looks like you have not linked your BendroCorp account with the Alexa voice service yet. I have added a link card to your Alexa app. You will need to link your account before you can access any personalized features."
        return handlerInput.responseBuilder
        .speak(auxResponse)
        .withLinkAccountCard()
        .getResponse();
      }

      // const speechText = "This is the stub for events"
      // return handlerInput.responseBuilder
      //   .speak(speechText)
      //   // .withSimpleCard('Hello World', speechText)
      //   .getResponse();
    },
  };