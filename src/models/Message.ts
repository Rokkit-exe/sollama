class Message {
	id: string;
	content: string;
	timestamp: Date;
	role: string;

	constructor(id: string, content: string, timestamp: Date, role: string) {
		this.id = id;
		this.content = content;
		this.timestamp = timestamp;
		this.role = role;
	}
}

export default Message;
