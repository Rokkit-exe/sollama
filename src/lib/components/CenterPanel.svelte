<script lang="ts">
	import InputArea from './InputArea.svelte';
	import ChatHeader from './ChatHeader.svelte';
	import ChatMessages from './ChatMessages.svelte';
</script>

<div
	class="mx-2 mx-auto flex h-auto flex-col justify-between rounded-lg p-2 text-gray-50 sm:px-6 md:w-3/4 lg:w-3/4 lg:px-2 xl:w-1/2"
>
	<!-- Chat Header -->
	<ChatHeader />
	<!-- Chat Messages -->
	<ChatMessages />
	<!-- Input and File Attachment -->
	<InputArea />
</div>

<style>
	:global(.markdown-body) {
		background-color: #171717;
	}
	:global(.markdown-body pre, code) {
		background-color: #2d2d2d;
	}
	:global(.markdown-body h1, h2, h3, h4, h5, h6) {
		color: #f8f8f2;
	}
</style>
