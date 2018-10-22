import { ErrorHandler, HandlerInput, RequestHandler, SkillBuilders } from 'ask-sdk-core';
import { Response,  SessionEndedRequest } from 'ask-sdk-model';
import { ApiService } from '../services/api.service';
import { Globals } from '../globals';

export const ApprovalsRequestHandler : RequestHandler = {
    canHandle(handlerInput : HandlerInput) : boolean {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ApprovalsIntent'
    },
    handle(handlerInput : HandlerInput) : Promise<Response> {
      let api:ApiService =  new ApiService(new Globals)
      const accessToken = handlerInput.requestEnvelope.session.user.accessToken
      if (accessToken) {
        return new Promise((resolve, reject) => {
        api.approvals(accessToken).then((response) => {
          const responseData = response.data
          if (responseData.filter(x => x.approval_type_id < 4).length > 0) {
            let responseString:string = ""
            if (responseData.filter(x => x.approval_type_id < 4).length == 1) {
                responseString = `You currently have 1 outstanding approval. `
            } else {
                responseString = `You currently have ${responseData.length} outstanding approvals. `
            }

            // Iterate through the approvals
            responseData.filter(x => x.approval_type_id < 4).forEach(element => {
              responseString = `${responseString} Approval I.D. number ${element.approval_id} is a ${element.approval.approval_kind.title} for approval kind ${element.approval.approval_source_requested_item} which was requested by ${element.approval.approval_source_character_name}. `
              if (element.approval.approval_source_on_behalf_of) {
                responseString = `${responseString} This request was made on behalf of ${element.approval.approval_source_on_behalf_of}. `
              }
            });

            responseString = `${responseString} If you say Manage My Approvals or you say Manage Approval followed by its I.D. number I can assist with adjusting its status. Would you like to manage any of these approvals? `

            resolve(handlerInput.responseBuilder
              .speak(responseString)
              .reprompt("Would you like to manage an approval? If not just say no.")
              .getResponse() as Response)
          } else {
            let speechText = 'You do not have any approvals which are currently pending.'
            resolve(handlerInput.responseBuilder
              .speak(speechText)
              .getResponse() as Response)
          }
        }).catch((error) => {
            resolve(handlerInput.responseBuilder.speak('Thor is not available at the moment. Please try again later or contact your administrator.')
            .getResponse() as Response);
          });
        });
      } else {
        return new Promise((resolve, reject) => {
          let speechText = "It looks like you have not linked your BendroCorp account with the Alexa voice service yet. I have added a link card to your Alexa app. You will need to link your account before you can access any personalized features."
          resolve(handlerInput.responseBuilder
            .speak(speechText)
            .withLinkAccountCard()
            .getResponse() as Response)
         });
      }  
      
    },
  };