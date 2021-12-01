import 'fs/promises';
import * as subject from 'src/util/prompts';

jest.mock('fs/promises', () => {
	return {
		readFile: () =>
			Promise.resolve(
				JSON.stringify({
					'2000-12-24': {
						number: 1001,
						prompt: 'Umm, who do you think you are?',
					},
					'2000-12-25': {
						number: 1002,
						prompt: 'Will this test pass?',
					},
					'2000-12-26': {
						number: 1003,
						prompt: 'Umm... What gives... What... What gives you the right?',
					},
				})
			),
	};
});

describe('util/prompts', () => {
	describe('getPrompt', () => {
		test('should return the prompt for the provided date when it exists', async () => {
			const prompt = await subject.getPrompt('2000-12-25');
			expect(prompt).toBe('TUA1002: Will this test pass?');
		});
		test('should return an empty string for the provided date when it does not exist', async () => {
			const prompt = await subject.getPrompt('2000-12-01');
			expect(prompt).toBe('');
		});
	});
});
