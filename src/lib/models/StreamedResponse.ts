import type { Message } from './Message';

export type StreamedResponse = {
	status: string;
	status_details: string;
	model: string;
	created_at: Date;
	message: Message;
	sources?: string[]; // Optional field for sources or references
	done: boolean;
};
