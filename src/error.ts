export class ApiError extends Error {
	readonly status: number;

	constructor(message: string, status = 500) {
		super(message);
		this.name = 'APIError';
		this.status = status;
	}
}
