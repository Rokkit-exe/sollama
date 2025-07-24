<script lang="ts">
	import { chatsState } from '$lib/stores/chatsState.svelte';
	import { MessageCircle, Settings } from 'lucide-svelte';
</script>

<div class="m-2 mb-4 flex max-h-90/100 w-75 flex-col overflow-y-scroll bg-neutral-900 p-2">
	<nav class="hidden space-x-6 md:flex">
		<a href="/">
			<MessageCircle class="mr-2" />
			<p class="">Chat</p>
		</a>
		<a href="/settings">
			<Settings class="mr-2" />
			<p class="">Settings</p>
		</a>
	</nav>
	<div class="mt-4 flex flex-col space-y-2">
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
</div>
