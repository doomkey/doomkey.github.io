import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		mdsvex({
			layout: { blog: new URL('./src/lib/blog/PostLayout.svelte', import.meta.url).pathname },
			remarkPlugins: [remarkGfm],
			rehypePlugins: [rehypeSlug]
		})
	],
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			strict: false
		}),
		paths: {
			base: ''
		},
		prerender: { handleHttpError: 'warn', handleMissingId: 'warn' }
	},
	extensions: ['.svelte', '.svx']
};

export default config;
