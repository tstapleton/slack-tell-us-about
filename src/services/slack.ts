import { WebClient, LogLevel } from '@slack/web-api';
import config from 'src/services/config';
import logger from 'src/services/logger';

const client = new WebClient(config.SLACK_BOT_TOKEN, {
	logLevel: LogLevel.DEBUG,
});

export async function postPromptToSlack(channel: string, prompt?: Readonly<string>): Promise<void> {
	if (!channel) {
		logger.error('No channel provided');
		return;
	}

	if (!prompt) {
		logger.error('No prompt provided');
		return;
	}

	await client.chat.postMessage({
		channel,
		text: `*${prompt}*`,
	});
	await client.conversations.setTopic({
		channel,
		topic: `${prompt}`,
	});

	logger.info(`Successfully posted to Slack: ${prompt}`);
}
