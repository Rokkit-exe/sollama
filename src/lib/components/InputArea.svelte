<script lang="ts">
	import { onMount } from 'svelte';
	import { Globe, Paperclip, Send, File, X, Settings, Pencil } from 'lucide-svelte';
	import { chatsState } from '$lib/stores/chatsState.svelte';
	import { ollama } from '$lib/utils/ollama';
	import Overlay from './Overlay.svelte';

	let search = $state<boolean>(false);
	let textareaRef: HTMLTextAreaElement | null = null;
	let textInput = $state<string>('');
	let isMenuOpen = $state<boolean>(false);

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

<div class="flex w-full flex-col rounded-lg bg-neutral-800">
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
	<div class="mt-2 flex w-full flex-col px-2">
		<textarea
			id="textInput"
			bind:value={textInput}
			bind:this={textareaRef}
			placeholder="Type a message..."
			onkeydown={onKeydown}
		></textarea>
	</div>
	<div class="mx-2 mt-2 flex w-full flex-row">
		<button
			title="Activate Web Search tool"
			class={search ? 'control-button-selected mr-2 mb-2' : 'control-button mr-2 mb-2'}
			onclick={() => (search = !search)}
		>
			<Globe class="icon mr-1" />
			<label for="select-button">Search</label>
		</button>
		<button class="control-button mr-2 mb-2" title="Attach File">
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
		<button
			class="control-button mr-2 mb-2"
			title="Edit system prompt"
			onclick={() => (isMenuOpen = true)}
		>
			<Pencil class="icon mr-1" />
			<label for="settings-button">Prompt</label>
		</button>

		{#if isMenuOpen}
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
		{/if}
		<div class="flex flex-grow justify-end px-4">
			<button
				class="control-button mb-2"
				onclick={() => {
					sendMessage();
					textInput = '';
				}}
			>
				<Send class="icon" />
			</button>
		</div>
	</div>
</div>
