import { listTags } from '$lib/blog/posts';

export const prerender = true;

export function load() {
	return { tags: listTags() };
}
