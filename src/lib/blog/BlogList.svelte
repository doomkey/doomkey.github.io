<script lang="ts">
	import BlogCard from '$lib/blog/BlogCard.svelte';
	import type { PostListing } from '$lib/blog/posts';

	let {
		posts,
		page,
		totalPages
	}: {
		posts: PostListing[];
		page: number;
		totalPages: number;
	} = $props();

	function hrefFor(n: number): string {
		return n === 1 ? '/blog' : `/blog/page/${n}`;
	}
</script>

{#if posts.length === 0}
	<p>No posts yet. Check back soon.</p>
{:else}
	<ul class="m-0 flex list-none flex-col gap-6 p-0">
		{#each posts as post (post.slug)}
			<li><BlogCard {post} /></li>
		{/each}
	</ul>
{/if}

{#if totalPages > 1}
	<nav class="mt-10 flex flex-wrap items-center gap-2" aria-label="Blog pages">
		{#if page > 1}
			<a
				class="rounded-full border border-text/30 px-4 py-1 text-caption text-inherit no-underline opacity-85 hover:border-accent hover:text-accent"
				href={hrefFor(page - 1)}
				rel="prev">← Newer</a
			>
		{/if}
		{#each Array(totalPages) as _, i (i)}
			{@const n = i + 1}
			{#if n === page}
				<span
					class="rounded-full bg-text-alt px-4 py-1 text-caption text-bg"
					aria-current="page">{n}</span
				>
			{:else}
				<a
					class="rounded-full border border-text/30 px-4 py-1 text-caption text-inherit no-underline opacity-85 hover:border-accent hover:text-accent"
					href={hrefFor(n)}>{n}</a
				>
			{/if}
		{/each}
		{#if page < totalPages}
			<a
				class="rounded-full border border-text/30 px-4 py-1 text-caption text-inherit no-underline opacity-85 hover:border-accent hover:text-accent"
				href={hrefFor(page + 1)}
				rel="next">Older →</a
			>
		{/if}
	</nav>
{/if}
