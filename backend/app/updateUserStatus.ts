import { App, AwsLambdaReceiver, AwsLambdaReceiverOptions } from "@slack/bolt";
import { APIGatewayProxyEvent, Context, Callback, APIGatewayProxyResult } from "aws-lambda";
import { setSlackProfile, SlackProfileError } from "./slackClient";
import { buildProfile, BuildProfileError } from './utils';

const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET || ""
} as AwsLambdaReceiverOptions);

const app = new App({
  token: process.env.SLACK_BOT_TOKEN || "",
  receiver: awsLambdaReceiver
});

app.event("app_mention", async ({ event, client }) => {
  try {
    console.log("event:", event);

    const { text } = event;
    const profile = buildProfile(text);

    await setSlackProfile(client, profile);
  } catch (error) {
    if (error instanceof BuildProfileError || error instanceof SlackProfileError) {
      console.error(error.message);

      await client.chat.postMessage({
        channel: event.channel,
        text: error.message,
      });
    } else {
      console.error("unexpected error:", error);

      await client.chat.postMessage({
        channel: event.channel,
        text: "エラーが発生しました！担当者にお問い合わせください🙇‍♂️",
      });
    }
  }
});

exports.lambda_handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback<APIGatewayProxyResult>
): Promise<APIGatewayProxyResult> => {
  console.log(event);

  try {
    const handler = await awsLambdaReceiver.start();

    return handler(event, context, callback);
  } catch (error) {
    console.error("Error in Lambda handler:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
