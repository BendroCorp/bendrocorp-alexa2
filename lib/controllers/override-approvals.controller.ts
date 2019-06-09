import { ErrorHandler, HandlerInput, RequestHandler, SkillBuilders } from 'ask-sdk-core';
import { Response,  SessionEndedRequest, IntentRequest } from 'ask-sdk-model';
import { ApiService } from '../services/api.service';
import { Globals } from '../globals';

export const OverrideApprovalsRequestHandler : RequestHandler = {
    canHandle(handlerInput : HandlerInput) : boolean {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'OverrideApprovalsIntent'
    },
    async handle(handlerInput : HandlerInput) : Promise<Response> {
        const api: ApiService = new ApiService(new Globals);
        const accessToken = handlerInput.requestEnvelope.session.user.accessToken;
        let request = (handlerInput.requestEnvelope.request as IntentRequest);
        if (accessToken)
        {
            const pendingApprovalCount = await api.pending_approval_count(accessToken);
            request.intent.slots.approvalCount.value = `${pendingApprovalCount.data.count}`;
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

        const authCode: number = parseInt((handlerInput.requestEnvelope.request as IntentRequest).intent.slots.authCode.value);
        if (accessToken) {
            // run the request
            try {
                const overrideAllResponse = await api.override_all_approvals(accessToken, authCode);
                return new Promise((resolve, reject) => {
                    let speechText = "All pending approvals have been overriden as approved. I hope you know what you are doing boss..."
                    resolve(handlerInput.responseBuilder
                        .speak(speechText)
                        .getResponse() as Response)
                    });
            } catch (err) {
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