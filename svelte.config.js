import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';

// mdsvex bundles an old mdast-util-to-hast whose code handler drops `meta`,
// so fence options like title="..." never reach rehype-pretty-code (it reads
// element.data.meta or properties.metastring). Smuggle meta through as an
// hProperty, which to-hast applies to the element properties.
function remarkCodeMeta() {
	return (tree) => {
		const visit = (node) => {
			if (node.type === 'code' && node.meta) {
				const data = node.data || {};
				node.data = {
					...data,
					hProperties: { ...(data.hProperties || {}), metastring: node.meta }
				};
			}
			for (const child of node.children || []) visit(child);
		};
		visit(tree);
	};
}

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
			remarkPlugins: [remarkGfm, remarkCodeMeta],
			rehypePlugins: [
				rehypeSlug,
				[
					rehypePrettyCode,
				{
					// Rich dark palette (tags/attrs/strings each distinct)
					// so code reads as colored, not two-hue.
					theme: 'dracula',
					// Let shiki paint its own background so the palette
					// renders as designed instead of on our purple override.
					keepBackground: true
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
