import Koa from 'koa';
import Router from '@koa/router';
import config from 'src/config';
import { post } from 'src/slack';

const app = new Koa();
const router = new Router();

/* eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types */
router.post('/post', async (ctx: Koa.Context) => {
	await post();
	/* eslint-disable-next-line functional/immutable-data */
	ctx.body = 'Hello, world!';
});

/* eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types */
app.use(async (ctx: Koa.Context, next) => {
	try {
		await next();
	} catch (e) {
		const error = e as Error;
		/* eslint-disable functional/immutable-data */
		ctx.body = { error: error.message };
		ctx.status = 500;
		/* eslint-enable functional/immutable-data */
		console.error(error);
	}
});

/* eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types */
app.use(async (ctx: Koa.Context, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(router.routes());

app.listen(config.PORT);
