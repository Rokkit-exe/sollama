<script lang="ts">
	import { modelsState } from '$stores/modelsState.svelte';
	import { pullingState } from '$stores/pullingState.svelte';
	import { settingsState } from '$stores/settingsState.svelte';
	import { ollama } from '$utils/ollama';
	import { onMount } from 'svelte';
	import RotateCcw from 'lucide-svelte/icons/rotate-ccw';
	import Toggle from '$components/Toggle.svelte';
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
	<label for="ollamaHost" class="mb-2">Ollama Host</label>
	<input type="text" id="ollamaHost" bind:value={settingsState.ollama.host} />
</div>
<div class="form-input">
	<label for="defaultModel" class="mb-2">Default Model</label>
	<input type="text" id="defaultModel" bind:value={settingsState.ollama.DefaultModel} />
</div>
<Toggle id="thinking" title="Thinking" checked={settingsState.ollama.isThinking} />
<div class="form-input">
	<label for="system-prompt" class="mb-2">Default System Prompt</label>
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
	<label for="downloadModel" class="mb-2">Remove model</label>
	<div class="flex w-full flex-row items-center">
		<select bind:value={removeModel} placeholder="Select a model">
			{#each modelsState.models as model}
				<option value={model.model} class="bg-neutral-800">{model.model}</option>
			{/each}
		</select>
		<button class="default-button mr-2" onclick={() => handleRemoveModel()}>Remove</button>
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
		<label for="downloadModel" class="mb-2">Download Model</label>
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
