<script lang="ts">
	import { RotateCcw, Check, Loader } from 'lucide-svelte';
	import { chatsState } from '$lib/stores/chatsState.svelte';
	import { modelsState } from '$lib/stores/modelsState.svelte';
	import { onMount } from 'svelte';
	import { settingsState } from '$lib/stores/settingsState.svelte';

	onMount(() => {
		modelsState.refresh();
		if (!chatsState.selected.model) {
			chatsState.selected.model = modelsState.models[0].model || settingsState.ollama.DefaultModel;
		}
		setInterval(() => {
			modelsState.refresh();
		}, 60000); // Refresh models every minute
	});
</script>

<div class="flex h-fit w-1/4 flex-row justify-end">
	<select
		class="rounded-lg p-2 text-gray-50 hover:bg-neutral-700 focus:ring-1 focus:ring-red-400 focus:outline-none"
		bind:value={chatsState.selected.model}
	>
		{#each modelsState.models as model}
			<option value={model.model} class="bg-neutral-800">{model.model}</option>
		{/each}
	</select>
	<button
		title="Refresh Models"
		class="default-button"
		onclick={() => {
			modelsState.refresh();
		}}
	>
		<RotateCcw class="icon" />
	</button>
	{#if modelsState.loadedModel !== '' && chatsState.selected.model === modelsState.loadedModel}
		<button class="default-button" title="Model Loaded">
			<Check class="icon" />
		</button>
	{:else}
		<button
			title="Load Model"
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
