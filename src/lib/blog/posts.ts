import GithubSlugger from 'github-slugger';

export interface PostMeta {
	title: string;
	seoTitle?: string;
	description: string;
	date: string;
	updated?: string;
	tags: string[];
	author: string;
	draft: boolean;
	ogImage?: string;
}

export interface PostListing extends PostMeta {
	slug: string;
	readingMinutes: number;
}

interface SvxModule {
	metadata?: Record<string, unknown>;
	default?: unknown;
}

const SLUG_RE = /^[a-z0-9-]+$/;

const modules = import.meta.glob<SvxModule>('/src/content/blog/*.svx', { eager: true });

const sources = import.meta.glob<string>('/src/content/blog/*.svx', {
	eager: true,
	query: '?raw',
	import: 'default'
});

function slugFromPath(path: string): string {
	const file = path.split('/').pop() ?? '';
	return file.replace(/\.svx$/, '');
}

function stripFrontmatter(raw: string): string {
	if (!raw.startsWith('---')) return raw;
	const end = raw.indexOf('---', 3);
	return end === -1 ? raw : raw.slice(end + 3);
}

function readingMinutesFor(text: string): number {
	const words = text.trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 200));
}

function parseMeta(slug: string, raw: unknown): PostMeta | null {
	if (!raw || typeof raw !== 'object') return null;
	const m = raw as Record<string, unknown>;
	if (typeof m.title !== 'string' || typeof m.description !== 'string' || typeof m.date !== 'string') {
		console.warn(`[blog] ${slug}.svx missing required frontmatter (title, description, date) - skipped`);
		return null;
	}
	if (Number.isNaN(Date.parse(m.date))) {
		console.warn(`[blog] ${slug}.svx has unparsable date - skipped`);
		return null;
	}
	return {
		title: m.title,
		seoTitle: typeof m.seoTitle === 'string' ? m.seoTitle : undefined,
		description: m.description,
		date: m.date,
		updated: typeof m.updated === 'string' ? m.updated : undefined,
		tags: Array.isArray(m.tags) ? m.tags.filter((t): t is string => typeof t === 'string') : [],
		author: typeof m.author === 'string' ? m.author : 'Doomkey',
		draft: m.draft === true,
		ogImage: typeof m.ogImage === 'string' ? m.ogImage : undefined
	};
}

function buildIndex(): PostListing[] {
	const posts: PostListing[] = [];
	for (const [path, mod] of Object.entries(modules)) {
		const slug = slugFromPath(path);
		if (!SLUG_RE.test(slug)) {
			console.warn(`[blog] skipped "${slug}": filename must be lowercase alphanumeric + hyphens`);
			continue;
		}
		const meta = parseMeta(slug, mod.metadata);
		if (!meta) continue;
		if (meta.draft && import.meta.env.PROD) continue;
		const raw = sources[path];
		const minutes = readingMinutesFor(typeof raw === 'string' ? stripFrontmatter(raw) : '');
		posts.push({ ...meta, slug, readingMinutes: minutes });
	}
	return posts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

let cache: PostListing[] | null = null;

export function listPosts(): PostListing[] {
	if (!cache) cache = buildIndex();
	return cache;
}

export function getPost(slug: string): PostListing | undefined {
	return listPosts().find((p) => p.slug === slug);
}

export interface TagCount {
	tag: string;
	count: number;
}

export function listTags(): TagCount[] {
	const counts = new Map<string, number>();
	for (const post of listPosts()) {
		for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
	}
	return [...counts.entries()]
		.map(([tag, count]) => ({ tag, count }))
		.sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function postsByTag(tag: string): PostListing[] {
	return listPosts().filter((p) => p.tags.includes(tag));
}

export const PAGE_SIZE = 6;

export function totalPages(): number {
	return Math.max(1, Math.ceil(listPosts().length / PAGE_SIZE));
}

export function postsForPage(page: number): PostListing[] {
	if (!Number.isInteger(page) || page < 1 || page > totalPages()) return [];
	const start = (page - 1) * PAGE_SIZE;
	return listPosts().slice(start, start + PAGE_SIZE);
}

export interface TocEntry {
	id: string;
	text: string;
	level: number;
}

export function relatedPosts(slug: string, limit = 3): PostListing[] {
	const current = getPost(slug);
	if (!current) return [];
	const tags = new Set(current.tags);
	return listPosts()
		.filter((p) => p.slug !== slug)
		.map((p) => ({ p, shared: p.tags.filter((t) => tags.has(t)).length }))
		.sort((a, b) => b.shared - a.shared || Date.parse(b.p.date) - Date.parse(a.p.date))
		.slice(0, limit)
		.map(({ p }) => p);
}

// Headings extracted from raw markdown so the TOC renders server-side.
// IDs use the same algorithm as rehype-slug (github-slugger), so anchors match.
export function extractToc(slug: string): TocEntry[] {
	const raw = sources[`/src/content/blog/${slug}.svx`];
	if (typeof raw !== 'string') return [];
	const slugger = new GithubSlugger();
	const toc: TocEntry[] = [];
	let inFence = false;
	for (const line of stripFrontmatter(raw).split('\n')) {
		const trimmed = line.trim();
		if (/^(`{3,}|~{3,})/.test(trimmed)) {
			inFence = !inFence;
			continue;
		}
		if (inFence) continue;
		const match = /^(#{2,3})\s+(.+)$/.exec(line);
		if (!match) continue;
		const text = match[2]
			.replace(/\s+#+\s*$/, '')
			.replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
			.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
			.replace(/[*_`~]/g, '')
			.trim();
		if (!text) continue;
		toc.push({ id: slugger.slug(text), text, level: match[1].length });
	}
	return toc;
}
