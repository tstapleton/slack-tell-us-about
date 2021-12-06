import { mockWebClient } from '../../__mocks__/slack-web-client';
import * as subject from 'src/services/slack';

jest.mock('src/services/config');
jest.mock('src/services/logger');
jest.mock('@slack/web-api', () => {
	return {
		LogLevel: {
			DEBUG: 'DEBUG',
		},
		WebClient: jest.fn().mockImplementation(() => mockWebClient),
	};
});

describe('services/slack', () => {
	describe('postPromptToSlack', () => {
		beforeEach(() => {
			jest.resetAllMocks();
		});
		test('should post the message and set the topic when the prompt is defined', async () => {
			const channel = 'test-channel-id';
			const prompt = 'test prompt';
			await subject.postPromptToSlack(channel, prompt);

			expect(mockWebClient.chat.postMessage).toHaveBeenCalledWith({
				channel,
				text: `*${prompt}*`,
			});
			expect(mockWebClient.conversations.setTopic).toHaveBeenCalledWith({
				channel,
				topic: prompt,
			});
		});
		test('should not post the message or set the topic when the channel is undefined', async () => {
			/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
			// @ts-ignore passing undefined as channel to verify behavior
			await subject.postPromptToSlack();
			expect(mockWebClient.chat.postMessage).not.toHaveBeenCalled();
			expect(mockWebClient.conversations.setTopic).not.toHaveBeenCalled();
		});
		test('should not post the message or set the topic when the prompt is undefined', async () => {
			await subject.postPromptToSlack('test-channel-id');
			expect(mockWebClient.chat.postMessage).not.toHaveBeenCalled();
			expect(mockWebClient.conversations.setTopic).not.toHaveBeenCalled();
		});
	});
});
