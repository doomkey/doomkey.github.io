<script lang="ts">
	import { resolve } from '$app/paths';
	import BlogCard from '$lib/blog/BlogCard.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Blog — Doomkey</title>
	<meta name="description" content="Notes from Doomkey on domains, business email, and running a real company online." />
	<link rel="canonical" href="https://doomkeybd.com/blog" />
	<link rel="alternate" type="application/rss+xml" title="Doomkey Blog" href={resolve('/blog/rss.xml')} />
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
	<section>
		<div class="mx-auto flex max-w-narrow flex-col gap-4 py-16">
			<p class="m-0 text-overline font-semibold tracking-[0.12em] text-accent uppercase">
				Doomkey blog
			</p>
			<h1 class="m-0 text-balance">Notes on running a real company online</h1>
			<p class="m-0 text-body-xl">Domains, business email, and the small setups that make a business look established.</p>
			<p class="m-0">
				<a class="text-sm text-accent underline underline-offset-[3px]" href={resolve('/blog/rss.xml')}>RSS feed</a>
				<span class="opacity-60"> · </span>
				<a class="text-sm text-accent underline underline-offset-[3px]" href={resolve('/blog/tag')}>Browse by tag</a>
			</p>
		</div>
	</section>

	<section>
		<div class="mx-auto border-t border-text/20 py-12">
			{#if data.posts.length === 0}
				<p>No posts yet. Check back soon.</p>
			{:else}
				<ul class="m-0 flex list-none flex-col gap-6 p-0">
					{#each data.posts as post (post.slug)}
						<li><BlogCard {post} /></li>
					{/each}
				</ul>
			{/if}
		</div>
	</section>
</main>
