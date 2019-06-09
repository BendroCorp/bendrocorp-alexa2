import { ErrorHandler, HandlerInput, RequestHandler, SkillBuilders } from 'ask-sdk-core';
import { Response,  SessionEndedRequest, IntentRequest } from 'ask-sdk-model';
import { ApiService } from '../services/api.service';
import { Globals } from '../globals';

export const OverrideApprovalRequestHandler : RequestHandler = {
    canHandle(handlerInput : HandlerInput) : boolean {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'OverrideApprovalIntent'
    },
    async handle(handlerInput : HandlerInput) : Promise<Response> {
        const api: ApiService = new ApiService(new Globals);
        const accessToken = handlerInput.requestEnvelope.session.user.accessToken;
        let request = (handlerInput.requestEnvelope.request as IntentRequest);

        let parseApprovalActionSlot = (slotValue:string) => {
        if (slotValue) {
            if (slotValue.toLowerCase() === "approve") {
                return 4;
            }else if (slotValue.toLowerCase() === "decline") {
                return 5;
            }else {
                return -1;
            }
        }
            return -1;
        }

        // let the diag flow happen
        if (request.dialogState == 'STARTED') {
            return new Promise((resolve, reject) => {
                resolve(handlerInput.responseBuilder.addDelegateDirective(request.intent).getResponse())
            })
        }
        else if (request.dialogState != 'COMPLETED')
        {
            return new Promise((resolve, reject) => {
                resolve(handlerInput.responseBuilder.addDelegateDirective().getResponse())
            })
        } else {
            // do nothing
        }

        const approvalId: number = parseInt((handlerInput.requestEnvelope.request as IntentRequest).intent.slots.approvalId.value);
        const approvalTypeName: string = (handlerInput.requestEnvelope.request as IntentRequest).intent.slots.approvalAction.value;
        const approvalTypeId: number = parseApprovalActionSlot((handlerInput.requestEnvelope.request as IntentRequest).intent.slots.approvalAction.value);
        const authCode: number = parseInt((handlerInput.requestEnvelope.request as IntentRequest).intent.slots.authCode.value);
        if (accessToken) {
            // run the request
            try
            {
                const overrideApprovalResponse = await api.override_approval(accessToken, authCode, approvalId, approvalTypeId);
                return new Promise((resolve, reject) => {
                    let speechText = `Approval ${approvalId} overridden and set to ${approvalTypeName}d! Is there anything else I can do for you?`
                    resolve(handlerInput.responseBuilder
                        .speak(speechText)
                        .reprompt("Are you sure there is nothing I can do?")
                        .getResponse() as Response)
                    });
            } catch (err) 
            {
                return new Promise((resolve, reject) => {
                    resolve(handlerInput.responseBuilder
                        .speak('Uh oh something went wrong. Don\'t worry we are aware of it and will get it fixed soon!')
                        .getResponse() as Response)
                    });
            }
        } else {
            return new Promise((resolve, reject) => {
                let speechText = "It looks like you have not linked your BendroCorp account with the Alexa voice service yet. I have added a link card to your Alexa app. You will need to link your account before you can access any personalized features."
                resolve(handlerInput.responseBuilder
                    .speak(speechText)
                    .withLinkAccountCard()
                    .getResponse() as Response)
                });
        }
    }
}