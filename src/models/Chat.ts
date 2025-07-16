import Message from './Message';

class Chat {
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

	getLastMessage(): Message | null {
		if (this.messages.length === 0) {
			return null;
		}
		return this.messages[this.messages.length - 1];
	}

	addMessage(message: Message) {
		this.messages.push(message);
		this.updatedAt = new Date();
	}
}

export default Chat;
