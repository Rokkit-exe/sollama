<script lang="ts">
	import { chatsState } from '$lib/stores/chatsState.svelte';
	import type { AttachedFile } from '$lib/models/AttachedFile';
	import { Send, Bot, CircleUser, Globe, Paperclip, File, X } from 'lucide-svelte';
	import { onMount } from 'svelte';
	let textInput = $state('');
	let search = $state(false);

	let textareaRef: HTMLTextAreaElement | null = null;

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault(); // Prevents newline
			if (e.target instanceof HTMLTextAreaElement) {
				sendMessage();
			} else {
				textareaRef?.focus();
			}
		}
	}

	function sendMessage() {
		const content = textInput.trim();
		if (!content) return;

		// Send the message - e.g.:
		chatsState.addMessage(chatsState.selected.id, content, 'user');

		textInput = ''; // Clear input
		textareaRef?.focus(); // Keep focus on textarea
	}

	onMount(() => {
		// Focus the textarea when the component mounts
		if (textareaRef) {
			textareaRef.focus();
		}
	});

	let files = $state<AttachedFile[]>([]);

	function handleFileChange(event: Event) {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (!file) return;
		let fileContent = '';

		const reader = new FileReader();
		reader.onload = () => {
			fileContent = reader.result as string;
		};
		reader.readAsText(file); // adjust based on file type

		files.push({
			size: file.size,
			name: file.name,
			content: fileContent,
			type: file.type
		});
	}
</script>

<div
	class="mx-2 mx-auto flex h-auto flex-col justify-between rounded-lg p-2 text-gray-50 sm:px-6 md:w-3/4 lg:w-3/4 lg:px-2 xl:w-1/2"
>
	<!-- Chat Header -->

	<div class="m-2 flex w-full flex-row justify-between">
		<h2 class="flex justify-center text-xl font-bold text-red-400">
			{chatsState.selected.name}
		</h2>
		<select
			class="rounded-lg p-2 text-gray-50 hover:bg-neutral-700 focus:ring-1 focus:ring-red-400 focus:outline-none"
		>
			<option value="llama3.2" selected class="bg-neutral-700">Llama 3.2</option>
			<option value="llama3.1">Llama 3.1</option>
			<option value="llama2">Llama 2</option>
			<option value="gpt-3.5">GPT-3.5</option>
			<option value="gpt-4">GPT-4</option>
		</select>
	</div>

	<!-- Chat Messages -->
	<div class="flex max-h-1/2 w-full flex-col overflow-y-scroll p-2">
		{#if chatsState.selected.messages.length === 0}
			<p class="text-center text-gray-500">Start the conversation!</p>
		{/if}
		{#each chatsState.selected.messages as msg}
			<div class="mb-4 border-b-1 border-neutral-700 p-2 pl-4">
				{#if msg.role === 'user'}
					<div class="flex flex-row font-bold text-red-400">
						<CircleUser class="w=6 mr-2 inline-block h-6" />
						<span>{msg.role}</span>
					</div>
				{:else}
					<div class="flex flex-row font-bold text-red-400">
						<Bot class="mr-2 inline-block h-6 w-6" />
						<span>{msg.role}</span>
					</div>
				{/if}
				<p class="flex w-full p-2 text-white">{msg.content}</p>
			</div>
		{/each}
	</div>
	<!-- Input and File Attachment -->
	<div class="flex w-full flex-col">
		<div class="mb-2 ml-2 flex w-full flex-row">
			{#each files as file}
				<div
					class="group block flex flex-row items-center rounded-lg p-2 text-gray-50 transition hover:bg-neutral-700"
				>
					<File class="mr-2 inline-block h-6 w-6 text-red-400" />
					{file.name}
					<X
						class="ml-2 inline-block h-6 w-6 cursor-pointer text-red-400 opacity-0 transition-opacity duration-150 group-hover:opacity-100 hover:text-red-200"
						onclick={() => {
							files = files.filter((f) => f.name !== file.name);
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
				class="field-sizing-content w-full rounded-lg bg-neutral-700 p-2 text-gray-50 focus:ring-1 focus:ring-red-400 focus:outline-none"
				onkeydown={onKeydown}
			></textarea>
			<button
				class="m-1 p-1"
				onclick={() => {
					chatsState.addMessage(chatsState.selected.id, textInput, 'user');
					textInput = '';
				}}><Send class="h-6 w-6 text-red-400 hover:text-red-200"></Send></button
			>
		</div>
		<div class="mx-2 mt-2 flex w-full flex-row">
			<button
				class={search
					? 'mx-2 flex rounded-lg bg-neutral-700 p-1 hover:bg-neutral-700'
					: 'mx-2 flex rounded-lg  p-1 hover:bg-neutral-700'}
				onclick={() => (search = !search)}
			>
				<Globe class="mr-1 h-6 w-6 text-red-400" />
				<span>Search</span>
			</button>
			<button class="mx-2 flex rounded-lg p-1 hover:bg-neutral-700">
				<Paperclip class="mr-1 h-6 w-6 text-red-400" />
				<label for="file-upload" class="cursor-pointer"> Attach </label>
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
</div>
