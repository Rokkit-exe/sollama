<script lang="ts">
	import { chatsState } from '$lib/stores/chatsState.svelte';
	import { X } from 'lucide-svelte';
	import type { Chat } from '$lib/models/Chat';

	let chat = $props<{ chat: Chat }>();

	let renamingId = $state<string | null>(null);
	let tempName = $state<string>(chat.name);
</script>

<button
	class={chat.selected
		? 'group my-2 flex w-full items-center justify-between rounded-lg bg-neutral-700 p-2 text-gray-50 transition hover:bg-neutral-700'
		: 'group my-2 flex w-full items-center justify-between rounded-lg bg-neutral-900 p-2 text-gray-50 transition hover:bg-neutral-700'}
	onclick={() => chatsState.select(chat.id)}
	ondblclick={() => {
		renamingId = chat.id;
		tempName = chat.name;
	}}
>
	{#if renamingId === chat.id}
		<input
			class="w-full border-b border-gray-50 bg-transparent text-left text-gray-50 outline-none"
			maxlength="25"
			bind:value={tempName}
			onblur={() => {
				chatsState.rename(chat.id, tempName);
				renamingId = null;
			}}
			onkeydown={(e) => {
				if (e.key === 'Enter') {
					chatsState.rename(chat.id, tempName);
					renamingId = null;
				} else if (e.key === 'Escape') {
					renamingId = null;
				}
			}}
			autofocus
		/>
	{:else}
		<h3>{chat.name}</h3>
	{/if}
	<X
		class="h-5 w-5 text-red-400 opacity-0 transition-opacity
             duration-150 group-hover:opacity-100"
		onclick={(e) => {
			e.stopPropagation();
			chatsState.remove(chat.id);
		}}
	/>
</button>
