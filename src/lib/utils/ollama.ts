import { chatsState } from '$stores/chatsState.svelte';
import type { StreamedResponse } from '$models/StreamedResponse';
import type { Model } from '$models/model';
import { pullingState } from '$stores/pullingState.svelte';
import type { PullResponse } from '$models/PullResponse';
import { modelsState } from '$stores/modelsState.svelte';
import { Status } from '$lib/models/Status';

export const ollama = {
	async getModels(): Promise<Model[]> {
		const response = await fetch('http://192.168.0.100:10000/api/tags', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		});
		if (!response.ok) {
			console.error('Failed to fetch models:', response.statusText);
		}
		const data = await response.json();
		return data.models;
	},
	async Chat(content: string) {
		if (!chatsState.selected || !chatsState.selected.id) {
			console.error('No chat selected');
			return;
		}
		chatsState.addMessage(chatsState.selected.id, content, 'user');
		chatsState.addMessage(chatsState.selected.id, '', 'assistant');
		if (!content.trim()) {
			console.warn('Empty message, not sending');
			return;
		}

		const response = await fetch('http://192.168.0.100:10000/api/chat', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				model: chatsState.selected.model,
				stream: true,
				messages: [{ role: 'user', content: content }]
			})
		});

		if (!response.body) {
			console.error('No response body received');
			return;
		}

		const reader = response.body.getReader();
		const decoder = new TextDecoder();
		let buffer = '';

		while (true) {
			const { done, value } = await reader.read();
			if (done) {
				break;
			}
			let streamedResponse: StreamedResponse = JSON.parse(decoder.decode(value, { stream: true }));
			if (
				streamedResponse.message?.content === '<thinking>' ||
				streamedResponse.message?.content === '<think>'
			) {
				modelsState.status = Status.Thinking;
			} else if (
				streamedResponse.message?.content === '</thinking>' ||
				streamedResponse.message?.content === '</think>'
			) {
				modelsState.status = Status.Generating;
			}
			if (modelsState.status === Status.Generating) {
				buffer += streamedResponse.message?.content || '';
				chatsState.updateMessageContent(chatsState.selected.id, buffer);
			}
		}
	},
	async getLoadedModels(): Promise<Model[]> {
		const response = await fetch('http://192.168.0.100:10000/api/ps', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		});
		if (!response.ok) {
			console.error('Failed to fetch loaded models:', response.statusText);
			return [];
		}
		const data = await response.json();
		return data.models;
	},

	async pullModel(model: string): Promise<void> {
		const response = await fetch(`http://192.168.0.100:10000/api/pull`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				model: model,
				stream: true
			})
		});
		if (!response.body) {
			console.error('Failed to pull model:', response.statusText);
			throw new Error(`Failed to pull model: ${response.statusText}`);
		}

		const reader = response.body.getReader();
		const decoder = new TextDecoder();
		let buffer = '';

		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			buffer += decoder.decode(value, { stream: true });

			let lines = buffer.split('\n');

			// Keep the last partial line in buffer
			buffer = lines.pop() || '';

			for (const line of lines) {
				if (line.trim() === '') continue;
				try {
					const pullResponse: PullResponse = JSON.parse(line);
					pullingState.update(pullResponse);
				} catch (err) {
					console.warn('Failed to parse line:', line, err);
				}
			}
		}

		// In case there's a final partial line to parse
		if (buffer.trim()) {
			try {
				const pullResponse: PullResponse = JSON.parse(buffer);
				pullingState.update(pullResponse);
			} catch (err) {
				console.warn('Failed to parse last buffer:', buffer, err);
			}
		}
	},
	async deleteModel(model: string): Promise<void> {
		const response = await fetch(`http://192.168.0.100:10000/api/delete`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ model })
		});
		if (!response.ok) {
			console.error('Failed to delete model:', response.statusText);
			throw new Error(`Failed to delete model: ${response.statusText}`);
		}
		return Promise.resolve();
	},
	async loadModel(model: string): Promise<void> {
		const response = await fetch(`http://192.168.0.100:10000/api/generate`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				model: model
			})
		});
		if (!response.ok) {
			console.error('Failed to load model:', response.statusText);
			throw new Error(`Failed to load model: ${response.statusText}`);
		}
		let data = await response.json();
		if (data.error) {
			console.error('Error loading model:', data.error);
			throw new Error(`Error loading model: ${data.error}`);
		}
		if (data.done) {
			modelsState.loadedModel = modelsState.models.find((m) => m.model === model)?.model || '';
		}
	},
	async unloadModel(model: string): Promise<void> {
		const response = await fetch(`http://192.168.0.100:10000/api/generate`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				model: model,
				keep_alive: 0
			})
		});
		if (!response.ok) {
			console.error('Failed to unload model:', response.statusText);
			throw new Error(`Failed to unload model: ${response.statusText}`);
		} else {
			modelsState.loadedModel = '';
			return Promise.resolve();
		}
	}
};
