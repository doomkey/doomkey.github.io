import { listPosts, listTags, postsByTag } from '$lib/blog/posts';

export const prerender = true;

const SITE = 'https://doomkeybd.com';

// Static pages: derived from route files, so new pages are listed automatically.
// Param routes ([slug], [tag]) and endpoints (+server.ts) are excluded here —
// posts and tags come from frontmatter below with real dates.
const pageModules = import.meta.glob('/src/routes/**/+page.svelte', { eager: true });

function pathToUrl(path: string): string | null {
	// /src/routes/demo/+page.svelte -> /demo ; skip param segments like [slug]
	const rel = path.replace(/^\/src\/routes/, '').replace(/\/\+page\.svelte$/, '') || '/';
	if (rel.split('/').some((seg) => seg.startsWith('['))) return null;
	return rel;
}

function today(): string {
	return new Date().toISOString().slice(0, 10);
}

function url(loc: string, lastmod: string): string {
	return `  <url>\n    <loc>${SITE}${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
}

export function GET() {
	const day = today();
	// Static pages: lastmod = build day (no frontmatter date available).
	const staticUrls = Object.keys(pageModules)
		.map(pathToUrl)
		.filter((loc): loc is string => loc !== null)
		.sort()
		.map((loc) => url(loc, day));
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
