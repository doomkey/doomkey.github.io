<script lang="ts">
	import BlogAds from '$lib/blog/BlogAds.svelte';

	let { children } = $props();

	const SMARTLINK_HREF =
		'https://www.profitableratecpmnetwork.com/msey3vh73g?key=4f58d20642ff3dbc394a135f375d4b20';
</script>

<BlogAds />

{@render children()}

<div class="mx-auto max-w-narrow px-4 pb-10">
	<p class="m-0 text-caption opacity-60">
		<a href={SMARTLINK_HREF} rel="sponsored nofollow noopener" target="_blank">Sponsored</a>
	</p>
</div>
