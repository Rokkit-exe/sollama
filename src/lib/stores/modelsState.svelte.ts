import { Status } from '$lib/models/Status';
import type { Model } from '$models/model';
import { ollama } from '$utils/ollama';
import { chatsState } from './chatsState.svelte';
import { settingsState } from './settingsState.svelte';

export const modelsState = $state({
	models: [] as Model[],
	status: Status.NotLoaded,
	statusDetails: '',
	loadedModel: '' as string,
	async getModels(): Promise<void> {
		ollama
			.getModels()
			.then((models) => {
				this.models = models;
				if (chatsState.selected) {
					chatsState.selected.model = settingsState.ollama.DefaultModel;
				}
			})
			.catch((error) => {
				console.error('Failed to fetch models:', error);
				this.models = [];
			});
	},
	async getLoadedModel() {
		ollama
			.getLoadedModels()
			.then((models) => {
				if (!models || models.length === 0) {
					this.loadedModel = '';
					return;
				}
				this.loadedModel = settingsState.ollama.DefaultModel;
			})
			.catch((error) => {
				console.error('Failed to fetch loaded model:', error);
				this.loadedModel = '';
			});
	},
	async loadModel(model: string): Promise<void> {
		try {
			this.loadedModel = '';
			this.status = Status.Loading;
			ollama.loadModel(model).then(() => {
				this.loadedModel = model;
				this.status = Status.Idle;
			});
		} catch (error) {
			console.error(`Failed to load model ${model}:`, error);
			this.status = Status.NotLoaded;
			throw new Error(`Failed to load model: ${error}`);
		}
	}
});
