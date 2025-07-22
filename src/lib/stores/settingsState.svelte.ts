import type { Model } from '$lib/models/model';
import type { Settings } from '$lib/models/settings';

export const settingsState = $state({
	ollamaHost: 'http://192.168.0.100:10000',
	ollamaDefaultModel: 'llama3.2',
	ollamaModels: [] as Model[],
	searxngHost: 'http://localhost:8888',
	searxngSearchEngine: [] as string[]
});
