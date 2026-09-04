import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		mdsvex({
			// Disable mdsvex's built-in prism highlighter so code fences reach
			// rehype-pretty-code as plain pre>code elements.
			highlight: false,
			layout: { blog: new URL('./src/lib/blog/PostLayout.svelte', import.meta.url).pathname },
			remarkPlugins: [remarkGfm],
			rehypePlugins: [
				rehypeSlug,
				[
					rehypePrettyCode,
					{
						theme: 'github-dark',
						keepBackground: false
					}
				]
			]
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
