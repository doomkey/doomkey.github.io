import { listPosts } from '$lib/blog/posts';

export const prerender = true;

export function load() {
	return { posts: listPosts() };
}
