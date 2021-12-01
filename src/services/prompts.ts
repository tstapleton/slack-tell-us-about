import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { formatDate } from 'src/services/date';
import logger from 'src/services/logger';
import * as Types from 'src/types';

export async function getPrompt(): Promise<string | undefined> {
	const now = new Date();
	const today = formatDate(now);
	const prompt = await readPrompt(today);

	if (!prompt) {
		logger.info(`${today} No prompt today.`);
		return;
	}

	const message = `TUA${prompt.number}: ${prompt.prompt}`;
	logger.info(`${today} ${message}`);
	return message;
}

export async function readPrompt(date: string): Promise<Types.Prompt> {
	const file = resolve(process.cwd(), './data/prompts.json');

	const data = await readFile(file, 'utf-8');
	const prompts: Types.Prompts = JSON.parse(data);

	return prompts[date];
}
