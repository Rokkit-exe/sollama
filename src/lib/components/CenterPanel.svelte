<script lang="ts">
	import { chatStore, addMessageToChat } from '$lib/stores/chatStore';
	import { Send } from 'lucide-svelte';
	let textInput = $state('');

	let selectedChat = $derived($chatStore.find((c) => c.selected) || $chatStore[0]);
</script>

<div
	class="m-2 mx-auto flex h-auto flex-col rounded-lg p-2 text-gray-50 sm:px-6 md:w-3/4 lg:w-3/4 lg:px-2 xl:w-1/2"
>
	<div class="flex h-full w-full flex-col p-4">
		{#each selectedChat.messages as msg}
			<div class="mb-4 overflow-y-auto rounded-lg bg-neutral-700 p-2 pl-4">
				{#if msg.role === 'user'}
					<div class="font-bold text-red-400">{msg.role}</div>
				{:else}
					<div class="justify-end font-bold text-red-400">{msg.role}</div>
				{/if}
				<p class="flex w-full p-2 text-white">{msg.content}</p>
			</div>
		{/each}
	</div>
	<div class="bd-blue-50 mt-4 flex w-full flex-row justify-center p-4">
		<textarea
			id="textInput"
			bind:value={textInput}
			placeholder="Type a message..."
			class="field-sizing-content w-full rounded-lg bg-neutral-700 p-2 text-gray-50 focus:ring-2 focus:ring-red-400 focus:outline-none"
			onkeydown={(e) => {
				if (e.key === 'Enter' && textInput.trim() !== '') {
					addMessageToChat(selectedChat, textInput, 'bot');
					textInput = '';
				}
			}}
		/>
		<button
			class="m-1 p-1"
			onclick={() => {
				addMessageToChat(selectedChat, textInput, 'user');
				textInput = '';
			}}><Send class="h-6 w-6 text-red-400 hover:text-red-200"></Send></button
		>
	</div>
</div>
