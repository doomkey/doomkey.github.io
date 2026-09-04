import { listPosts, listTags, postsByTag } from '$lib/blog/posts';

export const prerender = true;

const SITE = 'https://doomkeybd.com';

// Static pages with no frontmatter date: lastmod = build day (UTC).
function today(): string {
	return new Date().toISOString().slice(0, 10);
}

function url(loc: string, lastmod: string): string {
	return `  <url>\n    <loc>${SITE}${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
}

export function GET() {
	const day = today();
	const staticUrls = ['/', '/email-service', '/blog', '/blog/tag', '/demo', '/demo/paraglide'].map(
		(loc) => url(loc, day)
	);
	const postUrls = listPosts().map((post) =>
		url(`/blog/${post.slug}`, post.updated ?? post.date)
	);
	const tagUrls = listTags().map(({ tag }) => {
		// Tag page changes when its newest post changes.
		const newest = postsByTag(tag)[0];
		return url(`/blog/tag/${tag}`, (newest?.updated ?? newest?.date) || day);
	});

	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...staticUrls, ...postUrls, ...tagUrls].join('\n')}\n</urlset>\n`;

	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' }
	});
}
