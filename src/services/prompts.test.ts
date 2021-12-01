import * as subject from 'src/services/prompts';

jest.mock('src/services/logger');
jest.mock('fs/promises', () => ({
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
}));

describe('services/prompts', () => {
	describe('getPrompt', () => {
		test('should return the prompt string for the provided date when it exists', async () => {
			jest.useFakeTimers().setSystemTime(new Date(2000, 11, 25));
			const prompt = await subject.getPrompt();
			expect(prompt).toBe('TUA1002: Will this test pass?');
		});
		test('should return undefined when the prompt for the provided date does not exist', async () => {
			jest.useFakeTimers().setSystemTime(new Date(2000, 11, 1));
			const prompt = await subject.getPrompt();
			expect(prompt).toBeUndefined();
		});
	});
	describe('readPrompt', () => {
		test('should return the prompt for the provided date when it exists', async () => {
			const prompt = await subject.readPrompt('2000-12-25');
			expect(prompt).toStrictEqual({ number: 1002, prompt: 'Will this test pass?' });
		});
		test('should return undefined when the prompt for the provided date does not exist', async () => {
			const prompt = await subject.readPrompt('2000-12-01');
			expect(prompt).toBeUndefined();
		});
	});
});
