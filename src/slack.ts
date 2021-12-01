import { WebClient, LogLevel } from '@slack/web-api';
import config from 'src/config';
import { formatDate } from 'src/util/date';
import { getPrompt } from 'src/util/prompts';

const client = new WebClient(config.SLACK_BOT_TOKEN, {
	logLevel: LogLevel.DEBUG,
});

export async function post(): Promise<void> {
	try {
		const now = new Date();
		const today = formatDate(now);
		const prompt = await getPrompt(today);

		if (!prompt) {
			console.log(`${today} No prompt today.`);
			return;
		}

		await client.chat.postMessage({
			channel: config.SLACK_CHANNEL_ID,
			text: `*${prompt}*`,
		});
		await client.conversations.setTopic({
			channel: config.SLACK_CHANNEL_ID,
			topic: `${prompt}`,
		});

		console.log(`${today} ${prompt}`);
	} catch (error) {
		console.error(JSON.stringify(error));
	}
}
