<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import BlogCard from '$lib/blog/BlogCard.svelte';
	import TocNav from '$lib/blog/TocNav.svelte';
	import type { TocEntry } from '$lib/blog/posts';

	let { data } = $props();

	// $derived: SvelteKit reuses this component instance when navigating
	// post → post, so plain consts would go stale after client-side nav.
	let Content = $derived(data.Content);
	let canonical = $derived(`https://doomkeybd.com/blog/${data.post.slug}`);
	let headTitle = $derived(`${data.post.seoTitle ?? data.post.title} — Doomkey`);
	let jsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: data.post.title,
		description: data.post.description,
		datePublished: data.post.date,
		...(data.post.updated ? { dateModified: data.post.updated } : {}),
		author: { '@type': 'Organization', name: data.post.author }
	});

	let toc: TocEntry[] = $derived(data.toc);
	let activeId = $state('');
	let progress = $state(0);
	let copied = $state(false);

	let shareText = $derived(`${data.post.title} — Doomkey`);
	let shareLinks = $derived([
		{ name: 'X', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(canonical)}` },
		{ name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonical)}` },
		{ name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonical)}` }
	]);

	async function copyLink() {
		try {
			await navigator.clipboard.writeText(canonical);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		} catch {
			copied = false;
		}
	}

	function formatDate(iso: string): string {
		return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	onMount(() => {
		const onScroll = () => {
			const doc = document.documentElement;
			const max = doc.scrollHeight - doc.clientHeight;
			progress = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	});

	// Re-observe headings on post → post navigation (component is reused).
	$effect(() => {
		const slug = data.post.slug;
		void slug;
		activeId = '';
		if (toc.length === 0) return;
		const headings = [...document.querySelectorAll('#post-body h2[id], #post-body h3[id]')];
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) activeId = entry.target.id;
				}
			},
			{ rootMargin: '-20% 0px -70% 0px' }
		);
		headings.forEach((h) => observer.observe(h));
		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>{headTitle}</title>
	<meta name="description" content={data.post.description} />
	<link rel="canonical" href={canonical} />
	<link rel="alternate" type="application/rss+xml" title="Doomkey Blog" href={resolve('/blog/rss.xml')} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.post.seoTitle ?? data.post.title} />
	<meta property="og:description" content={data.post.description} />
	<meta property="og:url" content={canonical} />
	{#if data.post.ogImage}
		<meta property="og:image" content={data.post.ogImage} />
	{:else}
		<meta property="og:image" content={`${canonical}/og.png`} />
	{/if}
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<div class="fixed inset-x-0 top-0 z-50 h-1 bg-transparent" aria-hidden="true">
	<div class="h-full bg-accent" style="width: {progress}%"></div>
</div>

<header>
	<div class="mx-auto flex max-w-section items-center justify-between px-5 py-4">
		<a href={resolve('/')}>Doomkey</a>
		<nav class="flex gap-4">
			<a href={resolve('/email-service')}>Email service</a>
			<a href={resolve('/blog')}>Blog</a>
		</nav>
	</div>
</header>

<main class="scroll-smooth px-4">
	<article class="mx-auto w-full max-w-post lg:max-w-[calc(68ch_+_15rem_+_3rem)]">
		<div class="mx-auto flex w-full max-w-post flex-col gap-4 py-14 lg:mx-0">
			<p class="m-0 flex flex-wrap gap-2 text-caption tracking-wide opacity-80">
				<time datetime={data.post.date}>{formatDate(data.post.date)}</time>
				{#if data.post.updated}
					<span>(updated <time datetime={data.post.updated}>{formatDate(data.post.updated)}</time>)</span>
				{/if}
				<span aria-hidden="true">·</span>
				<span>{data.post.readingMinutes} min read</span>
				<span aria-hidden="true">·</span>
				<span>by {data.post.author}</span>
			</p>
			<h1 class="m-0 text-balance">{data.post.title}</h1>
			<p class="m-0 text-body-xl opacity-90">{data.post.description}</p>
			{#if data.post.tags.length > 0}
				<ul class="m-0 flex list-none flex-wrap gap-2 p-0" aria-label="Tags">
					{#each data.post.tags as tag (tag)}
						<li>
							<a class="inline-block rounded-full border border-text/30 px-3 py-0.5 text-caption text-inherit no-underline opacity-85 hover:border-accent hover:text-accent" href="/blog/tag/{tag}">{tag}</a>
						</li>
					{/each}
				</ul>
			{/if}
		</div>

		{#if toc.length > 0}
			<div class="mb-8 lg:hidden">
				<TocNav {toc} {activeId} />
			</div>
		{/if}

		<div class="lg:grid lg:grid-cols-[minmax(0,68ch)_15rem] lg:gap-12">
		<div class="mx-auto w-full max-w-post min-w-0 lg:mx-0">
		<div id="post-body" class="border-t border-text/20 py-10">
			{#key data.post.slug}
				<Content />
			{/key}
		</div>

		<div class="flex flex-wrap items-center gap-3 border-t border-text/20 py-8">
			<span class="text-caption tracking-wide opacity-80">Share:</span>
			{#each shareLinks as link (link.name)}
				<a
					class="rounded-full border border-text/30 px-4 py-1 text-caption text-inherit no-underline opacity-85 hover:border-accent hover:text-accent"
					href={link.href}
					target="_blank"
					rel="noreferrer"> {link.name}</a
				>
			{/each}
			<button
				class="rounded-full border border-text/30 px-4 py-1 text-caption opacity-85 hover:border-accent"
				onclick={copyLink}>
				{copied ? 'Copied!' : 'Copy link'}
			</button>
		</div>

		{#if data.related.length > 0}
			<div class="border-t border-text/20 py-10">
				<h2 class="m-0 mb-6">Keep reading</h2>
				<ul class="m-0 flex list-none flex-col gap-6 p-0">
					{#each data.related as post (post.slug)}
						<li><BlogCard {post} /></li>
					{/each}
				</ul>
			</div>
		{/if}

		<div class="border-t border-text/20 py-8">
			<a class="text-accent underline underline-offset-[3px]" href={resolve('/blog')}>← All posts</a>
		</div>
		</div>

		{#if toc.length > 0}
			<aside class="hidden min-w-0 lg:block">
				<div class="sticky top-8 py-2">
					<TocNav {toc} {activeId} sidebar />
				</div>
			</aside>
		{/if}
		</div>
	</article>
</main>
