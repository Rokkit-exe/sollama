<script lang="ts">
	import ChatControl from '$components/ChatControl.svelte';
	import ChatMessages from '$components/ChatMessages.svelte';
	import ModelSelect from '$components/ModelSelect.svelte';
	import { chatsState } from '$stores/chatsState.svelte';
</script>

<div
	class="mx-2 mx-auto flex h-screen w-full flex-row justify-between rounded-lg bg-neutral-900 p-2 text-gray-50"
>
	<div class="w-1/4">
		{#if chatsState.selected}
			<h2 class="flex text-xl font-bold text-red-400">
				{chatsState.selected.name}
			</h2>
		{/if}
	</div>
	<div class="flex w-3/4 flex-col overflow-y-scroll rounded-lg px-4">
		<ChatMessages />
		<ChatControl />
	</div>
	<ModelSelect />
</div>

<style>
	:global(.markdown-body) {
		background-color: #171717;
	}
	:global(.markdown-body pre, code) {
		background-color: #2d2d2d;
	}
	:global(.markdown-body h1, h2, h3, h4, h5, h6) {
		color: #f8f8f2;
	}
</style>
