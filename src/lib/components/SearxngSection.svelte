<script lang="ts">
	import { settingsState } from '$lib/stores/settingsState.svelte';
</script>

<div class="form-input">
	<label for="searxngHost" class="mb-2">Host</label>
	<input type="text" id="searxngHost" bind:value={settingsState.searxng.host} />
</div>
<div class="form-input">
	<label for="searxngSearchEngine" class="mb-2">Search Engines</label>
	<div class="mb-2 flex w-full flex-row items-center">
		{#each settingsState.searxng.searchEngines as engine}
			<button
				class={settingsState.searxng.selectedEngines.includes(engine)
					? 'selected-button mr-2'
					: 'select-button mr-2'}
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
