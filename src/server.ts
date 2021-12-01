import app from 'src/app';
import config from 'src/services/config';
import logger from 'src/services/logger';
import { getQuote } from 'src/services/pirate';

app.listen(config.PORT, async () => {
	logger.info(`Running on http://localhost:${config.PORT}`);
	const quote = await getQuote();
	logger.info(quote);
});

process.on('unhandledRejection', (error: Readonly<Error>) => {
	// we have a handler for unhandled errors so we'll just throw to that
	throw error;
});

process.on('uncaughtException', (error: Readonly<Error>) => {
	// received an error that wasn't handled, we'll capture it and restart
	logger.error(error);
	process.exit(1);
});
