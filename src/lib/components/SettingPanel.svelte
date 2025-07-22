<script lang="ts">
	import { ollama } from '$lib/utils/ollama';
	import { RotateCcw } from 'lucide-svelte';
	let ollamaHost = $state('http://localhost:11434');
	let ollamaModel = $state('llama3.2');
	let searxngHost = $state('http://localhost:8888');
	let searxngSearchEngine = $state('google');
	let downloadModel = $state('');
	let removeModel = $state(modelsState.models[0]?.name || '');
	import { pullingState } from '$lib/stores/pullingState.svelte';
	import { modelsState } from '$lib/stores/modelsState.svelte';
	import { onMount } from 'svelte';
	onMount(() => {
		modelsState.refresh();
	});
</script>

<div class="m-2 mx-auto mt-4 flex h-auto flex-col rounded-lg p-2 text-gray-50 xl:w-1/2">
	<h2 class="mt-4 mb-4 flex justify-center text-xl font-bold text-red-400">Settings</h2>
	<div class="my-4 flex w-full flex-row items-center justify-between">
		<label for="ollamaHost" class="mr-2 mb-2 block w-1/3">OllamaHost</label>
		<input
			type="text"
			id="ollamaHost"
			bind:value={ollamaHost}
			class="w-100 rounded-lg bg-neutral-700 p-2 text-gray-50 focus:ring-2 focus:ring-red-400 focus:outline-none"
		/>
	</div>
	<div class="my-4 flex w-full flex-row items-center justify-between">
		<label for="ollamaModel" class="mr-2 mb-2 block w-1/3">OllamaModel</label>
		<input
			type="text"
			id="ollamaModel"
			bind:value={ollamaModel}
			class="w-100 rounded-lg bg-neutral-700 p-2 text-gray-50 focus:ring-2 focus:ring-red-400 focus:outline-none"
		/>
	</div>
	<div class="my-4 flex w-full flex-row items-center justify-between">
		<label for="searxngHost" class="mr-2 mb-2 block w-1/3">searxngHost</label>
		<input
			type="text"
			id="searxngHost"
			bind:value={searxngHost}
			class="w-100 rounded-lg bg-neutral-700 p-2 text-gray-50 focus:ring-2 focus:ring-red-400 focus:outline-none"
		/>
	</div>
	<div class="my-4 flex w-full flex-row items-center justify-between">
		<label for="searxngSearchEngine" class="mr-2 mb-2 block w-1/3">searxngSearchEngine</label>
		<input
			type="text"
			id="searxngSearchEngine"
			bind:value={searxngSearchEngine}
			class="w-100 rounded-lg bg-neutral-700 p-2 text-gray-50 focus:ring-2 focus:ring-red-400 focus:outline-none"
		/>
	</div>

	<div class="flex w-full justify-end">
		<button
			class="m-2 flex cursor-pointer rounded-lg bg-neutral-700 p-2 text-red-400 hover:bg-neutral-600 hover:text-gray-50"
		>
			Save
		</button>
	</div>
	<div class="my-4 flex w-full flex-row items-center justify-between">
		<div class="my-4 flex w-full flex-row items-center justify-between">
			<label for="downloadModel" class="mr-2 mb-2 block w-1/3">Remove model</label>
			<select
				bind:value={removeModel}
				placeholder="Select a model"
				class="rounded-lg bg-neutral-700 p-2 text-gray-50 focus:ring-1 focus:ring-red-400 focus:outline-none"
			>
				{#each modelsState.models as model}
					<option value={model.name} class="bg-neutral-800">{model.name}</option>
				{/each}
			</select>
		</div>
		<button
			class="mx-2 flex cursor-pointer rounded-lg bg-neutral-700 p-2 text-red-400 hover:bg-neutral-600 hover:text-gray-50"
			onclick={() => {
				if (!removeModel) {
					alert('Please enter a model name to download.');
					return;
				}
				ollama.deleteModel(removeModel);
				modelsState.refresh();
			}}>Remove</button
		>
		<RotateCcw
			class="m-2 h-10 w-10 cursor-pointer rounded-lg bg-neutral-700 p-2 text-red-400 hover:bg-neutral-600 hover:text-gray-50"
			onclick={() => {
				modelsState.refresh();
			}}
		/>
	</div>
	<div class="flex w-full flex-col items-center">
		<div class="flex w-full flex-row items-center">
			<div class="my-4 flex w-full flex-row items-center justify-between">
				<label for="downloadModel" class="mr-2 mb-2 block w-1/3">downloadModel</label>
				<input
					type="text"
					id="downloadModel"
					placeholder="Enter model name to download"
					bind:value={downloadModel}
					class="w-100 rounded-lg bg-neutral-700 p-2 text-gray-50 focus:ring-2 focus:ring-red-400 focus:outline-none"
				/>
			</div>
			<div>
				<button
					class="mx-2 flex cursor-pointer rounded-lg bg-neutral-700 p-2 text-red-400 hover:bg-neutral-600 hover:text-gray-50"
					onclick={() => {
						if (!downloadModel) {
							alert('Please enter a model name to download.');
							return;
						}
						ollama.pullModel(downloadModel);
					}}
				>
					Download
				</button>
			</div>
		</div>
		<div class="flex w-full flex-col">
			<p class="text-gray-400">Download Status:</p>
			{#if pullingState.isPulling()}
				<p class="text-red-400">{pullingState.state.status}</p>
			{:else}
				<p class="text-gray-50">no download</p>
			{/if}
			<p class="text-gray-400">Progress:</p>
			{#if pullingState.getProgress() > 0}
				<div class="mt-2 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
					<div
						class="h-2.5 rounded-full bg-green-600"
						style="width: {pullingState.getProgress()}%"
					></div>
				</div>
			{/if}
		</div>
	</div>
</div>
