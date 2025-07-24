<script lang="ts">
	import { chatsState } from '$lib/stores/chatsState.svelte';
	import { onMount } from 'svelte';
	import { modelsState } from '$lib/stores/modelsState.svelte';
	import { RotateCcw, Loader, Check } from 'lucide-svelte';
	onMount(() => {
		modelsState.refresh();
		if (!chatsState.selected.model) {
			chatsState.selected.model = modelsState.models[0].model;
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
				<option value={model.model} class="bg-neutral-800">{model.model}</option>
			{/each}
		</select>
		<button
			class="default-button"
			onclick={() => {
				modelsState.refresh();
			}}
		>
			<RotateCcw class="icon" />
		</button>
		{#if modelsState.loadedModel !== '' && chatsState.selected.model === modelsState.loadedModel}
			<button class="default-button">
				<Check class="icon" />
			</button>
		{:else}
			<button
				class="default-button"
				onclick={() => {
					if (chatsState.selected.model) {
						modelsState.loadModel(chatsState.selected.model);
					}
				}}
			>
				<Loader
					class={modelsState.isLoading && modelsState.loadedModel === ''
						? 'icon animate-spin'
						: 'icon '}
				/>
			</button>
		{/if}
	</div>
</div>
