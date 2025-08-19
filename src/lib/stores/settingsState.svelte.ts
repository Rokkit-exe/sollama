import type { Model } from '$models/model';
import type { Tool } from '$models/Tool';

export const settingsState = $state({
	selectedSection: 'ollama',
	ollama: {
		host: 'http://192.168.0.100:10000',
		DefaultModel: 'mistral-nemo:latest',
		models: [] as Model[],
		defaultSystemPrompt: 'You are a helpful assistant.',
		isThinking: true
	},
	searxng: {
		host: 'http://localhost:8888',
		selectedEngines: ['google', 'brave', 'duckduckgo'] as string[],
		searchEngines: ['google', 'brave', 'duckduckgo', 'bing', 'mojeek', 'yahoo'] as string[]
	},
	tools: [] as Tool[]
});
