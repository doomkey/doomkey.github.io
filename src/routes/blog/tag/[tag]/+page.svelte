<script lang="ts">
	import { resolve } from '$app/paths';
	import BlogCard from '$lib/blog/BlogCard.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>#{data.tag} — Doomkey Blog</title>
	<meta name="description" content="Doomkey blog posts tagged {data.tag}." />
	<link rel="canonical" href="https://doomkeybd.com/blog/tag/{data.tag}" />
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
			<p class="m-0 text-overline font-semibold tracking-[0.12em] text-accent uppercase">Tag</p>
			<h1 class="m-0 text-balance">#{data.tag}</h1>
			<p class="m-0 text-body-xl opacity-90">
				{data.posts.length} {data.posts.length === 1 ? 'post' : 'posts'}
			</p>
		</div>
	</section>

	<section>
		<div class="mx-auto border-t border-text/20 py-12">
			<ul class="m-0 flex list-none flex-col gap-6 p-0">
				{#each data.posts as post (post.slug)}
					<li><BlogCard {post} /></li>
				{/each}
			</ul>
			<p class="mt-8">
				<a class="text-accent underline underline-offset-[3px]" href={resolve('/blog/tag')}>All tags</a>
				<span class="opacity-60"> · </span>
				<a class="text-accent underline underline-offset-[3px]" href={resolve('/blog')}>All posts</a>
			</p>
		</div>
	</section>
</main>
