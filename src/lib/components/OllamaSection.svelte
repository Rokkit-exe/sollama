<script lang="ts">
	import { modelsState } from '$lib/stores/modelsState.svelte';
	import { pullingState } from '$lib/stores/pullingState.svelte';
	import { settingsState } from '$lib/stores/settingsState.svelte';
	import { ollama } from '$lib/utils/ollama';
	import { onMount } from 'svelte';
	import RotateCcw from 'lucide-svelte/icons/rotate-ccw';
	let removeModel = $state<string>('');
	let downloadModel = $state<string>('');

	const handleRemoveModel = () => {
		if (!removeModel) {
			alert('Please enter a model name to download.');
			return;
		}
		ollama.deleteModel(removeModel);
		modelsState.refresh();
	};

	const handleDownloadModel = () => {
		if (!downloadModel) {
			alert('Please enter a model name to download.');
			return;
		}
		ollama.pullModel(downloadModel);
	};

	const handleSave = () => {
		console.log('Settings saved:', settingsState.ollama);
	};

	onMount(() => {
		modelsState.refresh();
	});
</script>

<div class="form-input">
	<label for="ollamaHost">Ollama Host</label>
	<input type="text" id="ollamaHost" bind:value={settingsState.ollama.host} />
</div>
<div class="form-input">
	<label for="defaultModel">Default Model</label>
	<input type="text" id="defaultModel" bind:value={settingsState.ollama.DefaultModel} />
</div>
<label for="thinking" class="flex cursor-pointer flex-row items-center">
	<span class="mb-2">Thinking</span>
	<input
		id="thinking"
		type="checkbox"
		bind:value={settingsState.ollama.isThinking}
		class="peer sr-only"
	/>
	<div
		class="peer relative h-6 w-11 rounded-full bg-neutral-700 peer-checked:bg-red-400 peer-focus:ring-2 peer-focus:ring-red-400 peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-neutral-700 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-gray-50 rtl:peer-checked:after:-translate-x-full"
	></div>
</label>
<div class="form-input">
	<label for="system-prompt">Default System Prompt</label>
	<textarea
		name="system-prompt"
		id="system-prompt"
		placeholder="Enter system prompt here..."
		bind:value={settingsState.ollama.defaultSystemPrompt}
		rows="3"
		cols="30"
	>
	</textarea>
</div>
<div class="form-input">
	<label for="downloadModel">Remove model</label>
	<div class="flex w-full flex-row items-center">
		<select bind:value={removeModel} placeholder="Select a model">
			{#each modelsState.models as model}
				<option value={model.model} class="bg-neutral-800">{model.model}</option>
			{/each}
		</select>
		<button class="default-button" onclick={() => handleRemoveModel()}>Remove</button>
		<button
			class="default-button"
			onclick={() => {
				modelsState.refresh();
			}}
		>
			<RotateCcw class="icon" />
		</button>
	</div>
</div>
<div class="form-input">
	<div class="flex w-full flex-col">
		<label for="downloadModel">Download Model</label>
		<div class="mb-2 flex w-full flex-row items-center">
			<input
				type="text"
				id="downloadModel"
				placeholder="Enter model name to download"
				bind:value={downloadModel}
			/>
			<button class="default-button" onclick={() => handleDownloadModel()}>Download</button>
		</div>
	</div>
	<div class="flex w-full flex-row items-center justify-between">
		<p class="text-gray-400">Status:</p>
		{#if pullingState.isPulling()}
			<p class="text-red-400">{pullingState.state.status}</p>
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
	<button class="default-button" onclick={() => handleSave()}>Save</button>
</div>
