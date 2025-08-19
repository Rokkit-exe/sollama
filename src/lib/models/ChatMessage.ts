import type { Role } from './Role';

export type ChatMessage = {
	id?: string;
	chatId: string; // The ID of the chat this message belongs to
	content: string;
	role: Role;
	sources?: string[]; // Optional field for sources or references
	created_at?: Date; // Optional, as it may not be present in all messages
};
