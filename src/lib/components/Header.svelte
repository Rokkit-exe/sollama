<script lang="ts">
	import { onMount } from 'svelte';
	import { MessageCircle, Settings } from 'lucide-svelte';
	let isOpen = false;
	let isDark = false;

	onMount(() => {
		isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		document.documentElement.classList.toggle('dark', isDark);
	});

	function toggleMenu() {
		isOpen = !isOpen;
	}

	function toggleDark() {
		isDark = !isDark;
		document.documentElement.classList.toggle('dark', isDark);
	}
</script>

<header class="bg-white dark:bg-neutral-900">
	<div class="mx-auto px-4">
		<div class="flex h-10 items-center justify-between">
			<!-- Logo -->
			<a href="/" class="text-xl font-bold text-gray-900 hover:text-red-400 dark:text-white"
				>Sollama</a
			>

			<!-- Desktop nav -->
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

			<!-- Toggle buttons -->
			<div class="flex items-center gap-3">
				<button on:click={toggleDark} class="text-xl">
					{#if isDark}
						🌙
					{:else}
						☀️
					{/if}
				</button>

				<!-- Mobile menu toggle -->
				<button class="md:hidden" on:click={toggleMenu} aria-label="Toggle Menu">
					<svg
						class="h-6 w-6 text-gray-800 dark:text-white"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if isOpen}
		<nav class="space-y-2 bg-white px-4 pb-4 md:hidden dark:bg-gray-900">
			<a href="/" class="block text-gray-700 hover:text-red-400 dark:text-gray-300">
				<MessageCircle class="mr-2 inline-block" />
				<h2>Chat</h2>
			</a>
			<a href="/settings" class="block text-gray-700 hover:text-red-400 dark:text-gray-300">
				<Settings class="mr-2 inline-block" />
				<h2>Settings</h2>
			</a>
		</nav>
	{/if}
</header>

<style>
	/* Optional: smooth transitions */
	header,
	nav a {
		transition: all 0.3s ease;
	}
</style>
