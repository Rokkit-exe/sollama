<script lang="ts">
	import { onMount } from 'svelte';
	import { Globe, Paperclip, Send, File, X } from 'lucide-svelte';
	import { chatsState } from '$lib/stores/chatsState.svelte';
	import { ollama } from '$lib/utils/ollama';

	let search = false;
	let textareaRef: HTMLTextAreaElement | null = null;
	let textInput = '';

	onMount(() => {
		if (textareaRef) {
			textareaRef.focus();
		}
	});
	function sendMessage() {
		const content = textInput.trim();
		if (!content) return;

		// Send the message - e.g.:
		ollama.Chat(content);

		textInput = ''; // Clear input
		textareaRef?.focus(); // Keep focus on textarea
	}

	function handleFileChange(event: Event) {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (!file) return;
		let fileContent = '';

		const reader = new FileReader();
		reader.onload = () => {
			fileContent = reader.result as string;
		};
		reader.readAsText(file); // adjust based on file type

		chatsState.selected.files.push({
			size: file.size,
			name: file.name,
			content: fileContent,
			type: file.type
		});
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			// Trigger the send action
			ollama.Chat(textInput);
			textInput = '';
		}
	}
</script>

<div class="flex w-full flex-col">
	<div class="mb-2 ml-2 flex w-full flex-row">
		{#each chatsState.selected.files as file}
			<div
				class="group block flex flex-row items-center rounded-lg p-2 text-gray-50 transition hover:bg-neutral-700"
			>
				<File class="mr-2 inline-block h-6 w-6 text-red-400" />
				{file.name}
				<X
					class="ml-2 inline-block h-6 w-6 cursor-pointer text-red-400 opacity-0 transition-opacity duration-150 group-hover:opacity-100 hover:text-red-200"
					onclick={() => {
						chatsState.selected.files = chatsState.selected.files.filter(
							(f) => f.name !== file.name
						);
					}}
				/>
			</div>
		{/each}
	</div>
	<div class="mt-2 flex w-full flex-row justify-center px-2">
		<textarea
			id="textInput"
			bind:value={textInput}
			bind:this={textareaRef}
			placeholder="Type a message..."
			onkeydown={onKeydown}
		></textarea>
		<button
			class="default-button"
			onclick={() => {
				sendMessage();
				textInput = '';
			}}
		>
			<Send class="icon" />
		</button>
	</div>
	<div class="mx-2 mt-2 flex w-full flex-row">
		<button
			class={search ? 'selected-button mr-2' : 'select-button mr-2'}
			onclick={() => (search = !search)}
		>
			<Globe class="icon mr-1" />
			<label for="select-button">Search</label>
		</button>
		<button class="select-button mr-2">
			<Paperclip class="icon mr-1" />
			<label for="file-upload"> Attach </label>
			<input
				id="file-upload"
				type="file"
				class="hidden"
				onchange={handleFileChange}
				accept=".txt,.md,.json,.csv,.xml, .html, .js, .css, .py, .java, .c, .cpp, .go, .rs, .ts, .php"
			/>
		</button>
	</div>
</div>
