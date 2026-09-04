<script lang="ts">
	// import '../reset.css';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { resolve } from '$app/paths';
	import SiteHeader from '$lib/components/SiteHeader.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<SiteHeader />

{@render children()}

<footer class="border-t border-text/15">
	<div class="mx-auto grid max-w-section gap-10 px-5 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
		<div class="flex flex-col gap-3">
			<a href={resolve('/')} class="text-lg font-bold text-text-alt no-underline">Doomkey</a>
			<p class="m-0 max-w-[38ch] text-caption opacity-80">
				Apps and services that scale.
			</p>
			<a href={resolve('/contact')} role="button" class="primary mt-2 self-start text-sm"
				>Get started</a
			>
		</div>
		<nav aria-label="Services">
			<p class="m-0 mb-3 text-overline font-semibold tracking-[0.12em] text-accent uppercase">
				Services
			</p>
			<ul class="m-0 flex list-none flex-col gap-2 p-0">
				<li>
					<a href={resolve('/email-service')} class="no-underline hover:underline hover:underline-offset-4"
						>Email service</a
					>
				</li>
				<li>
					<a href={resolve('/website-service')} class="no-underline hover:underline hover:underline-offset-4"
						>Website service</a
					>
				</li>
				<li>
					<a href={resolve('/seo-service')} class="no-underline hover:underline hover:underline-offset-4"
						>SEO + AEO service</a
					>
				</li>
			</ul>
		</nav>
		<nav aria-label="Explore">
			<p class="m-0 mb-3 text-overline font-semibold tracking-[0.12em] text-accent uppercase">
				Explore
			</p>
			<ul class="m-0 flex list-none flex-col gap-2 p-0">
				<li>
					<a href={resolve('/about')} class="no-underline hover:underline hover:underline-offset-4"
						>About</a
					>
				</li>
				<li>
					<a href={resolve('/blog')} class="no-underline hover:underline hover:underline-offset-4"
						>Blog</a
					>
				</li>
				<li>
					<a href={resolve('/blog/rss.xml')} class="no-underline hover:underline hover:underline-offset-4"
						>RSS feed</a
					>
				</li>
			</ul>
		</nav>
	</div>
	<div class="border-t border-text/15">
		<div
			class="mx-auto flex max-w-section flex-col gap-1 px-5 py-4 text-caption opacity-70 sm:flex-row sm:items-center sm:justify-between">
			<span>© {new Date().getFullYear()} Doomkey. All rights reserved.</span>
			<span>Business email · Websites · Setup, handled.</span>
		</div>
	</div>
</footer>
