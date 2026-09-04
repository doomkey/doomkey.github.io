<script>
	import { resolve } from "$app/paths";

	const canonical = "https://doomkeybd.com/email-service";
	const title = "Email Service: Business Email on Your Domain | Doomkey";
	const description =
		"A Gmail address makes a real business look unfinished. We move your email onto your own domain: inbox, mobile app, verification-ready. Set up and sending within a day.";
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Service",
		name: "Doomkey Email Service",
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
			<h1>A Gmail address makes a real business look unfinished.</h1>
			<p>
				An @gmail.com address reads like a side project. An address on your own domain reads like a
				real company. Already own the domain? We move your email onto it.
			</p>
			<div class="mt-2">
				<a href="#how-it-works" role="button" class="primary">See how email setup works</a>
			</div>
		</div>
	</section>

	<section>
		<div class="border-t py-12">
			<h2 class="mb-6">Why this matters</h2>
			<div class="grid gap-8 md:grid-cols-2">
				<p>
					Customers hesitate over order confirmations, invoices, and replies sent from a personal
					Gmail address. Your own domain removes that doubt before they even read the message.
				</p>
				<p>
					Verification forms, payment gateways, marketplace approvals. They ask for a business
					email, and Gmail gets rejected. A branded address says established company, not side
					project.
				</p>
			</div>
		</div>
	</section>

	<section>
		<div class="border-t py-12">
			<h2 class="mb-6">What we do</h2>
			<div class="grid gap-6 sm:grid-cols-2">
				<div class="flex flex-col gap-2 rounded-lg border p-6">
					<h3>Already have a domain?</h3>
					<p>We set up professional email on it. Think hello@yourbusiness.com, live within a day.</p>
				</div>
				<div class="flex flex-col gap-2 rounded-lg border p-6">
					<h3>No domain yet?</h3>
					<p>We help you pick one and set it up from scratch. One less thing to figure out.</p>
				</div>
				<div class="flex flex-col gap-2 rounded-lg border p-6">
					<h3>No website either?</h3>
					<p>We get you a simple one too. Same deal: handled for you, no technical maze.</p>
					<p><a href={resolve("/website-service")}>See the website service →</a></p>
				</div>
				<div class="flex flex-col gap-2 rounded-lg border p-6">
					<h3>Nothing technical</h3>
					<p>Full access handed over. Inbox, mobile app, everything ready to go.</p>
				</div>
			</div>
		</div>
	</section>

	<section id="how-it-works">
		<div class="border-t py-12">
			<h2 class="mb-6">How it works</h2>
			<ol class="m-0 grid list-none gap-6 p-0 sm:grid-cols-3">
				<li class="flex flex-col gap-2">
					<span class="flex h-8 w-8 items-center justify-center rounded-full border">1</span>
					<p>Tell us your domain. Don't have one? We help you pick it.</p>
				</li>
				<li class="flex flex-col gap-2">
					<span class="flex h-8 w-8 items-center justify-center rounded-full border">2</span>
					<p>We configure business email on that domain. You touch nothing.</p>
				</li>
				<li class="flex flex-col gap-2">
					<span class="flex h-8 w-8 items-center justify-center rounded-full border">3</span>
					<p>Full access handed over. Sending within a day.</p>
				</li>
			</ol>
		</div>
	</section>

	<section>
		<div class="border-t py-12">
			<h2 class="mb-6">What you get</h2>
			<ul class="m-0 flex list-none flex-col gap-3 p-0">
				<li class="flex items-start gap-2">
					<span>✓</span><span>The domain you already own, finally put to full use</span>
				</li>
				<li class="flex items-start gap-2">
					<span>✓</span><span>Set up and sending within a day</span>
				</li>
				<li class="flex items-start gap-2">
					<span>✓</span><span>Nothing technical for you to do</span>
				</li>
				<li class="flex items-start gap-2"><span>✓</span><span>Full access handed to you</span></li>
				<li class="flex items-start gap-2">
					<span>✓</span><span>Works where you already work. Inbox, mobile app, calendar.</span>
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
						>Have a website and domain, but still email customers from Gmail</span
					>
				</li>
				<li class="flex items-start gap-2">
					<span>-</span><span>Run on a Facebook page or storefront with no domain yet</span>
				</li>
				<li class="flex items-start gap-2">
					<span>-</span><span
						>Need a professional address for verification, outreach, or partnerships</span
					>
				</li>
			</ul>
		</div>
	</section>

	<section id="get-started">
		<div class="flex flex-col items-start gap-4 border-t py-16">
			<h2>Get started</h2>
			<p>Sending within a day. Nothing technical on your end. Tell us your domain and we take it from there.</p>
			<a href={resolve("/contact")} role="button" class="primary">Set up my business email</a>
		</div>
	</section>
</main>
