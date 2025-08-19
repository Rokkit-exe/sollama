<script lang="ts">
	import { chatsState } from '$stores/chatsState.svelte';
	import { Plus, X } from 'lucide-svelte';
	import NavBar from '$components/NavBar.svelte';
	import { onMount } from 'svelte';
	let renamingId: string | null = null;
	let tempName = '';
	onMount(() => {
		chatsState.init();
	});
</script>

<div class="flex h-screen w-75 min-w-75 flex-col border-r-1 border-neutral-700 bg-neutral-900 pb-2">
	<NavBar />
	<div class="flex flex-row items-center justify-between p-2">
		<h2 class="font-3xl font-bold text-gray-50">Chats</h2>
		<button
			title="New Chat"
			class="default-button"
			onclick={() => {
				chatsState.add();
			}}
		>
			<Plus class="icon" />
		</button>
	</div>
	<div class="flex max-h-90/100 flex-col overflow-y-scroll p-2">
		{#if chatsState.chats.length === 0}
			<p class="text-center text-gray-500">No chats available. Start a new chat!</p>
		{/if}
		{#each chatsState.chats as chat}
			<button
				title="Select {chat.name}"
				class={chat === chatsState.selected
					? 'selected-button group mb-2'
					: 'select-button group mb-2'}
				onclick={() => chatsState.select(chat.id)}
				ondblclick={() => {
					renamingId = chat.id;
					tempName = chat.name;
				}}
			>
				{#if renamingId === chat.id}
					<input
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
					/>
				{:else}
					<h3>{chat.name}</h3>
				{/if}
				<X
					class="icon opacity-0 transition-opacity
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
