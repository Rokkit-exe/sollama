<script lang="ts">
	import '../app.css';
	import { chatsState } from '$lib/stores/chatsState.svelte';
	import Header from '$components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
	chatsState.init();
</script>

<div class="flex h-screen flex-col bg-neutral-900">
	<main class="flex h-screen w-full flex-row bg-neutral-900">
		{@render children()}
	</main>
</div>
