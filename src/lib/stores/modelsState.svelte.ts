import type { Model } from '$models/model';
import { ollama } from '$utils/ollama';

export const modelsState = $state({
	models: [] as Model[],
	isThinking: false,
	isLoading: false,
	loadedModel: '' as string,
	init(): void {
		this.refresh();
	},
	async refresh(): Promise<void> {
		try {
			this.models = await ollama.getModels();
			await this.getLoadedModel();
		} catch (error) {
			console.error('Failed to initialize models state:', error);
		}
	},
	async getLoadedModel() {
		try {
			ollama.getLoadedModels().then((models) => {
				if (!models || models.length === 0) {
					console.warn('No models loaded');
					this.loadedModel = '';
					return;
				}
				this.loadedModel = models[0].model || '';
				console.log('Loaded model:', this.loadedModel);
			});
		} catch (error) {
			console.error('Failed to get loaded model:', error);
			this.loadedModel = '';
		}
	},
	async loadModel(model: string): Promise<void> {
		try {
			this.loadedModel = '';
			this.isLoading = true;
			ollama.loadModel(model).then(() => {
				this.loadedModel = model;
				this.isLoading = false;
			});
		} catch (error) {
			console.error(`Failed to load model ${model}:`, error);
			this.isLoading = false;
			throw new Error(`Failed to load model: ${error}`);
		}
	}
});
