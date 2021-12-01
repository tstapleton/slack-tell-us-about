/* eslint-disable functional/immutable-data, @typescript-eslint/prefer-readonly-parameter-types */

import Koa from 'koa';
import { post } from 'src/slack';

export async function getHealth(ctx: Koa.Context): Promise<void> {
	ctx.status = 200;
	ctx.body = 'OK';
}

export async function postPrompt(ctx: Koa.Context): Promise<void> {
	await post();

	ctx.status = 200;
	ctx.body = 'OK';
}
