import type { Message } from '$models/Message';

export type ChatRequest = {
	model: string;
	messages: Message[];
};
