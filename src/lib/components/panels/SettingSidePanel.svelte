<script lang="ts">
	import { settingsState } from '$stores/settingsState.svelte';
	import NavBar from '$components/NavBar.svelte';
</script>

<div class="flex h-screen w-75 flex-col border-r-1 border-neutral-700 bg-neutral-900 pb-2">
	<NavBar />
	<div class="flex flex-row items-center justify-between p-2">
		<h2 class="font-3xl font-bold text-gray-50">Settings</h2>
	</div>
	<div class="flex max-h-90/100 flex-col overflow-y-scroll p-2">
		<button
			class={settingsState.selectedSection === 'ollama'
				? 'selected-button mb-2'
				: 'select-button mb-2 '}
			onclick={() => (settingsState.selectedSection = 'ollama')}
		>
			<h3>Ollama</h3>
		</button>
		<button
			class={settingsState.selectedSection === 'searxng'
				? 'selected-button mb-2'
				: 'select-button mb-2'}
			onclick={() => (settingsState.selectedSection = 'searxng')}
		>
			<h3>Searxng</h3>
		</button>
	</div>
</div>
