/* eslint-disable functional/immutable-data, @typescript-eslint/prefer-readonly-parameter-types */

import Koa from 'koa';
import { getPrompt } from 'src/services/prompts';
import { postPromptToSlack } from 'src/services/slack';

export async function getHealth(ctx: Koa.Context): Promise<void> {
	ctx.status = 200;
	ctx.body = 'OK';
}

export async function postPrompt(ctx: Koa.Context): Promise<void> {
	const prompt = await getPrompt();
	await postPromptToSlack(prompt);

	ctx.status = 200;
	ctx.body = 'OK';
}
