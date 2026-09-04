import { listPosts } from '$lib/blog/posts';

export const prerender = true;

const SITE = 'https://doomkeybd.com';

function escapeXml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

function toRfc822(iso: string): string {
	return new Date(iso + 'T00:00:00').toUTCString();
}

export function GET() {
	const posts = listPosts().slice(0, 50);
	const items = posts
		.map(
			(post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE}/blog/${post.slug}</link>
      <guid>${SITE}/blog/${post.slug}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${toRfc822(post.date)}</pubDate>
    </item>`
		)
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Doomkey Blog</title>
    <link>${SITE}/blog</link>
    <description>Notes from Doomkey on domains, business email, and running a real company online.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`;

	return new Response(xml, {
		headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' }
	});
}
