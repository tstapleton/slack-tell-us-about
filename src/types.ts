export interface Prompt {
	readonly number: number;
	readonly prompt: string;
}

export type Prompts = Record<string, Prompt>;
