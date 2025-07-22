<script lang="ts">
	import { settingsState } from '$lib/stores/settingsState.svelte';
</script>

<div class="m-2 flex max-h-90/100 w-75 flex-col bg-neutral-900 p-2">
	<a href="/" class="mb-2 text-xl font-bold text-gray-900 hover:text-red-400 dark:text-white"
		>Sollama</a
	>
	<div class="flex flex-row items-center justify-between border-b border-neutral-700 p-2">
		<h2 class="font-3xl font-bold text-gray-50">Settings</h2>
	</div>
	<div class="flex max-h-90/100 flex-col overflow-y-scroll p-2">
		<button
			class={settingsState.selectedSection === 'ollama'
				? 'group my-2 flex w-full items-center justify-between rounded-lg bg-neutral-700 p-2 text-gray-50 transition hover:bg-neutral-700'
				: 'group my-2 flex w-full items-center justify-between rounded-lg bg-neutral-900 p-2 text-gray-50 transition hover:bg-neutral-700'}
			onclick={() => (settingsState.selectedSection = 'ollama')}
		>
			<h3>Ollama</h3>
		</button>
		<button
			class={settingsState.selectedSection === 'searxng'
				? 'group my-2 flex w-full items-center justify-between rounded-lg bg-neutral-700 p-2 text-gray-50 transition hover:bg-neutral-700'
				: 'group my-2 flex w-full items-center justify-between rounded-lg bg-neutral-900 p-2 text-gray-50 transition hover:bg-neutral-700'}
			onclick={() => (settingsState.selectedSection = 'searxng')}
		>
			<h3>Searxng</h3>
		</button>
	</div>
</div>
