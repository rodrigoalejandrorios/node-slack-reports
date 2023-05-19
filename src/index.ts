import { WebClient } from "@slack/web-api";
export { ErrorReportSlack, ReportSlack } from "./message";
export { SlackChannels } from "./shared/register.channels";
/**
 * Instance this method with your credentials
 *
 * ```ts
 * const webClient = new CreateWebClient('token_here')
 * ```
 */
export const CreateWebClient = WebClient;
