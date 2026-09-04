import { error } from '@sveltejs/kit';
import { postsForPage, totalPages } from '$lib/blog/posts';
import type { PageLoad } from './$types';

// 'auto': skipped silently while totalPages() is 1 (entries empty, nothing links
// here). Once entries exist, they are prerendered without crawler discovery.
export const prerender = 'auto';

export function entries() {
	const pages: { n: string }[] = [];
	for (let n = 2; n <= totalPages(); n++) pages.push({ n: String(n) });
	return pages;
}

export const load: PageLoad = ({ params }) => {
	const n = Number(params.n);
	const total = totalPages();
	if (!Number.isInteger(n) || n < 2 || n > total) throw error(404, 'Page not found');
	return { posts: postsForPage(n), page: n, totalPages: total };
};
