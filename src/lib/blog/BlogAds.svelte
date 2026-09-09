<script lang="ts">
	import { onMount } from 'svelte';

	const POPUNDER_SRC =
		'https://pl31262371.profitableratecpmnetwork.com/63/92/09/639209e70ad0fff6f2ac09a5d74304fb.js';
	const SOCIALBAR_SRC =
		'https://pl31262372.profitableratecpmnetwork.com/9c/dc/a3/9cdca349be6a15b8cb077d3ea177ab07.js';

	function ensureScript(src: string): void {
		if (document.querySelector(`script[src="${src}"]`)) return;
		const el = document.createElement('script');
		el.src = src;
		// Keep provider snippet semantics (no async/defer added).
		document.head.appendChild(el);
	}

	onMount(() => {
		// <svelte:head> below covers SSG/prerender. This covers SPA
		// client-nav into /blog where head diffing may skip re-execution.
		ensureScript(POPUNDER_SRC);
		ensureScript(SOCIALBAR_SRC);
	});
</script>

<svelte:head>
	<script src={POPUNDER_SRC}></script>
	<script src={SOCIALBAR_SRC}></script>
</svelte:head>
