<script lang="ts">
	import { MessageCircle, Settings } from 'lucide-svelte';
</script>

<div class="m-2 mb-4 flex max-h-90/100 w-50 flex-col overflow-y-scroll bg-neutral-900 p-2">
	<nav class="hidden space-x-6 md:flex">
		<a href="/" class="block flex flex-row text-gray-700 hover:text-red-400 dark:text-gray-300">
			<MessageCircle class="mr-2 inline-block" />
			<h2>Chat</h2>
		</a>
		<a
			href="/settings"
			class="block flex flex-row text-gray-700 hover:text-red-400 dark:text-gray-300"
		>
			<Settings class="mr-2 inline-block" />
			<h2>Settings</h2>
		</a>
	</nav>
</div>
