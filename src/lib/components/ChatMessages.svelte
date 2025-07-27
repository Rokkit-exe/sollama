<script lang="ts">
	import { chatsState } from '$stores/chatsState.svelte';
	import { modelsState } from '$stores/modelsState.svelte';
	import { CircleUser, Bot } from 'lucide-svelte';
	import { marked } from 'marked';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/tokyo-night-dark.css'; // 🎨 change to any theme you like
	import 'github-markdown-css/github-markdown-dark.css'; // for full markdown styling

	const renderer = new marked.Renderer();

	// Type-safe override using Marked's v5 API
	renderer.code = ({ text, lang }: { text: string; lang?: string }) => {
		const validLang = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
		const highlighted = hljs.highlight(text, { language: validLang }).value;
		return `<pre><code class="hljs language-${validLang} m-2 bg-neutral-800">${highlighted}</code></pre>`;
	};

	marked.setOptions({ renderer });
</script>

<div class="flex h-full w-full flex-col overflow-y-scroll p-2">
	{#if chatsState.selected.messages.length === 0}
		<p class="text-center text-gray-500">Start the conversation!</p>
	{/if}
	{#each chatsState.selected.messages as msg}
		<div class="mb-4 border-b-1 border-neutral-700 p-2 pl-4">
			{#if msg.role === 'user'}
				<div class="flex flex-row items-center justify-between font-bold text-red-400">
					<div>
						<CircleUser class="w=6 mr-2 inline-block h-6" />
						<span>{msg.role}</span>
					</div>
					<div class="ml-2 text-xs text-gray-700">
						{msg.created_at ? new Date(msg.created_at).toLocaleTimeString() : ''}
					</div>
				</div>
			{:else if msg.role === 'assistant'}
				<div class="flex flex-row items-center justify-between font-bold text-red-400">
					<div>
						<Bot class="mr-2 inline-block h-6 w-6" />
						<span>{msg.role}</span>
						{#if msg.content === ''}
							<span class="text-gray-500">...Loading</span>
						{:else if modelsState.isThinking}
							<span class="text-gray-500">...Thinking</span>
						{/if}
					</div>
					<div class="ml-2 text-xs text-gray-700">
						{msg.created_at ? new Date(msg.created_at).toLocaleTimeString() : ''}
					</div>
				</div>
			{/if}
			<!-- In your message render loop -->
			<div class="markdown-body max-w-full overflow-x-auto">
				{@html marked(msg.content)}
			</div>
		</div>
	{/each}
</div>
