<script lang="ts">
	import { chatsState } from '$lib/stores/chatsState.svelte';
	import { MessageCircle, Settings } from 'lucide-svelte';
</script>

<div class="m-2 mb-4 flex max-h-90/100 w-75 flex-col overflow-y-scroll bg-neutral-900 p-2">
	<nav class="hidden space-x-6 md:flex">
		<a href="/" class="block flex flex-row text-gray-300 hover:text-red-400">
			<MessageCircle class="mr-2 inline-block" />
			<h2>Chat</h2>
		</a>
		<a href="/settings" class="block flex flex-row text-gray-300 hover:text-red-400">
			<Settings class="mr-2 inline-block hover:text-red-400" />
			<h2 class="hover:text-red-400">Settings</h2>
		</a>
	</nav>
	<div class="mt-4 flex flex-col space-y-2">
		<h2 class="text-gray-500">System Prompt</h2>
		<textarea
			name="system-prompt"
			id="system-prompt"
			class="rounded-lg bg-neutral-700 p-2 text-gray-300 focus:border-red-400 focus:ring-2 focus:ring-red-400 focus:outline-none"
			placeholder="Enter system prompt here..."
			bind:value={chatsState.selected.system_prompt}
			rows="10"
			cols="30"
		>
		</textarea>
	</div>
</div>
