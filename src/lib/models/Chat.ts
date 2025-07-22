import type { ChatMessage } from '$lib/models/ChatMessage';
import type { AttachedFile } from './AttachedFile';

export type Chat = {
	id: string;
	name: string;
	model: string;
	files: AttachedFile[];
	messages: ChatMessage[];
	selected: boolean;
	created_at: Date;
};
