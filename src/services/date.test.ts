import * as subject from 'src/services/date';

describe('services/date', () => {
	describe('formatDate', () => {
		test('should return the formatted date', () => {
			// month is 0-indexed
			const date = new Date(2000, 11, 25);
			expect(subject.formatDate(date)).toBe('2000-12-25');
		});
	});
});
