<script>
	import { resolve } from '$app/paths';

	const canonical = 'https://doomkeybd.com/about';
	const title = 'About Doomkey: Business Email, Websites, SEO + AEO';
	const description =
		'Doomkey is an apps and services studio in Bangladesh. We set up business email, simple websites, and search presence for small businesses. Nothing technical on your end.';
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'AboutPage',
		name: 'About Doomkey',
		description,
		url: canonical,
		mainEntity: {
			'@type': 'Organization',
			name: 'Doomkey',
			url: 'https://doomkeybd.com',
			logo: 'https://doomkeybd.com/logo.svg',
			sameAs: ['https://www.facebook.com/doomkey.apps'],
			contactPoint: {
				'@type': 'ContactPoint',
				email: 'contact@doomkeybd.com',
				url: 'https://doomkeybd.com/contact',
				contactType: 'sales'
			}
		}
	};
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<main>
	<section>
		<div class="mx-auto flex w-full max-w-narrow flex-col gap-4 py-16">
			<p class="m-0 text-overline font-semibold tracking-[0.12em] text-accent uppercase">About</p>
			<h1 class="m-0 text-balance">Doomkey sets up the digital basics small businesses skip.</h1>
			<p class="m-0 text-body-xl opacity-90">
				Doomkey is an apps and services studio based in Bangladesh. We build apps, and we
				set up business email, websites, and search presence for small businesses that
				live on Facebook and Gmail today.
			</p>
		</div>
	</section>

	<section>
		<div class="mx-auto w-full max-w-narrow border-t border-text/20 py-12">
			<h2 class="m-0 mb-6">What we do</h2>
			<ul class="m-0 flex list-none flex-col gap-6 p-0">
				<li>
					<h3 class="m-0 mb-1">Business email</h3>
					<p class="m-0">
						Professional addresses on your own domain, like hello@yourbusiness.com. Set
						up and sending within a day.
						<a href={resolve('/email-service')} class="text-accent underline underline-offset-[3px]"
							>Email service</a
						>.
					</p>
				</li>
				<li>
					<h3 class="m-0 mb-1">Websites</h3>
					<p class="m-0">
						One clear page buyers and Google can trust: products, prices, ordering,
						contact. Live within days.
						<a
							href={resolve('/website-service')}
							class="text-accent underline underline-offset-[3px]">Website service</a
						>.
					</p>
				</li>
				<li>
					<h3 class="m-0 mb-1">SEO + AEO</h3>
					<p class="m-0">
						Business profile, consistent listings, and a site Google and AI assistants
						can read, so buyers find you and answers recommend you.
						<a href={resolve('/seo-service')} class="text-accent underline underline-offset-[3px]"
							>SEO + AEO service</a
						>.
					</p>
				</li>
			</ul>
		</div>
	</section>

	<section>
		<div class="mx-auto w-full max-w-narrow border-t border-text/20 py-12">
			<h2 class="m-0 mb-6">How we work</h2>
			<p class="m-0">
				Our customers are not technical and don't want to become technical. Every service
				is handled for you: we set it up, hand over full access, and explain what changed
				in plain language. Nothing held back, nothing held hostage.
			</p>
		</div>
	</section>

	<section>
		<div class="mx-auto flex w-full max-w-narrow flex-col items-start gap-4 border-t border-text/20 py-16">
			<h2 class="m-0">Talk to us</h2>
			<p class="m-0">
				Tell us about your business through our contact form. We reply within a day.
			</p>
			<a href={resolve('/contact')} role="button" class="primary">Contact Doomkey</a>
		</div>
	</section>
</main>
