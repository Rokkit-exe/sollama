import type { StreamedResponse } from '$lib/models/StreamedResponse';
import type { ChatRequest } from '$lib/models/ChatRequest';
import { chatsState } from '$stores/chatsState.svelte';
import { modelsState } from '$stores/modelsState.svelte';
import { Status, toEnum } from '$models/Status';
import { messageRequest } from './messageRequest';

export const agentRequest = {
	async Chat(chatRequest: ChatRequest, msgId: string): Promise<string> {
		const response = await fetch('http://localhost:8080/agent/chat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(chatRequest)
		});
		if (!response.ok) {
			throw new Error(`Failed to start chat: ${response.statusText}`);
		}
		if (!response.body) {
			console.error('No response body received');
			return '';
		}

		let message = chatsState.selected.messages.find((m) => m.id === msgId);
		if (!message) {
			console.error('Message not found for ID:', msgId);
		}

		const reader = response.body.getReader();
		const decoder = new TextDecoder();
		let buffer = '';
		let content = '';
		while (true) {
			const { done, value } = await reader.read();
			if (done) {
				modelsState.status = Status.Finish;
				break;
			}

			// Append the latest chunk to our buffer
			buffer += decoder.decode(value, { stream: true });

			// Process all complete lines
			let newlineIndex;
			while ((newlineIndex = buffer.indexOf('\n')) >= 0) {
				const line = buffer.slice(0, newlineIndex).trim();
				buffer = buffer.slice(newlineIndex + 1); // keep leftover for next read

				if (!line) continue; // skip empty lines

				try {
					const streamedResponse: StreamedResponse = JSON.parse(line);

					if (streamedResponse.done) {
						chatsState.updateMessageContent(
							chatsState.selected.id,
							msgId,
							streamedResponse.message.content
						);
						break;
					}

					let chunk = streamedResponse.message.content;

					content += chunk;
					let status: Status | undefined = toEnum(Status, streamedResponse.status);
					modelsState.statusDetails = streamedResponse.status_details || '';
					if (!status) {
						console.error('Invalid status received:', streamedResponse.status);
						status = Status.Error; // Fallback to Error if status is Invalid
						break;
					}
					if (status === Status.Error) {
						console.error('Error status received:', streamedResponse.status_details);
						break;
					}
					modelsState.status = status;

					chatsState.updateMessageContent(chatsState.selected.id, msgId, content + chunk);
				} catch (err) {
					console.error('Invalid JSON line:', line, err);
				}
			}
		}
		return content;
	}
};
