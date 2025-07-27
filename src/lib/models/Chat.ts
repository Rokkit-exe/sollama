import type { ChatMessage } from '$lib/models/ChatMessage';
import type { AttachedFile } from './AttachedFile';
import type { Tool } from './Tool';

export type Chat = {
	id: string;
	name: string;
	model: string;
	system_prompt: string;
	files: AttachedFile[];
	isThinking: boolean;
	tools: Tool[];
	messages: ChatMessage[];
	selected: boolean;
	created_at: Date;
};
