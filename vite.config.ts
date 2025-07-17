import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	resolve: {
		alias: {
			$components: path.resolve('./src/lib/components'),
			$models: path.resolve('./src/lib/models')
			//$stores: path.resolve('./src/lib/stores')
		}
	}
});
