import type { Chat } from '$models/Chat';
import type { ChatBody } from '$models/ChatBody';
import type { Message } from '$models/Message';
import type { ChatMessage } from '$models/ChatMessage';
import type { Role } from '$models/Role';
import { chatRequest } from '$utils/chatRequest';
import { messageRequest } from '$utils/messageRequest';
import { agentRequest } from '$lib/utils/agentRequest';
import type { ChatRequest } from '$models/ChatRequest';

const defaultChat: ChatBody = {
	name: 'Default Chat',
	model: 'mistral-nemo:latest',
	system_prompt: 'You are a helpful assistant.',
	files: [],
	messages: []
};

export const chatsState = $state({
	chats: [] as Chat[],
	selected: {} as Chat,
	init(): void {
		chatRequest
			.GetAll()
			.then((chats: Chat[]) => {
				this.chats = chats;
				if (this.chats.length === 0) {
					console.warn('No chats found, creating default chat');
					chatRequest
						.Create(defaultChat)
						.then((chat: Chat) => {
							this.chats.push(chat);
							this.selected = chat;
						})
						.catch((error: Error) => {
							console.error('Error creating default chat:', error);
						});
				}
				if (this.chats.length > 0) {
					let firstChat = this.chats[0];
					this.selected = firstChat;
				}
			})
			.catch((error: Error) => {
				console.error('Error initializing chats:', error);
			});
	},
	getAll() {
		chatRequest
			.GetAll()
			.then((chats: Chat[]) => {
				this.chats = chats;
				if (this.chats.length > 0) {
					let firstChat = this.chats[0];
					this.selected = firstChat;
				}
			})
			.catch((error: Error) => {
				console.error('Error refreshing chats:', error);
			});
	},

	async addMessage(id: string, content: string, role: Role): Promise<string> {
		try {
			const message: ChatMessage = await messageRequest.Create(id, {
				chatId: id,
				content,
				role
			} as ChatMessage);

			const chat = this.chats.find((c) => c.id === id);
			if (!chat) {
				console.warn(`Chat with id ${id} not found for adding message`);
				return '';
			}

			chat.messages.push(message);

			if (!message.id) {
				console.warn(`Message ID is undefined for chat ${id}`);
				return '';
			}

			return message.id; // ✅ return the real id
		} catch (error) {
			console.error(`Error adding message to chat ${id}:`, error);
			return '';
		}
	},
	updateMessageContent(chatId: string, msgId: string, buffer: string): void {
		const index = this.chats.findIndex((c) => c.id === chatId);
		if (index === -1) {
			console.warn(`Chat with id ${chatId} not found for updating message`);
			return;
		}
		const message = this.chats[index].messages.findIndex((m) => m.id === msgId);
		if (!message) {
			console.warn(`No message found in chat ${chatId} with message ${msgId} to update`);
			return;
		}
		this.chats[index].messages[message].content = buffer;
	},
	UpdateMessage(chatId: string, msgId: string, newContent: string): void {
		const chat = this.chats.find((c) => c.id === chatId);
		if (!chat) {
			console.warn(`Chat with id ${chatId} not found for updating message`);
			return;
		}
		const message = chat.messages.find((m) => m.id === msgId);
		if (!message) {
			console.warn(`No message found in chat ${chatId} to update`);
			return;
		}
		messageRequest
			.Update(chatId, msgId, {
				id: message.id,
				chatId: message.chatId,
				role: message.role,
				created_at: message.created_at,
				content: newContent
			} as ChatMessage)
			.then((updatedMessage: ChatMessage) => {
				message.role = updatedMessage.role;
				message.content = updatedMessage.content;
			})
			.catch((error: Error) => {
				console.error(`Error updating message in chat ${chatId}:`, error);
			});
	},
	remove(id: string): void {
		chatRequest
			.Delete(id)
			.then(() => {
				this.chats = this.chats.filter((c) => c.id !== id);
			})
			.catch((error: Error) => {
				console.error(`Error removing chat with id ${id}:`, error);
			});
	},
	add(): void {
		chatRequest
			.Create({
				name: `Chat ${this.chats.length + 1}`,
				model: this.selected.model || 'mistral-nemo:latest',
				system_prompt: 'You are a helpful assistant.',
				files: [],
				messages: []
			} as ChatBody)
			.then((chat: Chat) => {
				this.chats.push(chat);
				this.selected = chat;
			})
			.catch((error: Error) => {
				console.error('Error adding chat:', error);
			});
	},
	select(id: string): void {
		let chat = this.chats.find((c) => c.id === id);
		if (!chat) {
			console.warn(`Chat with id ${id} not found for deselection`);
			return;
		}
		this.selected = chat;
	},
	rename(id: string, newName: string): void {
		let chat = this.chats.find((c) => c.id === id);
		if (!chat) {
			console.warn(`Chat with id ${id} not found for renaming`);
			return;
		}
		chatRequest
			.Update(id, {
				...chat,
				name: newName
			})
			.then((updatedChat: Chat) => {
				const index = this.chats.findIndex((c) => c.id === id);
				if (chat) {
					this.chats[index] = updatedChat;
				} else {
					console.warn(`Chat with id ${id} not found for renaming`);
				}
			})
			.catch((error: Error) => {
				console.error(`Error renaming chat with id ${id}:`, error);
			});
	},
	getMessages(id: string): Message[] {
		const chat = this.chats.find((c) => c.id === id);
		if (!chat) {
			console.warn(`Chat with id ${id} not found for getting messages`);
			return [];
		}
		let messages: Message[] = [];
		for (const message of chat.messages) {
			messages.push({
				content: message.content,
				role: message.role
			});
		}
		return messages;
	},
	async Chat(chatId: string, content: string): Promise<void> {
		if (!this.selected || !this.selected.id) {
			console.error('No chat selected');
			return;
		}
		const usrMsgId = await this.addMessage(chatId, content, 'user');
		if (!content.trim()) {
			console.warn('Empty message, not sending');
			return;
		}
		const messages: Message[] = this.getMessages(chatId);
		if (messages.length === 0) {
			console.warn('No messages found in chat, cannot send request');
			return;
		}
		let chatRequest: ChatRequest = {
			model: this.selected.model,
			messages: messages
		};
		const msgId = await this.addMessage(chatId, '', 'assistant');
		agentRequest
			.Chat(chatRequest, msgId)
			.then((content) => {
				if (!content || content.trim() === '') {
					console.warn('Received empty content from chat request');
					return;
				}
				this.UpdateMessage(chatId, msgId, content);
			})
			.catch((error: Error) => {
				console.error('Error sending chat request:', error);
			});
	}
});
