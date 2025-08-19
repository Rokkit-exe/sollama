<script lang="ts">
	import { RotateCcw, Check, Loader } from 'lucide-svelte';
	import { chatsState } from '$stores/chatsState.svelte';
	import { modelsState } from '$stores/modelsState.svelte';
	import { Status } from '$models/Status';
	import { onMount } from 'svelte';

	onMount(() => {
		modelsState.getModels();
		setInterval(() => {
			modelsState.getLoadedModel();
		}, 60000);
	});
</script>

<div class="flex h-fit w-1/4 flex-row justify-end">
	{#if modelsState.models}
		<select
			class="rounded-lg p-2 text-gray-50 hover:bg-neutral-700 focus:ring-1 focus:ring-red-400 focus:outline-none"
			bind:value={chatsState.selected.model}
		>
			{#each modelsState.models as model}
				<option value={model.model} class="bg-neutral-800">{model.model}</option>
			{/each}
		</select>
	{/if}
	<button
		title="Refresh Models"
		class="default-button"
		onclick={() => {
			modelsState.getModels();
			modelsState.getLoadedModel();
		}}
	>
		<RotateCcw class="icon" />
	</button>
	{#if modelsState.loadedModel !== '' && chatsState.selected && chatsState.selected.model === modelsState.loadedModel}
		<button class="default-button" title="Model Loaded">
			<Check class="icon" />
		</button>
	{:else}
		<button
			title="Load Model"
			class="default-button"
			onclick={() => {
				if (chatsState.selected && chatsState.selected.model) {
					modelsState.loadModel(chatsState.selected.model);
				}
			}}
		>
			<Loader
				class={modelsState.status === Status.Loading && modelsState.loadedModel === ''
					? 'icon animate-spin'
					: 'icon '}
			/>
		</button>
	{/if}
</div>
