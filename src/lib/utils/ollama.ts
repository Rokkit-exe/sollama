import { chatsState } from '$lib/stores/chatsState.svelte';
import type { StreamedResponse } from '$lib/models/StreamedResponse';
import type { Model } from '$lib/models/model';
import { pullingState } from '$lib/stores/pullingState.svelte';
import type { PullResponse } from '$lib/models/PullResponse';
import { modelsState } from '$lib/stores/modelsState.svelte';

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
		console.log('Models fetched:', data.models);
		return data.models;
	},
	async Chat(content: string) {
		chatsState.addMessage(chatsState.selected.id, content, 'user');
		chatsState.addMessage(chatsState.selected.id, '', 'assistant');
		if (!content.trim()) {
			console.warn('Empty message, not sending');
			return;
		}
		console.log('Sending message:', content);

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
				console.log('Stream finished');
				break;
			}
			let streamedResponse: StreamedResponse = JSON.parse(decoder.decode(value, { stream: true }));
			if (
				streamedResponse.message?.content === '<thinking>' ||
				streamedResponse.message?.content === '<think>'
			) {
				modelsState.isThinking = true;
			} else if (
				streamedResponse.message?.content === '</thinking>' ||
				streamedResponse.message?.content === '</think>'
			) {
				modelsState.isThinking = false;
			}
			if (!modelsState.isThinking) {
				buffer += streamedResponse.message?.content || '';
				chatsState.updateMessage(chatsState.selected.id, buffer);
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
		console.log('Loaded models fetched:', data.models);
		return data.models;
	},

	async pullModel(model: string): Promise<void> {
		const response = await fetch(`http://192.168.0.100:10000/api/pull`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				model: model,
				stream: true
			})
		});
		if (!response.body) {
			console.error('Failed to pull model:', response.statusText);
			throw new Error(`Failed to pull model: ${response.statusText}`);
		}
		console.log(`Pulling model: ${model}`);

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
					console.log('Pull response:', pullResponse);
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
		console.log(`Model ${model} deleted successfully`);
		return Promise.resolve();
	},
	async loadModel(model: string): Promise<void> {
		console.log(`Loading model: ${model}`);
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
			console.log(`Model ${model} unloaded successfully`);
			modelsState.loadedModel = '';
			return Promise.resolve();
		}
	}
};
