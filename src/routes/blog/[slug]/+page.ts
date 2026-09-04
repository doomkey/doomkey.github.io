import { error } from '@sveltejs/kit';
import { getPost, listPosts } from '$lib/blog/posts';
import type { Component } from 'svelte';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
	return listPosts().map((post) => ({ slug: post.slug }));
}

export const load: PageLoad = async ({ params }) => {
	const post = getPost(params.slug);
	if (!post) throw error(404, 'Post not found');
	// Vite code-splits each post; universal load re-runs on the client
	// after hydration, so the component never crosses the
	// server→client serialization boundary as raw data.
	const mod = (await import(`../../../content/blog/${params.slug}.svx`)) as {
		default: Component;
	};
	return { post, Content: mod.default };
};
