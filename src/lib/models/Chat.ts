import type { Message } from '$lib/models/Message';

export type Chat = {
	id: string;
	name: string;
	model: string;
	messages: Message[];
	selected: boolean;
	created_at: Date;
};
