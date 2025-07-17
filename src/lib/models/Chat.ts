import { Message } from '$lib/models/Message';

export class Chat {
	id: string;
	name: string;
	messages: Message[];
	selected: boolean = false;
	createdAt: Date;
	updatedAt: Date;

	constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
		this.messages = [];
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}

	addMessage(content: string, role: 'user' | 'bot') {
		this.messages.push({
			id: this.messages.length.toString(),
			content,
			role,
			timestamp: new Date()
		});
	}
}
