<script lang="ts">
	import { chatsState } from '$lib/stores/chatsState.svelte';
	import { onMount } from 'svelte';
	import { modelsState } from '$lib/stores/modelsState.svelte';
	import ModelSelect from '$lib/components/ModelSelect.svelte';
	import ChatMessages from '$lib/components/ChatMessages.svelte';
	import InputArea from './InputArea.svelte';
	onMount(() => {
		modelsState.refresh();
		if (!chatsState.selected.model) {
			chatsState.selected.model = modelsState.models[0].model;
		}
		setInterval(() => {
			modelsState.refresh();
		}, 60000); // Refresh models every minute
	});
</script>

<div class="m-2 flex w-full flex-row items-center justify-between"></div>
