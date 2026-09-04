import { paraglideVitePlugin } from '@inlang/paraglide-js';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { svelteSitemap } from 'svelte-sitemap/vite';
export default defineConfig({
	plugins: [
		tailwindcss(),
    sveltekit(),
		svelteSitemap({ domain: 'https://doomkeybd.com' }),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide'
		})
	]
});
