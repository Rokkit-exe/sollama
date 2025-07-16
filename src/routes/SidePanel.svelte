<script lang="ts">
	import type Chat from '../models/Chat';
	let { chats } = $props<{ chats: Chat[] }>();

	function addChat() {
		chats.push({ name: `New Chat`, description: 'New chat' });
	}

	function selectChat(chat: Chat) {
		chats.forEach((c) => (c.selected = false));
		chat.selected = true;
	}
</script>

<div class="justify-left m-2 flex h-screen w-75 flex-col rounded-lg bg-gray-500 p-2">
	<h2 class="font-2xl font-bold text-gray-50">Chats</h2>
	<button
		class="font-2xl m-2 rounded-lg bg-gray-700 p-2 font-bold text-gray-50 hover:bg-gray-600"
		onclick={addChat}
	>
		New Chat</button
	>
	{#each chats as chat}
		<button
			class="m-2 rounded-lg bg-gray-800 p-2 text-gray-50 hover:bg-gray-700"
			onclick={() => selectChat(chat)}
		>
			<h3>{chat.name}</h3>
		</button>
	{/each}
</div>

<style>
</style>
