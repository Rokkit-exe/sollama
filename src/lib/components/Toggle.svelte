<script lang="ts">
	let { id, title, checked } = $props();
</script>

<label for={id} class="flex cursor-pointer flex-col">
	<span>{title}</span>
	<input {id} type="checkbox" bind:checked class="peer sr-only" />
	<div
		class="peer relative my-2 h-6 w-11 rounded-full bg-neutral-700 peer-checked:bg-red-400 peer-focus:ring-2 peer-focus:ring-neutral-900 peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-neutral-700 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-gray-50 rtl:peer-checked:after:-translate-x-full"
	></div>
</label>
