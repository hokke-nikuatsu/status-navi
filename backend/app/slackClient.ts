import { Profile } from "./types";
import { WebClient } from "@slack/web-api";

export class SlackProfileError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SlackProfileError";
  }
}

export const setSlackProfile = async (client: WebClient, profile: Profile) => {
  try {
    return await client.users.profile.set({
      token: process.env.SLACK_USER_TOKEN,
      profile: JSON.stringify(profile),
    });
  } catch (error) {
    throw new SlackProfileError("エラーが発生しました！しばらく経ってから再度お試しください🙇‍♂️");
  }
};
