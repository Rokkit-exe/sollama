<script lang="ts">
	import Body from './Body.svelte';
	import Header from './Header.svelte';
	import SidePanel from './SidePanel.svelte';
	import CenterPanel from './CenterPanel.svelte';
	import Chat from '../models/Chat';
	import Message from '../models/Message';

	let chats = $state<Chat[]>([]);
	let messages = $state<Message[]>([]);

	messages.push(new Message('1', 'Hello, this is a message', new Date(), 'user'));
	messages.push(new Message('2', 'This is a response from the bot', new Date(), 'bot'));
	messages.push(new Message('3', 'Another message from the user', new Date(), 'user'));

	chats.push(new Chat('Chat 1', 'This is the first chat'));
	chats.push(new Chat('Chat 2', 'This is the second chat'));
	chats.push(new Chat('Chat 3', 'This is the third chat'));
</script>

<Body>
	<Header />
	<div class="flex h-screen w-full flex-row">
		<SidePanel {chats} />
		<CenterPanel {chats} />
		<SidePanel {chats} />
	</div>
</Body>
