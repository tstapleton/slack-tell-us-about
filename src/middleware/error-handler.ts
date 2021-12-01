/* eslint-disable functional/immutable-data, @typescript-eslint/prefer-readonly-parameter-types */

import { Context } from 'koa';
import { Middleware } from 'koa-compose';
import { ApiError } from 'src/error';

const defaultErrorHandler = async (ctx: Context, next: () => Promise<void>): Promise<void> => {
	try {
		await next();
	} catch (e) {
		if (e instanceof ApiError) {
			ctx.body = { error: e.message };
			ctx.status = e.status;
			return;
		}
		const error = e as Error;
		ctx.body = { error: error.message };
		ctx.status = 500;
	}
};

const errorHandler = (): Middleware<Context> => defaultErrorHandler;

export default errorHandler;
