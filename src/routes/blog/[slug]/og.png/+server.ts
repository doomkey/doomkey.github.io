import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { error } from '@sveltejs/kit';
import { getPost, listPosts } from '$lib/blog/posts';
import type { RequestHandler } from './$types';

export const prerender = true;

export function entries() {
	return listPosts().map((post) => ({ slug: post.slug }));
}

const W = 1200;
const H = 630;

let fontData: ArrayBuffer | null = null;

async function loadFont(): Promise<ArrayBuffer> {
	if (!fontData) {
		// static/ is project root at build time
		const buf = await readFile(join(process.cwd(), 'static', 'ProFont.ttf'));
		fontData = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
	}
	return fontData;
}

export const GET: RequestHandler = async ({ params }) => {
	const post = getPost(params.slug);
	if (!post) throw error(404, 'Post not found');

	const font = await loadFont();

	const svg = await satori(
		{
			type: 'div',
			props: {
				style: {
					width: `${W}px`,
					height: `${H}px`,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					gap: '24px',
					padding: '96px',
					backgroundColor: '#fde7f4',
					fontFamily: 'ProFont'
				},
				children: [
					{
						type: 'div',
						props: {
							style: { fontSize: '28px', letterSpacing: '6px', color: '#f12428', fontWeight: 700 },
							children: 'DOOMKEY BLOG'
						}
					},
					{
						type: 'div',
						props: {
							style: { fontSize: '72px', lineHeight: 1.15, color: '#3b2159', fontWeight: 700 },
							children: post.title.length > 80 ? post.title.slice(0, 80) + '…' : post.title
						}
					},
					{
						type: 'div',
						props: { style: { fontSize: '32px', color: '#7409e5' }, children: 'doomkeybd.com' }
					}
				]
			}
		} as never,
		{
			width: W,
			height: H,
			fonts: [{ name: 'ProFont', data: font, weight: 700, style: 'normal' }]
		}
	);

	const png = new Resvg(svg, { fitTo: { mode: 'width', value: W } }).render().asPng();

	return new Response(new Uint8Array(png), {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=86400'
		}
	});
};
