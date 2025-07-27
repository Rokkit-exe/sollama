<script lang="ts">
	import { Bot, Settings } from 'lucide-svelte';
</script>

<nav class="my-4 flex flex-row items-center justify-between border-b border-neutral-700 px-2 pb-4">
	<a href="/" title="Home">
		<Bot class="mr-2" />
	</a>
	<a href="/settings" title="Settings">
		<Settings class="mr-2" />
	</a>
</nav>
