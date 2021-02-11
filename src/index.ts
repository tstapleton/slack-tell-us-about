import 'dotenv/config';
import { WebClient, LogLevel } from '@slack/web-api';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

interface Prompt {
	number: number;
	prompt: string;
}

const FILE = resolve(process.cwd(), './data/prompts.json');
const channelId = 'C01NDUL2788';
const client = new WebClient(process.env.SLACK_BOT_TOKEN, {
	logLevel: LogLevel.DEBUG,
});


const formatDate = (dateTime: string | number | Date): string => {
	const dateObj = new Date(dateTime);
	const year = dateObj.getFullYear();
	const month = `0${dateObj.getMonth() + 1}`.slice(-2);
	const date = `0${dateObj.getDate()}`.slice(-2);
	return `${year}-${month}-${date}`;
}

const formatPrompt = (prompt: Prompt) => `*TUA${prompt.number}: ${prompt.prompt}*`;

const getPrompt = async (file: string) => {
	const data = await readFile(file, 'utf-8');
	const prompts = JSON.parse(data);

	const now = new Date();
	const today = formatDate(now);

	const prompt = prompts[today];
	return formatPrompt(prompt);
}

(async () => {
	try {
		const prompt = await getPrompt(FILE);
		const messageResult = await client.chat.postMessage({
			channel: channelId,
			text: `${prompt}`,
		});
		console.log(messageResult);

		const topicResult = await client.conversations.setTopic({
			channel: channelId,
			topic: `${prompt}`
		});
		console.log(topicResult);
	} catch (error) {
		console.error(JSON.stringify(error));
	}
})();
