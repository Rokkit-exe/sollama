import type { Chat } from '$lib/models/Chat';
import type { ChatBody } from '$lib/models/ChatBody';

export const chatRequest = {
	async GetAll(): Promise<Chat[]> {
		const response = await fetch('http://localhost:8080/chats', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (!response.ok) {
			throw new Error(`Failed to fetch chats: ${response.statusText}`);
		}
		const chats: Chat[] = await response.json();
		return chats;
	},
	async GetById(chatId: string): Promise<Chat> {
		const response = await fetch(`http://localhost:8080/chat/${chatId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (!response.ok) {
			throw new Error(`Failed to fetch chat with ID ${chatId}: ${response.statusText}`);
		}
		const chat: Chat = await response.json();
		return chat;
	},
	async Create(chat: ChatBody): Promise<Chat> {
		const response = await fetch('http://localhost:8080/chat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(chat)
		});
		if (!response.ok) {
			throw new Error(`Failed to create chat: ${response.statusText}`);
		}
		const resp: Chat = await response.json();
		return resp;
	},
	async Update(chatId: string, chat: ChatBody): Promise<Chat> {
		const response = await fetch(`http://localhost:8080/chat/${chatId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(chat)
		});
		if (!response.ok) {
			throw new Error(`Failed to update chat with ID ${chatId}: ${response.statusText}`);
		}
		const updatedChat: Chat = await response.json();
		return updatedChat;
	},
	async Delete(chatId: string): Promise<void> {
		const response = await fetch(`http://localhost:8080/chat/${chatId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (!response.ok) {
			throw new Error(`Failed to delete chat with ID ${chatId}: ${response.statusText}`);
		}
	}
};
