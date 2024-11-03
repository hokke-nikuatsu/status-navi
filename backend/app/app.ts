import { App, AwsLambdaReceiver, AwsLambdaReceiverOptions } from '@slack/bolt';
import { APIGatewayProxyEvent, Context, Callback, APIGatewayProxyResult } from 'aws-lambda';

const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET || ''
} as AwsLambdaReceiverOptions);

const app = new App({
  token: process.env.SLACK_BOT_TOKEN || '',
  receiver: awsLambdaReceiver
});

app.event('app_mention', async ({ event, say }) => {
  try {
    console.log(event);
    const { channel, event_ts, text } = event;
    const textWithoutMention = text.replace(/^<@(.+?)>/, '').trim();

    await say({
      channel,
      thread_ts: event_ts,
      text: `Hello! :wave: \n> ${textWithoutMention}`,
    });
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

  const handler = await awsLambdaReceiver.start();
  return handler(event, context, callback);
};
