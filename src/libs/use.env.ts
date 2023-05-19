import { config } from "dotenv";

config();

interface GlobalEnv {
  SLACK_TOKEN: string;
  TEST_CHANNEL: string;
}

export class UseEnv {
  get(key: keyof GlobalEnv) {
    return process.env[key]!;
  }
}
