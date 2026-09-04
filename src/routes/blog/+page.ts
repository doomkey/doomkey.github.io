import { postsForPage, totalPages } from '$lib/blog/posts';

export const prerender = true;

export function load() {
	return { posts: postsForPage(1), page: 1, totalPages: totalPages() };
}
