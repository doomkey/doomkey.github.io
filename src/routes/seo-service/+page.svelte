<script>
	import { resolve } from "$app/paths";

	const canonical = "https://doomkeybd.com/seo-service";
	const title = "SEO + AEO Service: Get Found and Recommended | Doomkey";
	const description =
		"Buyers ask Google and AI assistants who to trust. We set up your presence so both recommend you: business profile, consistent facts everywhere, reviews, and a site machines can read.";
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Service",
		name: "Doomkey SEO + AEO Service",
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
			<h1>When buyers ask AI who to trust, make sure it's you.</h1>
			<p>
				Search changed. Buyers still Google, but now they also ask ChatGPT, Gemini, and
				AI Overviews: "best tailor near me," "trusted cake shop Dhanmondi." Those answers
				come from business profiles, reviews, and facts machines can read. We set all of
				it up, so humans and AI both recommend you.
			</p>
			<div class="mt-2">
				<a href="#how-it-works" role="button" class="primary">See how it works</a>
			</div>
		</div>
	</section>

	<section>
		<div class="border-t py-12">
			<h2 class="mb-6">Why this matters</h2>
			<div class="grid gap-8 md:grid-cols-2">
				<p>
					"Near me" searches still decide where local money goes. Now AI answers decide
					it too, and they cite businesses with complete profiles, steady reviews, and
					matching facts everywhere. No setup, no mention. Invisible twice over.
				</p>
				<p>
					Reviews compound in both worlds. A profile with steady, answered reviews
					outranks rivals on Google and gets cited by AI assistants, month after month,
					with zero ad spend. Setup once, recommended always.
				</p>
			</div>
		</div>
	</section>

	<section>
		<div class="border-t py-12">
			<h2 class="mb-6">What we set up</h2>
			<div class="grid gap-6 sm:grid-cols-2">
				<div class="flex flex-col gap-2 rounded-lg border p-6">
					<h3>Google Business Profile</h3>
					<p>Claimed, completed, verified. Categories, hours, photos, products. AI answers pull from here first.</p>
				</div>
				<div class="flex flex-col gap-2 rounded-lg border p-6">
					<h3>Consistent facts everywhere</h3>
					<p>Same name, address, and phone everywhere machines check. Assistants trust businesses that agree with themselves.</p>
				</div>
				<div class="flex flex-col gap-2 rounded-lg border p-6">
					<h3>A site machines can read</h3>
					<p>Structured data, clear titles, Q&A content written the way people actually ask. Built for search and answer engines both. No site yet? We build that too: <a href={resolve("/website-service")}>website service</a>.</p>
				</div>
				<div class="flex flex-col gap-2 rounded-lg border p-6">
					<h3>Review engine</h3>
					<p>Steady, answered reviews. They rank you on Google and get quoted by AI. One routine, fitted to your day.</p>
				</div>
			</div>
		</div>
	</section>

	<section id="how-it-works">
<section>
		<div class="border-t py-12">
			<h2 class="mb-6">How it works</h2>
			<ol class="m-0 grid list-none gap-6 p-0 sm:grid-cols-3">
				<li class="flex flex-col gap-2">
					<span class="flex h-8 w-8 items-center justify-center rounded-full border">1</span>
					<p>We audit where you stand: profile, listings, site, reviews, and what AI says about you today.</p>
				</li>
				<li class="flex flex-col gap-2">
					<span class="flex h-8 w-8 items-center justify-center rounded-full border">2</span>
					<p>We fix everything: claim and complete the profile, align facts, structure the site for search and answers.</p>
				</li>
				<li class="flex flex-col gap-2">
					<span class="flex h-8 w-8 items-center justify-center rounded-full border">3</span>
					<p>You get a short maintenance routine. A few minutes a week keeps it compounding.</p>
				</li>
			</ol>
		</div>
	</section>

	<section>
		<div class="border-t py-12">
			<h2 class="mb-6">What you get</h2>
			<ul class="m-0 flex list-none flex-col gap-3 p-0">
				<li class="flex items-start gap-2">
					<span>✓</span><span>A complete, verified Google Business Profile</span>
				</li>
				<li class="flex items-start gap-2">
					<span>✓</span><span>Facts matched everywhere machines look</span>
				</li>
				<li class="flex items-start gap-2">
					<span>✓</span><span>Site pages search and AI can actually read</span>
				</li>
				<li class="flex items-start gap-2">
					<span>✓</span><span>A review routine that fits your day</span>
				</li>
				<li class="flex items-start gap-2">
					<span>✓</span><span>Plain report of what changed and why</span>
				</li>
			</ul>
		</div>
	</section>

	<section>
		<div class="border-t py-12 space-y-4">
			<h2 class="mb-6">Who this is for</h2>
			<ul class="m-0 flex list-none flex-col gap-3 p-0">
				<li class="flex items-start gap-2">
					<span>-</span><span
						>Shops buyers can't find by name on Google or Maps</span
					>
				</li>
				<li class="flex items-start gap-2">
					<span>-</span><span>Businesses with happy buyers and zero reviews to show for it</span>
				</li>
				<li class="flex items-start gap-2">
					<span>-</span><span
						>Anyone paying for reach while free search traffic goes to competitors</span
					>
				</li>
			</ul>
		</div>
	</section>

	<section id="get-started">
		<div class="flex flex-col items-start gap-4 border-t py-16">
			<h2>Get started</h2>
			<p>Tell us your business name and area. We check what Google and AI say about you today, free, and show the gaps before you pay anything.</p>
			<a href={resolve("/contact")} role="button" class="primary">Get recommended everywhere</a>
		</div>
	</section>
</main>
