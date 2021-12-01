/* eslint-disable functional/immutable-data */

import axios from 'axios';
import * as subject from 'src/util/pirate';

describe('util/quote', () => {
	describe('getQuote', () => {
		test('should return the quote when it can get the page', async () => {
			const template = '<html><body><h2 class="some class">Shiver me timbers</h2><body></html>';
			Object.defineProperty(axios, 'get', {
				value: jest.fn(() => Promise.resolve({ data: template })),
			});
			const quote = await subject.getQuote();
			expect(quote).toBe('Shiver me timbers');
		});
		test('should return an empty string when it cannot find a quote on the page', async () => {
			const template =
				'<html><body><h1 class="not a quote">Nothing a pirate would say</h1><body></html>';
			Object.defineProperty(axios, 'get', {
				value: jest.fn(() => Promise.resolve({ data: template })),
			});
			const quote = await subject.getQuote();
			expect(quote).toBe('');
		});
		test('should return an empty string when it cannot get the page', async () => {
			Object.defineProperty(axios, 'get', {
				value: jest.fn(() => Promise.reject(new Error('Shiver me timbers!'))),
			});
			const quote = await subject.getQuote();
			expect(quote).toBe('');
		});
	});
});
