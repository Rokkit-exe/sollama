<script lang="ts">
	let { name, input } = $props<{ name: string; input: string }>();
</script>

<div class="mb-4 flex w-full flex-row items-center justify-between">
	<label for={name} class="mr-2 mb-2 block w-1/3">{name}</label>
	<input
		type="text"
		id={name}
		bind:value={input}
		class="w-100 rounded-lg bg-neutral-700 p-2 text-gray-50 focus:ring-2 focus:ring-red-400 focus:outline-none"
	/>
</div>
