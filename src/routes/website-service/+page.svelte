<script>
	const canonical = "https://doomkeybd.com/website-service";
	const title = "Website Service: One Clear Page That Sells | Doomkey";
	const description =
		"Facebook brings discovery but hides you from Google. We build a simple, fast website buyers trust: your products, prices, ordering, and contact. Live within days.";
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Service",
		name: "Doomkey Website Service",
		description,
		url: canonical,
		provider: { "@type": "Organization", name: "Doomkey", url: "https://doomkeybd.com" },
		areaServed: "Bangladesh"
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
		<div class="flex flex-col gap-4 py-16">
			<h1>Your Facebook page is rented land. A website is yours.</h1>
			<p>
				Buyers Google you before they buy. A Facebook page barely shows up, and it never
				fully convinces strangers. One clear page fixes both: what you sell, what it costs,
				how to order, how to reach you.
			</p>
			<div class="mt-2">
				<a href="#get-started" role="button" class="primary">Get my website</a>
			</div>
		</div>
	</section>

	<section>
		<div class="border-t py-12">
			<h2 class="mb-6">Why this matters</h2>
			<div class="grid gap-8 md:grid-cols-2">
				<p>
					Search traffic goes to websites, not shop tabs. Without a site, every "near me"
					search in your category sends buyers to competitors who have one.
				</p>
				<p>
					Strangers trust pages they control the look of: real prices, a return policy in
					writing, contact details that match everywhere. A page builds that trust in one visit.
				</p>
			</div>
		</div>
	</section>

	<section>
		<div class="border-t py-12">
			<h2 class="mb-6">What we build</h2>
			<div class="grid gap-6 sm:grid-cols-2">
				<div class="flex flex-col gap-2 rounded-lg border p-6">
					<h3>Selling on Facebook only?</h3>
					<p>Your page keeps bringing discovery. The site becomes the place it points to.</p>
				</div>
				<div class="flex flex-col gap-2 rounded-lg border p-6">
					<h3>No content ready?</h3>
					<p>Send photos and prices however you have them. We shape it into a clear page.</p>
				</div>
				<div class="flex flex-col gap-2 rounded-lg border p-6">
					<h3>No domain yet?</h3>
					<p>We help you pick one and set it up. Same deal as email: handled for you.</p>
				</div>
				<div class="flex flex-col gap-2 rounded-lg border p-6">
					<h3>Nothing technical</h3>
					<p>Fast, mobile-friendly, Google-readable. You get full access and plain guidance.</p>
				</div>
			</div>
		</div>
	</section>

	<section>
		<div class="border-t py-12">
			<h2 class="mb-6">How it works</h2>
			<ol class="m-0 grid list-none gap-6 p-0 sm:grid-cols-3">
				<li class="flex flex-col gap-2">
					<span class="flex h-8 w-8 items-center justify-center rounded-full border">1</span>
					<p>Tell us your business and send whatever you have: photos, prices, contact info.</p>
				</li>
				<li class="flex flex-col gap-2">
					<span class="flex h-8 w-8 items-center justify-center rounded-full border">2</span>
					<p>We build one clear page: products, ordering, contact. You review, we adjust.</p>
				</li>
				<li class="flex flex-col gap-2">
					<span class="flex h-8 w-8 items-center justify-center rounded-full border">3</span>
					<p>Launch on your domain within days. Full access handed over, nothing held back.</p>
				</li>
			</ol>
		</div>
	</section>

	<section>
		<div class="border-t py-12">
			<h2 class="mb-6">What you get</h2>
			<ul class="m-0 flex list-none flex-col gap-3 p-0">
				<li class="flex items-start gap-2">
					<span>✓</span><span>A page Google can find and buyers can trust</span>
				</li>
				<li class="flex items-start gap-2">
					<span>✓</span><span>Domain guidance if you don't have one yet</span>
				</li>
				<li class="flex items-start gap-2">
					<span>✓</span><span>Pairs with business email on the same domain</span>
				</li>
				<li class="flex items-start gap-2">
					<span>✓</span><span>Fast on phones, where your buyers actually are</span>
				</li>
				<li class="flex items-start gap-2">
					<span>✓</span><span>Full access handed to you, plain guidance included</span>
				</li>
			</ul>
		</div>
	</section>

	<section>
		<div class="border-t py-12 space-y-4">
			<h2 class="mb-6">Who this is for</h2>
			<ul class="m-0 flex list-none flex-col gap-3 p-0">
				<li class="flex items-start gap-2">
					<span>—</span><span
						>Facebook sellers whose growth stalled at the same follower count</span
					>
				</li>
				<li class="flex items-start gap-2">
					<span>—</span><span>Newly registered businesses that need to look real fast</span>
				</li>
				<li class="flex items-start gap-2">
					<span>—</span><span
						>Marketplace sellers paying commission on buyers they found themselves</span
					>
				</li>
			</ul>
		</div>
	</section>

	<section id="get-started">
		<div class="flex flex-col items-start gap-4 border-t py-16">
			<h2>Get started</h2>
			<p>Live within days. Nothing technical on your end. Tell us about your business and we take it from there.</p>
			<a
				href="https://www.facebook.com/doomkey.apps"
				target="_blank"
				rel="noreferrer"
				role="button"
				class="primary">Get my website</a
			>
		</div>
	</section>
</main>
