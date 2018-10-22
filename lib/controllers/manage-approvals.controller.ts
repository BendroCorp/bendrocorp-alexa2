import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response, IntentRequest, } from 'ask-sdk-model';
import { ApiService } from '../services/api.service';
import { Globals } from '../globals';

export const ManageApprovalsRequestHandler : RequestHandler = {
    canHandle(handlerInput : HandlerInput) : boolean {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ManageApprovalsIntent'
    },
    handle(handlerInput : HandlerInput) : Promise<Response> {
      const accessToken = handlerInput.requestEnvelope.session.user.accessToken
      let api:ApiService = new ApiService(new Globals)
      
      if (accessToken) {
        return new Promise((resolve, reject) => {
          api.approvals(accessToken).then((response) => {
            const responseData = response.data
            if (responseData.filter(x => x.approval_type_id < 4).length > 0) {
              let approvalActionSlotValue = (handlerInput.requestEnvelope.request as IntentRequest).intent.slots.approvalAction.value //handlerInput.requestEnvelope.request.intent.slots.approvalAction.value
              let approvalIdSlotValue = (handlerInput.requestEnvelope.request as IntentRequest).intent.slots.approvalId.value //handlerInput.requestEnvelope.request.intent.slots.approvalId.value
  
              if (responseData.filter(x => x.approval_type_id < 4).find(x => x.approval_id == parseInt(approvalIdSlotValue))) {
                let approval_type_id = this.parseApprovalActionSlot(approvalActionSlotValue)
  
                if (approval_type_id != -1) {
                  api.submit_approval(accessToken, parseInt(approvalIdSlotValue), approval_type_id).then(
                    response => {
                      resolve(handlerInput.responseBuilder
                        .speak("I have changed your approval status for approval number " + approvalIdSlotValue + " to " + approvalActionSlotValue + "ed. Is there anything else I can help you with?")
                        .reprompt("Is there anything else I can help you with?")
                        .getResponse() as Response);
                    },
                    error => {
                      console.log(error);
                      resolve(handlerInput.responseBuilder
                        .speak("I encountered an error while trying to change approval status please try again later. Please try again later.")
                        .getResponse() as Response)
                    }
                  )
                } else {
                  resolve(handlerInput.responseBuilder
                    .speak("The approval action you have provided is invalid you can either \"Approve\" or \"Decline\" an approval. If you would like to provide a different response say \"Manage approval " + approvalIdSlotValue + "\"")
                    .getResponse() as Response)
                }
              } else {
                resolve(handlerInput.responseBuilder
                  .speak("The approval id number you provided is not available for a status change.")
                  .getResponse() as Response)
              }
  
            } else {
              resolve(handlerInput.responseBuilder
                .speak("You do not have any approvals which are currently pending.")
                .getResponse() as Response)
            }
          }).catch((error) => {
            resolve(handlerInput.responseBuilder
              .speak("I received an error while attempting to fetch approvals data from BendroCorp. Please contact an executive member on Discord.")
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