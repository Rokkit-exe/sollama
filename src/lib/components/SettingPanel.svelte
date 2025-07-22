<script lang="ts">
	import { settingsState } from '$lib/stores/settingsState.svelte';
	import OllamaSection from './OllamaSection.svelte';
	import SearxngSection from './SearxngSection.svelte';
</script>

<div
	class="m-2 mx-auto mt-4 flex h-auto flex-col overflow-y-scroll rounded-lg p-2 text-gray-50 xl:w-1/2"
>
	{#if settingsState.selectedSection === 'ollama'}
		<h2 class="mt-4 mb-4 flex justify-center text-xl font-bold text-red-400">Ollama</h2>
		<OllamaSection />
	{:else if settingsState.selectedSection === 'searxng'}
		<h2 class="mt-4 mb-4 flex justify-center text-xl font-bold text-red-400">Searxng</h2>
		<SearxngSection />
	{/if}
</div>
