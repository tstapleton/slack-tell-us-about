import app from 'src/app';
import config from 'src/config';
import { getQuote } from 'src/util/pirate';

app.listen(config.PORT, async () => {
	console.info(`Running on http://localhost:${config.PORT}`);
	const quote = await getQuote();
	console.info(quote);
});

process.on('unhandledRejection', (error: Readonly<Error>) => {
	// we have a handler for unhandled errors so we'll just throw to that
	throw error;
});

process.on('uncaughtException', (error: Readonly<Error>) => {
	// received an error that wasn't handled, we'll capture it and restart
	console.error(error);
	process.exit(1);
});
