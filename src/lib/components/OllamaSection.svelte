<script lang="ts">
	import { modelsState } from '$lib/stores/modelsState.svelte';
	import { pullingState } from '$lib/stores/pullingState.svelte';
	import { settingsState } from '$lib/stores/settingsState.svelte';
	import { ollama } from '$lib/utils/ollama';
	import { onMount } from 'svelte';
	import RotateCcw from 'lucide-svelte/icons/rotate-ccw';
	import { chatsState } from '$lib/stores/chatsState.svelte';
	let removeModel = $state<string>('');
	let downloadModel = $state<string>('');

	onMount(() => {
		modelsState.refresh();
	});
</script>

<div class="my-4 flex flex-col">
	<label for="ollamaHost" class="mr-2 mb-2 block w-1/3">Host</label>
	<input
		type="text"
		id="ollamaHost"
		bind:value={settingsState.ollama.host}
		class="w-100 rounded-lg bg-neutral-700 p-2 text-gray-50 focus:ring-2 focus:ring-red-400 focus:outline-none"
	/>
</div>
<div class="my-4 flex flex-col">
	<label for="ollamaModel" class="mr-2 mb-2 block w-1/3">Default Model</label>
	<input
		type="text"
		id="ollamaModel"
		bind:value={settingsState.ollama.defaultModel}
		class="w-100 rounded-lg bg-neutral-700 p-2 text-gray-50 focus:ring-2 focus:ring-red-400 focus:outline-none"
	/>
</div>
<div class="my-4 flex flex-col">
	<label for="isThinking" class="mr-2 mb-2 w-1/3">Thinking</label>
	<p class="text-gray-500">Abilety to reason (only for supported models)</p>
	<button
		class={settingsState.ollama.isThinking
			? 'my-2 flex w-auto cursor-pointer rounded-lg bg-neutral-700 p-2 text-red-400 hover:bg-neutral-600'
			: ' my-2 flex w-auto cursor-pointer rounded-lg bg-neutral-800 p-2 text-red-400 hover:bg-neutral-700'}
		onclick={() => {
			settingsState.ollama.isThinking = !settingsState.ollama.isThinking;
		}}>{settingsState.ollama.isThinking}</button
	>
</div>
<div class="my-4 flex w-full flex-col">
	<p class="text-gray-400">Default System Prompt</p>
	<textarea
		name="system-prompt"
		id="system-prompt"
		class="w-full rounded-lg bg-neutral-700 p-2 text-gray-300 focus:border-red-400 focus:ring-2 focus:ring-red-400 focus:outline-none"
		placeholder="Enter system prompt here..."
		bind:value={settingsState.ollama.defaultSystemPrompt}
		rows="3"
		cols="30"
	>
	</textarea>
</div>
<div class="my-4 flex w-full flex-col">
	<label for="downloadModel" class="block w-1/3">Remove model</label>
	<div class="flex w-full flex-row items-center">
		<select
			bind:value={removeModel}
			placeholder="Select a model"
			class="rounded-lg bg-neutral-700 p-2 text-gray-50 focus:ring-1 focus:ring-red-400 focus:outline-none"
		>
			{#each modelsState.models as model}
				<option value={model.name} class="bg-neutral-800">{model.name}</option>
			{/each}
		</select>
		<button
			class="m-2 flex cursor-pointer rounded-lg bg-neutral-700 p-2 text-red-400 hover:bg-neutral-600 hover:text-gray-50"
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
			class="h-10 w-10 cursor-pointer rounded-lg bg-neutral-700 p-2 text-red-400 hover:bg-neutral-600 hover:text-gray-50"
			onclick={() => {
				modelsState.refresh();
			}}
		/>
	</div>
</div>
<div class="my-4 flex w-full flex-col items-center">
	<div class="flex w-full flex-col">
		<label for="downloadModel" class="block w-1/3">Download Model</label>
		<div class="my-4 flex w-full flex-row items-center">
			<input
				type="text"
				id="downloadModel"
				placeholder="Enter model name to download"
				bind:value={downloadModel}
				class="w-100 rounded-lg bg-neutral-700 p-2 text-gray-50 focus:ring-2 focus:ring-red-400 focus:outline-none"
			/>
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
	<div class="flex w-full flex-row items-center justify-between">
		<p class="text-gray-400">Download Status:</p>
		{#if pullingState.isPulling()}
			<p class="text-red-400">{pullingState.state.status}</p>
		{:else}
			<p class="text-gray-50">no download</p>
		{/if}
	</div>
	<div class="flex w-full flex-row items-center justify-between">
		<p class="text-gray-400">Progress:</p>
		{#if pullingState.getProgress() > 0}
			<div class="mt-2 ml-2 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
				<div
					class="h-2.5 rounded-full bg-green-600"
					style="width: {pullingState.getProgress()}%"
				></div>
			</div>
		{/if}
	</div>
</div>

<div class="flex w-full justify-end">
	<button
		class="m-2 flex cursor-pointer rounded-lg bg-neutral-700 p-2 text-red-400 hover:bg-neutral-600 hover:text-gray-50"
	>
		Save
	</button>
</div>
