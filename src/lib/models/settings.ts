import type { Model } from '$lib/models/model';
export type Settings = {
	ollamaHost: string;
	ollamaModels: Model[];
	searxngHost: string;
	searxngSearchEngine: string[];
};
