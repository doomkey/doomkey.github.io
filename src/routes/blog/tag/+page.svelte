<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();
</script>

<svelte:head>
	<title>Tags — Doomkey Blog</title>
	<meta name="description" content="Browse Doomkey blog posts by tag." />
	<link rel="canonical" href="https://doomkeybd.com/blog/tag" />
</svelte:head>

<main>
	<section>
		<div class="mx-auto flex max-w-narrow flex-col gap-4 py-16">
			<p class="m-0 text-overline font-semibold tracking-[0.12em] text-accent uppercase">Browse by tag</p>
			<h1 class="m-0 text-balance">Tags</h1>
		</div>
	</section>

	<section>
		<div class="mx-auto border-t border-text/20 py-12">
			{#if data.tags.length === 0}
				<p>No tags yet.</p>
			{:else}
				<ul class="m-0 flex list-none flex-wrap gap-3 p-0">
					{#each data.tags as { tag, count } (tag)}
						<li>
							<a
								class="inline-block rounded-full border border-text/30 px-5 py-2 text-body-xl text-inherit no-underline hover:border-accent hover:text-accent"
								href="/blog/tag/{tag}">{tag} · {count}</a
							>
						</li>
					{/each}
				</ul>
			{/if}
			<p class="mt-8">
				<a class="text-accent underline underline-offset-[3px]" href={resolve('/blog')}>← All posts</a>
			</p>
		</div>
	</section>
</main>
