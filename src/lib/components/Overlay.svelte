<script>
	let { isMenuOpen } = $props();
	import { X } from 'lucide-svelte';
	import { chatsState } from '$lib/stores/chatsState.svelte';
</script>

<div
	class="bg-opacity-95 fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-neutral-900 duration-700"
>
	<div class="flex h-1/2 w-1/3 flex-col space-y-6 p-8 shadow-lg">
		<div class="flex w-full items-center justify-between">
			<h2 class="text-2xl font-bold text-gray-50">System Prompt</h2>
			<button class="default-button" onclick={() => (isMenuOpen = false)}>
				<X class="icon" />
			</button>
		</div>
		<textarea
			name="system-prompt"
			id="system-prompt"
			placeholder="Enter system prompt here..."
			bind:value={chatsState.selected.system_prompt}
			rows="10"
			cols="30"
		></textarea>
	</div>
</div>
