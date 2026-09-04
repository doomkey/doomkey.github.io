import { error } from '@sveltejs/kit';
import { listTags, postsByTag } from '$lib/blog/posts';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
	return listTags().map(({ tag }) => ({ tag }));
}

export const load: PageLoad = ({ params }) => {
	const posts = postsByTag(params.tag);
	if (posts.length === 0) throw error(404, 'Tag not found');
	return { tag: params.tag, posts };
};
