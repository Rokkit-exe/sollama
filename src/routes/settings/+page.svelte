<script lang="ts">
	import Body from '$components/Body.svelte';
	import Header from '$components/Header.svelte';
	import SidePanel from '$components/SidePanel.svelte';
	import CenterPanel from '$components/CenterPanel.svelte';
	import SettingPanel from '$lib/components/SettingPanel.svelte';
</script>

<Body>
	<Header />
	<div class="flex h-screen w-full flex-row">
		<SidePanel />
		<SettingPanel />
	</div>
</Body>
