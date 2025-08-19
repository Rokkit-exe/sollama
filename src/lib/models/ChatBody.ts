import type { ChatMessage } from '$lib/models/ChatMessage';
import type { AttachedFile } from './AttachedFile';

export type ChatBody = {
	name?: string;
	model?: string;
	system_prompt?: string;
	files?: AttachedFile[];
	messages?: ChatMessage[];
	created_at?: Date;
};
