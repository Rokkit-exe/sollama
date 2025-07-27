<script lang="ts">
	import { chatsState } from '$lib/stores/chatsState.svelte';
	import Toggle from './Toggle.svelte';
</script>

<div class="mt-4 mb-2 flex flex-col space-y-2">
	<label for="system-prompt">System Prompt</label>
	<textarea
		name="system-prompt"
		id="system-prompt"
		placeholder="Enter system prompt here..."
		bind:value={chatsState.selected.system_prompt}
		rows="10"
		cols="30"
	>
	</textarea>
</div>
<Toggle id="thinking" title="Thinking" checked={chatsState.selected.isThinking} />
