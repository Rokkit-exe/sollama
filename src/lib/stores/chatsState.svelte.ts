import type { Chat } from '$models/Chat';

// src/lib/state/chatState.svelte.ts
export const chatsState = $state({
	chats: [] as Chat[],
	init(): void {
		this.chats = [
			{
				id: crypto.randomUUID(),
				name: 'Default Chat',
				model: 'llama3.2',
				messages: [],
				selected: true,
				created_at: new Date()
			}
		];
		console.log('Chat state initialized with default chat');
	},
	addMessage(id: string, content: string, role: 'user' | 'bot'): void {
		const chat = this.chats.find((c) => c.id === id);
		if (chat) {
			chat.messages.push({
				id: crypto.randomUUID(),
				content,
				role,
				timestamp: new Date()
			});
		}
		console.log(`Message added to chat ${id}:`, content);
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
			selected: true,
			createdAt: new Date(),
			updatedAt: new Date()
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
	}
});
