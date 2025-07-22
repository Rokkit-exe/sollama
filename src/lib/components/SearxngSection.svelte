<script lang="ts">
	import { settingsState } from '$lib/stores/settingsState.svelte';
</script>

<div class="my-4 flex w-full flex-row items-center justify-between">
	<label for="searxngHost" class="mr-2 mb-2 block w-1/3">Host</label>
	<input
		type="text"
		id="searxngHost"
		bind:value={settingsState.searxng.host}
		class="w-100 rounded-lg bg-neutral-700 p-2 text-gray-50 focus:ring-2 focus:ring-red-400 focus:outline-none"
	/>
</div>
<div class="my-4 flex w-full flex-row items-center justify-between">
	<label for="searxngSearchEngine" class="mr-2 mb-2 block w-1/3">Search Engines</label>
	<div class="my-4 flex w-full flex-row items-center">
		{#each settingsState.searxng.searchEngines as engine}
			<button
				class={settingsState.searxng.selectedEngines.includes(engine)
					? 'm-2 flex w-full items-center justify-between rounded-lg bg-neutral-700 p-2 text-gray-50 hover:bg-neutral-600'
					: 'm-2 flex w-full items-center justify-between rounded-lg bg-neutral-800 p-2 text-gray-50 hover:bg-neutral-700'}
				onclick={() => {
					settingsState.searxng.selectedEngines.includes(engine)
						? (settingsState.searxng.selectedEngines = settingsState.searxng.selectedEngines.filter(
								(e) => e !== engine
							))
						: settingsState.searxng.selectedEngines.push(engine);
				}}
			>
				{engine}
			</button>
		{/each}
	</div>
</div>
