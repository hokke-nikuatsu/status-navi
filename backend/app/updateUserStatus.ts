import { App, AwsLambdaReceiver, AwsLambdaReceiverOptions } from '@slack/bolt';
import { APIGatewayProxyEvent, Context, Callback, APIGatewayProxyResult } from 'aws-lambda';

const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET || ''
} as AwsLambdaReceiverOptions);

const app = new App({
  token: process.env.SLACK_BOT_TOKEN || '',
  receiver: awsLambdaReceiver
});

app.event('app_mention', async ({ event, client }) => {
  try {
    console.log(event);
    const { text } = event;
    const textWithoutMention = text.replace(/^<@(.+?)>/, '').trim();

    if (textWithoutMention === "bi") {
      await client.users.profile.set({
        token: process.env.SLACK_USER_TOKEN,
        profile: JSON.stringify({
          status_text: "休憩中",
          status_emoji: ":coffee:",
        }),
      });
    }
  } catch (error) {
    console.error(error);
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
