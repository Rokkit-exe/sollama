import type { Chat } from '$models/Chat';
import type { Message } from '$models/Message';
import type { ChatMessage } from '$models/ChatMessage';
import type { Role } from '$models/Role';

// src/lib/state/chatState.svelte.ts
export const chatsState = $state({
	chats: [] as Chat[],
	init(): void {
		this.chats = [
			{
				id: crypto.randomUUID(),
				name: 'Default Chat',
				model: 'llama3.2:latest',
				files: [],
				messages: [],
				selected: true,
				created_at: new Date()
			}
		] as Chat[];
	},
	addMessage(id: string, content: string, role: Role): void {
		const chat = this.chats.find((c) => c.id === id);
		if (chat) {
			chat.messages.push({
				content,
				role,
				created_at: new Date()
			});
		}
		console.log(`Message added to chat ${id}:`, content);
	},
	updateMessage(id: string, content: string): void {
		const chat = this.chats.find((c) => c.id === id);
		if (chat) {
			const message = chat.messages[chat.messages.length - 1];
			if (message) {
				message.content = content;
			}
		}
	},
	remove(id: string): void {
		this.chats = this.chats.filter((c) => c.id !== id);
		console.log(`Chat with id ${id} removed`);
	},
	add(): void {
		this.chats.forEach((c) => (c.selected = false));
		this.chats.push({
			id: crypto.randomUUID(),
			name: `Chat ${this.chats.length + 1}`,
			messages: [],
			files: [],
			selected: true,
			created_at: new Date(),
			model: 'llama3.2:latest'
		});
		console.log(`Chat added: Chat ${this.chats.length}`);
	},
	select(id: string): void {
		this.chats.forEach((c) => (c.selected = c.id === id));
		console.log(`Chat with id ${id} selected`);
	},
	get selected(): Chat {
		console.log('Retrieving selected chat');
		return this.chats.find((c: Chat) => c.selected) || this.chats[0];
	},
	rename(id: string, newName: string): void {
		const chat = this.chats.find((c) => c.id === id);
		if (chat) {
			chat.name = newName;
			console.log(`Chat with id ${id} renamed to ${newName}`);
		} else {
			console.warn(`Chat with id ${id} not found for renaming`);
		}
	},
	getMessages(id: string): Message[] {
		const chat = this.chats.find((c) => c.id === id);
		let slicedMessages: ChatMessage[] = chat?.messages.slice(-1) || [];
		let messages: Message[] = [];
		for (const message of slicedMessages) {
			messages.push({
				content: message.content,
				role: message.role
			});
		}
		return messages;
	}
});
