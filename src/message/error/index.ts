import { ChatPostMessageResponse } from "@slack/web-api";
import { LIST_COLOR } from "../../constant";
import { ErrorManager } from "../../libs/error.manager";
import { SlackChannels } from "../../shared/register.channels";
import { EMOJIS } from "../../constant/emojis";

/**
 * Error reporter for developers
 *
 * Example:
 *
 * ```ts
 * class UserController {
 *  constructor(
 *  private readonly slackError: ErrorReportSlack = 
 *    new ErrorReportSlack({
 *       module: string;
 *       channel: string;
 *    })
 *  ) { }
 *
 *  public async getUser(){
 *    try {
 *    //Code here...
 *    } catch((err)=>{
 *      await this.slackError.send({
 *        message: err.message,
 *        method: "public async getUser()"
 *      })
 *      throw new Error(err.message)
 *    })
 *  }
 * }
 * ```
 */
export class ErrorReportSlack {
  private module!: string;
  private channel!: string;
  constructor({ channel, module }: { module: string; channel: string }) {
    this.channel = channel;
    this.module = module;
  }

  public async send({
    message,
    method,
  }: {
    message: string;
    method: string;
  }): Promise<ChatPostMessageResponse> {
    const listChannel = SlackChannels;
    const ch = listChannel.channels.find(
      (ch) => ch.channelName === this.channel
    );
    try {
      const result = await listChannel.webClient.chat.postMessage({
        channel: ch!.channelId,
        text: `${EMOJIS.mega} New error reported: `,
        attachments: [
          {
            color: LIST_COLOR.ERROR,
            title: "Error module:",
            text: `\`\ ${this.module} \``,
          },
          {
            color: LIST_COLOR.ERROR,
            title: "In the method:",
            text: `\`\ ${method} \``,
          },
          {
            color: LIST_COLOR.ERROR,
            title: "Error data:",
            text: `\`\`\`\ ${message} \`\`\``,
          },
        ],
      });
      return result;
    } catch (error: any) {
      throw new ErrorManager({
        message: error.message,
        errorModule: "SLACK_REPORT",
      });
    }
  }
}
