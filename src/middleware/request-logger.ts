import Koa from 'koa';
import { Middleware } from 'koa-compose';

/* eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types */
async function doLogRequest(ctx: Koa.Context, next: () => Promise<void>): Promise<void> {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
}

export default function requestLogger(): Middleware<Koa.Context> {
	return doLogRequest;
}
