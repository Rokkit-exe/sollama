<script lang="ts">
	let ollamaHost = $state('http://localhost:11434');
	let ollamaModel = $state('llama3.2');
	let searxngHost = $state('http://localhost:8888');
	let searxngSearchEngine = $state('google');
	import SettingInputField from './SettingInputField.svelte';
</script>

<div class="m-2 mx-auto mt-4 flex h-auto flex-col rounded-lg p-2 text-gray-50 xl:w-1/2">
	<h2 class="mt-4 mb-4 flex justify-center text-xl font-bold text-red-400">Settings</h2>
	<SettingInputField name="OllamaHost" input={ollamaHost} />
	<SettingInputField name="OllamaModel" input={ollamaModel} />
	<SettingInputField name="SearxngHost" input={searxngHost} />
	<SettingInputField name="SearxngSearchEngine" input={searxngSearchEngine} />

	<div class="flex w-full justify-end">
		<button
			class="m-2 flex cursor-pointer rounded-lg bg-neutral-700 p-2 text-red-400 hover:bg-neutral-600 hover:text-gray-50"
		>
			Save
		</button>
	</div>
</div>
