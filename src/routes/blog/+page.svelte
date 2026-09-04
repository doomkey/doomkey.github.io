<script lang="ts">
	import { resolve } from '$app/paths';
	import BlogList from '$lib/blog/BlogList.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Blog - Doomkey</title>
	<meta name="description" content="Notes from Doomkey on domains, business email, and running a real company online." />
	<link rel="canonical" href="https://doomkeybd.com/blog" />
	<link rel="alternate" type="application/rss+xml" title="Doomkey Blog" href="https://doomkeybd.com/blog/rss.xml" />
</svelte:head>

<main>
	<section>
		<div class="mx-auto flex max-w-narrow flex-col gap-4 py-16">
			<p class="m-0 text-overline font-semibold tracking-[0.12em] text-accent uppercase">
				Doomkey blog
			</p>
			<h1 class="m-0 text-balance">Notes on running a real company online</h1>
			<p class="m-0 text-body-xl">Domains, business email, and the small setups that make a business look established.</p>
			<p class="m-0">
				<a class="text-sm text-accent underline underline-offset-[3px]" href="/blog/rss.xml">RSS feed</a>
				<span class="opacity-60"> · </span>
				<a class="text-sm text-accent underline underline-offset-[3px]" href={resolve('/blog/tag')}>Browse by tag</a>
			</p>
		</div>
	</section>

	<section>
		<div class="mx-auto border-t border-text/20 py-12">
			<BlogList posts={data.posts} page={data.page} totalPages={data.totalPages} />
		</div>
	</section>
</main>
