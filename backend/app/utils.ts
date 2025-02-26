import { profiles } from "./constants";
import { CommandType, Profile } from "./types";

export class BuildProfileError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BuildProfileError";
  }
}

export const buildProfile = (text: string): Profile => {
  const textWithoutMention = text.replace(/^<@(.+?)>/, "").trim();

  if (!Object.values(CommandType).includes(textWithoutMention as CommandType)) {
    throw new BuildProfileError("コマンドを認識出来ませんでした！有効なコマンドは in / out / bi / bo / def のいずれかです🙇‍♂️");
  }

  const command = textWithoutMention;

  return {
    status_text: profiles[command].status_text,
    status_emoji: profiles[command].status_emoji,
  };
};
