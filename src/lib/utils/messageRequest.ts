import type { ChatMessage } from '$lib/models/ChatMessage';
import type { Message } from '$models/Message';

export const messageRequest = {
	async GetAll(chatId: string): Promise<ChatMessage[]> {
		const response = await fetch(`http://localhost:8080/chat/${chatId}/messages`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (!response.ok) {
			throw new Error(`Failed to fetch messages for chat ${chatId}: ${response.statusText}`);
		}
		const messages: ChatMessage[] = await response.json();
		return messages;
	},
	async GetById(chatId: string, messageId: string): Promise<ChatMessage> {
		const response = await fetch(`http://localhost:8080/chat/${chatId}/message/${messageId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (!response.ok) {
			throw new Error(
				`Failed to fetch message with ID ${messageId} for chat ${chatId}: ${response.statusText}`
			);
		}
		const message: ChatMessage = await response.json();
		return message;
	},
	async Create(chatId: string, message: ChatMessage): Promise<ChatMessage> {
		const response = await fetch(`http://localhost:8080/chat/${chatId}/message`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(message)
		});
		if (!response.ok) {
			throw new Error(`Failed to create message for chat ${chatId}: ${response.statusText}`);
		}
		const createdMessage: ChatMessage = await response.json();
		return createdMessage;
	},
	async Update(chatId: string, messageId: string, message: ChatMessage): Promise<ChatMessage> {
		const response = await fetch(`http://localhost:8080/chat/${chatId}/message`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(message)
		});
		if (!response.ok) {
			throw new Error(
				`Failed to update message with ID ${messageId} for chat ${chatId}: ${response.statusText}`
			);
		}
		const updatedMessage: ChatMessage = await response.json();
		return updatedMessage;
	},
	async Delete(chatId: string, messageId: string): Promise<void> {
		const response = await fetch(`http://localhost:8080/chat/${chatId}/message/${messageId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (!response.ok) {
			throw new Error(
				`Failed to delete message with ID ${messageId} for chat ${chatId}: ${response.statusText}`
			);
		}
		// No content to return for DELETE operation
		return Promise.resolve();
	}
};
