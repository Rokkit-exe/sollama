<script lang="ts">
	import { chatsState } from '$lib/stores/chatsState.svelte';
	import { onMount } from 'svelte';
	import { modelsState } from '$lib/stores/modelsState.svelte';
	import { RotateCcw, Loader, Check } from 'lucide-svelte';
	onMount(() => {
		modelsState.refresh();
		if (!chatsState.selected.model) {
			chatsState.selected.model = modelsState.models[0].name;
		}
		setInterval(() => {
			modelsState.refresh();
		}, 60000); // Refresh models every minute
	});
</script>

<div class="m-2 flex w-full flex-row items-center justify-between">
	<h2 class="flex justify-center text-xl font-bold text-red-400">
		{chatsState.selected.name}
	</h2>
	<div class="flex flex-row items-center">
		<select
			class="rounded-lg p-2 text-gray-50 hover:bg-neutral-700 focus:ring-1 focus:ring-red-400 focus:outline-none"
			bind:value={chatsState.selected.model}
		>
			{#each modelsState.models as model}
				<option value={model.name} class="bg-neutral-800">{model.name}</option>
			{/each}
		</select>
		<RotateCcw
			class="m-2 ml-2 h-8 w-8 cursor-pointer rounded-lg p-1 text-red-400 hover:bg-neutral-700"
			onclick={() => {
				modelsState.refresh();
			}}
		/>
		{#if modelsState.loadedModel !== '' && chatsState.selected.model === modelsState.loadedModel}
			<Check class="m-2 ml-2 h-8 w-8 p-1 text-red-400" />
		{:else}
			<Loader
				class={modelsState.isLoading && modelsState.loadedModel === ''
					? 'm-2 ml-2 h-8 w-8 animate-spin cursor-pointer rounded-lg p-1 text-red-400'
					: 'm-2 ml-2 h-8 w-8 cursor-pointer rounded-lg p-1 text-red-400 hover:bg-neutral-700'}
				onclick={() => {
					if (chatsState.selected.model) {
						modelsState.loadModel(chatsState.selected.model);
					}
				}}
			/>
		{/if}
	</div>
</div>

<style>
	.spin {
		animation: spin 0.5s linear infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
