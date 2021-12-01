export function formatDate(date: Readonly<Date>): string {
	return date.toISOString().split('T')[0];
}
