<script>
	import Contact from '$lib/components/fragments/home/Contact.svelte';
	import EmailService from '$lib/components/fragments/home/EmailService.svelte';
	import Hero from '$lib/components/fragments/home/Hero.svelte';
	import Projects from '$lib/components/fragments/home/Projects.svelte';

	const canonical = 'https://doomkeybd.com/';
	const title = 'Doomkey: Business Email, Websites, SEO + AEO for Small Business';
	const description =
		'Doomkey sets up business email, simple websites, and search presence for small businesses. Live within days. Nothing technical on your end.';
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Doomkey',
		url: canonical,
		logo: 'https://doomkeybd.com/logo.svg',
		description,
		sameAs: ['https://www.facebook.com/doomkey.apps'],
		contactPoint: {
			'@type': 'ContactPoint',
			email: 'contact@doomkeybd.com',
			url: 'https://doomkeybd.com/contact',
			contactType: 'sales'
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
	<Hero />
	<Projects />
	<EmailService/>
	<Contact />

</main>
