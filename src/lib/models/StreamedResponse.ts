import type { Role } from './Role';

export type StreamedResponse = {
	model: string;
	created_at: Date;
	message: {
		role: Role;
		content: string;
	};
	done: boolean;
};
