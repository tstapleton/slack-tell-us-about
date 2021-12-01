import { readFile } from 'fs/promises';
import { resolve } from 'path';
import * as Types from 'src/types';

export async function getPrompt(date: string): Promise<string> {
	const file = resolve(process.cwd(), './data/prompts.json');

	const data = await readFile(file, 'utf-8');
	const prompts: Types.Prompts = JSON.parse(data);

	const prompt = prompts[date];
	return prompt ? `TUA${prompt.number}: ${prompt.prompt}` : '';
}
