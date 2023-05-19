import { ChatPostMessageResponse, WebClient } from "@slack/web-api";
import { ErrorManager } from "../../libs/error.manager";
import { LIST_COLOR } from "../../constant";
import { GlobalData, TextType } from "../../interfaces/interfaces";
import { SlackChannels } from "../../shared/register.channels";

export class ReportSlack {
  constructor(private readonly report: { channel: string }) {}
  public async withAttachments(
    data: GlobalData
  ): Promise<ChatPostMessageResponse> {
    const listChannel = SlackChannels;
    const ch = listChannel.channels.find(
      (ch) => ch.channelName === this.report.channel
    );
    try {
      const result = await listChannel.webClient.chat.postMessage({
        channel: ch!.channelId,
        text: data.title,
        attachments:
          data.attachmentsData !== undefined
            ? data!.attachmentsData!.map(({ color, title, description }) => ({
                color: LIST_COLOR[color],
                title,
                text: this.getDescription(description!),
              }))
            : undefined,
      });

      return result;
    } catch (error: any) {
      throw new ErrorManager({
        message: error.message,
        errorModule: "SLACK_REPORT",
      });
    }
  }

  private getDescription({ data, type }: { type: TextType; data: string }) {
    switch (type) {
      case "NORMAL":
        return data;
      case "CODE_BLOCK":
        return `\`\`\`\ ${data} \`\`\``;
      default:
        return data;
    }
  }
}
