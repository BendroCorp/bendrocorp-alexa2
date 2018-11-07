import { ErrorHandler, HandlerInput, RequestHandler, SkillBuilders, ResponseInterceptor } from 'ask-sdk-core';
import { Response,  SessionEndedRequest, IntentRequest } from 'ask-sdk-model';
import { LaunchRequestHandler } from './controllers/launch-request.controller'
import { AboutUsRequestHandler } from './controllers/about-us.controller'
import { ApprovalsRequestHandler } from './controllers/approvals.controller'
import { EventsIntentHandler } from './controllers/events.controller'
import { CancelAndStopIntentHandler, SessionEndedRequestHandler } from './controllers/help.controller'
import { ManageApprovalsRequestHandler } from './controllers/manage-approvals.controller'
import { EltrapRequestHandler } from './controllers/misc.controller'
import { WhoAmIRequestHandler } from './controllers/who-am-i.controller'
import { LambdaHandler } from 'ask-sdk-core/dist/skill/factory/BaseSkillFactory';
import { CustomErrorHandler } from './controllers/error.controller'
import { DialogState } from 'aws-sdk/clients/lexruntime';
import { RequestInterceptor } from 'ask-sdk-runtime';

// TODO: Research this method rather than doing dialog handling per controller
// const DialogResponseInterceptor : ResponseInterceptor = {
//   process(handlerInput : HandlerInput, response: Response) : Promise<void> {
//     // return handlerInput.attributesManager.savePersistentAttributes();
//     let request = (handlerInput.requestEnvelope.request as IntentRequest)

//     if (request.dialogState == 'STARTED') {
//       let  updatedIntent = request.intent  //this.event.request.intent;
//       response = handlerInput.responseBuilder.addDelegateDirective(updatedIntent).getResponse()
//       // this.emit(":delegate", updatedIntent);
//     }else if (request.dialogState == 'COMPLETED'){
//       response = handlerInput.responseBuilder.addDelegateDirective().getResponse()
//       // this.emit(":delegate");
//     }else{
//       // return request.intent;
//       // return request;
//       // return handlerInput.responseBuilder.addConfirmIntentDirective(request.intent).getResponse()
//     }

//     return handlerInput.attributesManager.savePersistentAttributes();
//   },
// };


exports.handler = SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    AboutUsRequestHandler,
    EventsIntentHandler,
    ApprovalsRequestHandler,
    ManageApprovalsRequestHandler,
    EltrapRequestHandler,
    WhoAmIRequestHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
  )
  //.addRequestInterceptors(
  //   DialogResponseInterceptor
  // )
  .addErrorHandlers(new CustomErrorHandler())
  .lambda();
