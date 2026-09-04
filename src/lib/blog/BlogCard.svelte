<script lang="ts">
	import type { PostListing } from '$lib/blog/posts';

	let { post }: { post: PostListing } = $props();

	function formatDate(iso: string): string {
		return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<article class="flex flex-col gap-2.5 rounded-2xl border border-text/20 bg-white/40 p-7">
	<p class="m-0 flex gap-2 text-caption tracking-wide opacity-80">
		<time datetime={post.date}>{formatDate(post.date)}</time>
		<span aria-hidden="true">·</span>
		<span>{post.readingMinutes} min read</span>
	</p>
	<h2 class="m-0">
		<a class="text-inherit no-underline hover:text-accent hover:underline hover:underline-offset-4" href="/blog/{post.slug}">{post.title}</a>
	</h2>
	<p class="m-0">{post.description}</p>
	{#if post.tags.length > 0}
		<ul class="m-0 mt-1 flex list-none flex-wrap gap-2 p-0" aria-label="Tags">
			{#each post.tags as tag (tag)}
				<li>
					<a class="inline-block rounded-full border border-text/30 px-3 py-0.5 text-caption text-inherit no-underline opacity-85 hover:border-accent hover:text-accent" href="/blog/tag/{tag}">{tag}</a>
				</li>
			{/each}
		</ul>
	{/if}
</article>
