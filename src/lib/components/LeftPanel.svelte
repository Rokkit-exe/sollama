<script lang="ts">
	import { chatsState } from '$lib/stores/chatsState.svelte';
	import { Plus, X } from 'lucide-svelte';
</script>

<div class="m-2 flex max-h-90/100 w-75 flex-col bg-neutral-900 p-2">
	<a href="/" class="mb-2 text-xl font-bold text-gray-900 hover:text-red-400 dark:text-white"
		>Sollama</a
	>
	<div class="flex flex-row items-center justify-between border-b border-neutral-700 p-2">
		<h2 class="font-3xl font-bold text-gray-50">Chats</h2>
		<Plus
			class="h-7 w-7 cursor-pointer text-red-400 hover:rounded-lg hover:bg-neutral-700"
			onclick={() => chatsState.add()}
		/>
	</div>
	<div class="flex max-h-90/100 flex-col overflow-y-scroll p-2">
		{#if chatsState.chats.length === 0}
			<p class="text-center text-gray-500">No chats available. Start a new chat!</p>
		{/if}
		{#each chatsState.chats as chat}
			<button
				class={chat.selected
					? 'group my-2 flex w-full items-center justify-between rounded-lg bg-neutral-700 p-2 text-gray-50 transition hover:bg-neutral-700'
					: 'group my-2 flex w-full items-center justify-between rounded-lg bg-neutral-900 p-2 text-gray-50 transition hover:bg-neutral-700'}
				class:bg-blue-600={chat.selected}
				on:click={() => chatsState.select(chat.id)}
			>
				<h3>{chat.name}</h3>
				<X
					class="h-5 w-5 text-red-400 opacity-0 transition-opacity
             duration-150 group-hover:opacity-100"
					onclick={(e) => {
						e.stopPropagation();
						chatsState.remove(chat.id);
					}}
				/>
			</button>
		{/each}
	</div>
</div>
