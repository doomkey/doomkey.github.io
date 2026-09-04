export interface PostMeta {
	title: string;
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
		console.warn(`[blog] ${slug}.svx missing required frontmatter (title, description, date) — skipped`);
		return null;
	}
	if (Number.isNaN(Date.parse(m.date))) {
		console.warn(`[blog] ${slug}.svx has unparsable date — skipped`);
		return null;
	}
	return {
		title: m.title,
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
