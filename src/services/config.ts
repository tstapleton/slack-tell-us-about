const keys = ['PORT', 'SLACK_BOT_TOKEN', 'SLACK_CHANNEL_ID'] as const;

type Config = Record<typeof keys[number], string>;

const config = keys.reduce((result, current) => {
	const value = process.env[current];
	if (!value) {
		throw new Error(`Oh snap! Missing environment variable value for ${current}`);
	}
	return {
		[current]: value,
		...result,
	};
}, {});

export default config as Config;
