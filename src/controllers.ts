/* eslint-disable functional/immutable-data, @typescript-eslint/prefer-readonly-parameter-types */

import Koa from 'koa';
import config from 'src/services/config';
import { getPrompt } from 'src/services/prompts';
import { postPromptToSlack } from 'src/services/slack';

export async function getHealth(ctx: Koa.Context): Promise<void> {
	ctx.status = 200;
	ctx.body = 'OK';
}

export async function postPrompt(ctx: Koa.Context): Promise<void> {
	const channelProvided = Array.isArray(ctx.query.channel)
		? ctx.query.channel[0]
		: ctx.query.channel;
	const channel = channelProvided || config.SLACK_CHANNEL_ID;

	const prompt = await getPrompt();
	await postPromptToSlack(channel, prompt);

	ctx.status = 200;
	ctx.body = 'OK';
}
