<script lang="ts">
	import { chatStore, addChat, selectChat } from '$lib/stores/chatStore';
	import { Plus, Pencil } from 'lucide-svelte';
</script>

<div
	class="m-2 mb-4 flex max-h-90/100 w-75 flex-col overflow-y-scroll rounded-lg bg-neutral-900 p-2"
>
	<div class="flex flex-row items-center justify-between">
		<h2 class="font-3xl font-bold text-gray-50">Chats</h2>
		<Plus
			class="h-7 w-7 cursor-pointer text-red-400 hover:rounded-lg hover:bg-neutral-700"
			onclick={() => addChat()}
		/>
	</div>
	{#each $chatStore as chat}
		<button
			class={chat.selected
				? 'my-2 flex cursor-pointer flex-row items-center justify-between rounded-lg bg-neutral-700 p-2 text-gray-50 hover:bg-neutral-600'
				: 'my-2 flex cursor-pointer flex-row items-center justify-between p-2 text-gray-50 hover:rounded-lg hover:bg-neutral-700'}
			onclick={() => selectChat(chat)}
		>
			<h3>{chat.name}</h3>
			<Pencil class="h-5 w-5 text-red-400 hover:text-red-200" onclick={() => selectChat(chat)} />
		</button>
	{/each}
</div>
