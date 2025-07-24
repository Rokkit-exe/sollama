<script lang="ts">
	import { settingsState } from '$lib/stores/settingsState.svelte';
</script>

<div class="form-input">
	<label for="searxngHost">Host</label>
	<input type="text" id="searxngHost" bind:value={settingsState.searxng.host} />
</div>
<div class="form-input">
	<label for="searxngSearchEngine">Search Engines</label>
	<div class="mb-2 flex w-full flex-row items-center">
		{#each settingsState.searxng.searchEngines as engine}
			<button
				class={settingsState.searxng.selectedEngines.includes(engine)
					? 'selected-button'
					: 'select-button'}
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
