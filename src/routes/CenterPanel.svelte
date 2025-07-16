<script lang="ts">
	import type Chat from '../models/Chat';
	import type Message from '../models/Message';

	let { chats } = $props<{ chats: Chat[] }>();
	let textInput = $state('');

	let selectedChat = $derived(() => {
		for (const chat of chats) {
			if (chat.selected) {
				return chat;
			}
		}
		return chats[0];
	});
</script>

<div class="m-2 flex h-screen w-full flex-col rounded-lg bg-gray-500 p-2 text-gray-50">
	<div class="flex-1 overflow-y-auto p-4">
		{#each selectedChat.messages as msg}
			<div class="mb-4">
				<div class="font-bold">{msg.role}</div>
				<div class="rounded-lg bg-gray-700 p-2">{msg.content}</div>
			</div>
		{/each}
	</div>
	<div class="mt-4">
		<input
			type="text"
			id="textInput"
			bind:value={textInput}
			placeholder="Type a message..."
			class="w-full rounded-lg bg-gray-700 p-2 text-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		/>
		<button
			class="mt-2 w-full rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			onclick={() => {
				selectedChat.messages.push(
					new Message(`${selectedChat.messages.length + 1}`, textInput, new Date(), 'user')
				);
			}}>Send</button
		>
	</div>
</div>
