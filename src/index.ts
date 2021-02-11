import 'dotenv/config';
import { WebClient, LogLevel } from '@slack/web-api';

// TODO: add support for holidays - https://github.com/commenthol/date-holidays

// TODO: only print message on weekdays
// 0 is Sunday and 6 is Saturday, so we can mod 6
// const isWeekday = (d: Date) => d.getDay() % 6 !== 0;

const now = new Date();

const channelId = 'C01NDUL2788';
const client = new WebClient(process.env.SLACK_BOT_TOKEN, {
	logLevel: LogLevel.DEBUG,
});

(async () => {
	try {
		const result = await client.chat.postMessage({
			channel: channelId,
			text: `Hello, world. It is ${now.toString()}`,
		});
		console.log(result);
	} catch (error) {
		console.error(JSON.stringify(error));
	}
})();
