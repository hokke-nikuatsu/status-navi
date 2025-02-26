export type Profile = {
  status_text: string;
  status_emoji: string;
  status_expiration?: number;
};

export enum CommandType {
  DEF = "def",
  IN = "in",
  OUT = "out",
  BI = "bi",
  BO = "bo",
}
