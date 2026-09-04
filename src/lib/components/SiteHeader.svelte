<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	interface ServiceLink {
		label: string;
		href: '/email-service' | '/website-service';
		blurb: string;
	}

	// Add future services here — no layout changes needed.
	const services: ServiceLink[] = [
		{
			label: 'Email service',
			href: '/email-service',
			blurb: 'Business email on your own domain'
		},
		{
			label: 'Website service',
			href: '/website-service',
			blurb: 'One clear page that sells'
		}
	];

	const CONTACT_URL = 'https://www.facebook.com/doomkey.apps';

	let mobileOpen = $state(false);
	let servicesOpen = $state(false);
	let scrolled = $state(false);

	let pathname = $derived(page.url.pathname);
	let onServices = $derived(services.some((s) => pathname === s.href));
	let onBlog = $derived(pathname === '/blog' || pathname.startsWith('/blog/'));

	function closeAll() {
		mobileOpen = false;
		servicesOpen = false;
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') closeAll();
	}

	function onScroll() {
		scrolled = window.scrollY > 8;
	}

	onMount(() => {
		onScroll();
	});
</script>

<svelte:window onkeydown={onKeydown} onscroll={onScroll} />

{#if servicesOpen}
	<button
		class="fixed inset-0 z-40 cursor-default border-0 bg-transparent p-0"
		aria-hidden="true"
		tabindex={-1}
		onclick={closeAll}></button>
{/if}

<header
	class="sticky top-0 z-40 transition-colors duration-200 {scrolled || mobileOpen
		? 'border-b border-text/15 bg-bg/90 backdrop-blur'
		: 'border-b border-transparent bg-transparent'}">
	<div class="mx-auto flex max-w-section items-center justify-between gap-4 px-5 py-3">
		<a href={resolve('/')} class="text-lg font-bold text-text-alt no-underline">Doomkey</a>

		<!-- Desktop nav -->
		<nav class="hidden items-center gap-6 md:flex" aria-label="Primary">
			<div class="relative z-50">
				<button
					class="inline-flex items-center gap-1 border-0 bg-transparent p-0 {onServices
						? 'font-semibold text-accent'
						: 'text-text'}"
					aria-expanded={servicesOpen}
					aria-haspopup="true"
					onclick={() => (servicesOpen = !servicesOpen)}>
					Services
					<span aria-hidden="true" class="text-xs">{servicesOpen ? '▴' : '▾'}</span>
				</button>
				{#if servicesOpen}
					<div
						class="absolute left-0 top-full z-50 mt-2 w-72 rounded-xl border border-text/20 bg-bg p-2 shadow-xl">
						{#each services as service (service.href)}
							<a
								href={resolve(service.href)}
								class="block rounded-lg px-3 py-2 no-underline hover:bg-text/5"
								onclick={closeAll}>
								<span class="block font-semibold text-text-alt">{service.label}</span>
								<span class="block text-caption opacity-80">{service.blurb}</span>
							</a>
						{/each}
					</div>
				{/if}
			</div>
			<a
				href={resolve('/blog')}
				class="no-underline hover:underline hover:underline-offset-4 {onBlog
					? 'font-semibold text-accent'
					: ''}">Blog</a
			>
			<a href={CONTACT_URL} target="_blank" rel="noreferrer" role="button" class="primary text-sm">
				Get started
			</a>
		</nav>

		<!-- Mobile toggle -->
		<button
			class="border-0 bg-transparent p-2 text-xl leading-none text-text md:hidden"
			aria-expanded={mobileOpen}
			aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
			onclick={() => (mobileOpen = !mobileOpen)}>
			{mobileOpen ? '✕' : '☰'}
		</button>
	</div>

	<!-- Mobile panel -->
	{#if mobileOpen}
		<nav class="border-t border-text/15 px-5 py-4 md:hidden" aria-label="Mobile">
			<p class="m-0 mb-2 text-overline font-semibold tracking-[0.12em] text-accent uppercase">
				Services
			</p>
			<ul class="m-0 mb-4 flex list-none flex-col gap-3 p-0">
				{#each services as service (service.href)}
					<li>
						<a
							href={resolve(service.href)}
							class="no-underline {pathname === service.href
								? 'font-semibold text-accent'
								: ''}"
							onclick={closeAll}>{service.label}</a
						>
					</li>
				{/each}
			</ul>
			<a
				href={resolve('/blog')}
				class="mb-4 block no-underline {onBlog ? 'font-semibold text-accent' : ''}"
				onclick={closeAll}>Blog</a
			>
			<a href={CONTACT_URL} target="_blank" rel="noreferrer" role="button" class="primary text-sm">
				Get started
			</a>
		</nav>
	{/if}
</header>
