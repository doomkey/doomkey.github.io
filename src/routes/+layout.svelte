<script lang="ts">
	// import '../reset.css';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { resolve } from '$app/paths';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<footer>
	<div class="mx-auto flex max-w-section items-center justify-between px-5 py-4">
		<span>Doomkey</span>
		<nav class="flex gap-4">
			<a href={resolve('/email-service')}>Email service</a>
			<a href={resolve('/blog')}>Blog</a>
		</nav>
	</div>
</footer>
