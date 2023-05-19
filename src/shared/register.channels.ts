import { WebClient } from "@slack/web-api";

export interface IRegisterChannel {
  channelId: string;
  channelName: string;
}

/**
 * Register your channels of Slack for this librery
 * 
 *
 * ```ts
 * SlackChannels.register({
 *  slackWebClient: webClient,
 *  channels: [
 *    {
 *      channelId: 'CHANNEL_ID';
 *      channelName: 'CHANNEL_NAME';
 *    }
 *  ],
 * })
 * ```
 */
export class SlackChannels {
  public static webClient: WebClient;
  public static channels: IRegisterChannel[] = [];

  public static register({
    slackWebClient,
    channels,
  }: {
    slackWebClient: WebClient;
    channels: IRegisterChannel[];
  }) {
    this.webClient = slackWebClient;
    this.channels = [...channels];
  }
}
