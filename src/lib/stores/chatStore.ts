import { writable, get } from 'svelte/store';
import { Chat } from '$models/Chat';

export let chatStore = writable<Chat[]>([new Chat('1', 'General Chat')]);

export const addChat = () => {
	chatStore.update((chats) => [
		...chats,
		new Chat(`${chats.length + 1}`, 'Chat ' + (chats.length + 1))
	]);
	console.log('Adding new chat');
};

export const updateChat = (updatedChat: Chat) => {
	chatStore.update((chats) =>
		chats.map((chat) => (chat.id === updatedChat.id ? updatedChat : chat))
	);
	console.log('Updating chat:', updatedChat);
};

export const removeChat = (chatId: string) => {
	chatStore.update((chats) => chats.filter((chat) => chat.id !== chatId));
	console.log('Removing chat with ID:', chatId);
};

export const selectChat = (chat: Chat) => {
	chatStore.update((chats) => {
		for (const c of chats) {
			c.selected = c.id === chat.id;
		}
		return chats;
	});
	console.log('Selecting chat:', chat);
};

export const addMessageToChat = (target: Chat, content: string, role: 'user' | 'bot') => {
	chatStore.update((chats) =>
		chats.map((chat) => {
			if (chat.id === target.id) {
				chat.addMessage(content, role);
			}
			return chat;
		})
	);
	console.log('Adding message to chat:', target.id, content, role);
};
