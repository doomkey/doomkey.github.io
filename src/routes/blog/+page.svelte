<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();

	function formatDate(iso: string): string {
		return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>Blog - Doomkey</title>
	<meta name="description" content="Notes from Doomkey on domains, business email, and running a real company online." />
	<link rel="canonical" href="https://doomkeybd.com/blog" />
</svelte:head>

<header>
	<div class="mx-auto flex max-w-section items-center justify-between px-5 py-4">
		<a href={resolve('/')}>Doomkey</a>
		<nav class="flex gap-4">
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
			<p class="m-0">
				<a class="text-sm text-accent underline underline-offset-[3px]" href={resolve('/blog/rss.xml')}>RSS feed</a>
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
						<li>
							<article class="flex flex-col gap-2.5 rounded-2xl border border-text/20 bg-white/40 p-7 ">
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
											<li class="rounded-full border border-text/30 px-3 py-0.5 text-caption opacity-85">{tag}</li>
										{/each}
									</ul>
								{/if}
							</article>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</section>
</main>
