import type { Role } from './Role';

export type ChatMessage = {
	content: string;
	role: Role;
	created_at?: Date; // Optional, as it may not be present in all messages
};
