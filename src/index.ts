import Koa from 'koa';
import Router from '@koa/router';
import config from 'src/config';
import { post } from 'src/slack';

const app = new Koa();
const router = new Router();

router.post('/post', async (ctx) => {
	await post();
	ctx.body = 'Hello, world!';
});

app.use(async (ctx, next) => {
	try {
		await next();
	} catch (e) {
		const error = e as Error;
		ctx.body = { error: error.message };
		ctx.status = 500;
		console.error(error);
	}
});

app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(router.routes());

app.listen(config.PORT);
