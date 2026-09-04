<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();

	const Content = data.Content;
	const canonical = `https://doomkeybd.com/blog/${data.post.slug}`;
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: data.post.title,
		description: data.post.description,
		datePublished: data.post.date,
		author: { '@type': 'Organization', name: data.post.author }
	};

	function formatDate(iso: string): string {
		return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>{data.post.title} — Doomkey</title>
	<meta name="description" content={data.post.description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.post.title} />
	<meta property="og:description" content={data.post.description} />
	<meta property="og:url" content={canonical} />
	{#if data.post.ogImage}
		<meta property="og:image" content={data.post.ogImage} />
	{/if}
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<header>
	<div class="mx-auto flex max-w-section items-center justify-between px-5 py-4">
		<a href={resolve('/')}>Doomkey</a>
		<nav class="flex gap-4">
			<a href={resolve('/email-service')}>Email service</a>
			<a href={resolve('/blog')}>Blog</a>
		</nav>
	</div>
</header>

<main>
	<article class="mx-auto max-w-post">
		<div class="flex flex-col gap-4 py-14">
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
						<li class="rounded-full border border-text/30 px-3 py-0.5 text-caption opacity-85">{tag}</li>
					{/each}
				</ul>
			{/if}
		</div>

		<div class="border-t border-text/20 py-10">
			<Content />
		</div>

		<div class="border-t border-text/20 py-8">
			<a class="text-accent underline underline-offset-[3px]" href={resolve('/blog')}>← All posts</a>
		</div>
	</article>
</main>
