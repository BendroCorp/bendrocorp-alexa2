import { ErrorHandler, HandlerInput, RequestHandler, SkillBuilders } from 'ask-sdk-core';
import { Response,  SessionEndedRequest } from 'ask-sdk-model';
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
  .addErrorHandlers(new CustomErrorHandler())
  .lambda();
