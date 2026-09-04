<script lang="ts">
	import { resolve } from '$app/paths';
	import BlogList from '$lib/blog/BlogList.svelte';

	let { data } = $props();

	const canonical = `https://doomkeybd.com/blog/page/${data.page}`;
</script>

<svelte:head>
	<title>Blog — page {data.page} — Doomkey</title>
	<meta name="description" content="Notes from Doomkey on domains, business email, and running a real company online." />
	<meta name="robots" content="noindex, follow" />
	<link rel="canonical" href={canonical} />
</svelte:head>

<main>
	<section>
		<div class="mx-auto flex max-w-narrow flex-col gap-4 py-16">
			<p class="m-0 text-overline font-semibold tracking-[0.12em] text-accent uppercase">
				Doomkey blog
			</p>
			<h1 class="m-0 text-balance">Notes on running a real company online</h1>
			<p class="m-0 text-body-xl">Page {data.page} of {data.totalPages}.</p>
		</div>
	</section>

	<section>
		<div class="mx-auto border-t border-text/20 py-12">
			<BlogList posts={data.posts} page={data.page} totalPages={data.totalPages} />
		</div>
	</section>
</main>
