import { CommandType, Profile } from "./types";

export const profiles: { [key: string]: Profile } = {
  [CommandType.DEF]: {
    status_text: "",
    status_emoji: "",
  },
  [CommandType.IN]: {
    status_text: "勤務中",
    status_emoji: ":computer:",
  },
  [CommandType.BI]: {
    status_text: "休憩中",
    status_emoji: ":coffee:",
  },
  [CommandType.BO]: {
    status_text: "勤務中",
    status_emoji: ":computer:",
  },
  [CommandType.OUT]: {
    status_text: "退勤済み",
    status_emoji: ":house:",
  },
}
