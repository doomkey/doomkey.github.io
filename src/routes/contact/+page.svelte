<script>
	import { resolve } from '$app/paths';

	const canonical = 'https://doomkeybd.com/contact';
	const title = 'Contact Doomkey: Tell Us About Your Business';
	const description =
		'Get business email, a website, or both set up within days. Tell us about your business and we reply within a day. Nothing technical on your end.';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
</svelte:head>

<main>
	<section>
		<div class="mx-auto flex w-full max-w-narrow flex-col gap-4 py-16">
			<p class="m-0 text-overline font-semibold tracking-[0.12em] text-accent uppercase">Contact</p>
			<h1 class="m-0 text-balance">Tell us about your business</h1>
			<p class="m-0 text-body-xl opacity-90">
				What you need, how to reach you. We reply within a day with next steps and a clear price.
			</p>
		</div>
	</section>

	<section>
		<div class="mx-auto w-full max-w-narrow border-t border-text/20 py-12">
			<form
				class="flex flex-col gap-5"
				method="POST"
				action="https://formsubmit.co/fb997d196dd54d9d1032b392c02fa0b6">
				<input type="hidden" name="_subject" value="New Doomkey lead" />
				<input type="hidden" name="_template" value="table" />
				<input type="hidden" name="_captcha" value="true" />
				<input type="text" name="_honey" class="hidden" tabindex="-1" autocomplete="off" />
				<input type="hidden" name="_next" value="https://doomkeybd.com/contact/thanks" />

				<label class="flex flex-col gap-2">
					<span class="text-caption font-semibold tracking-wide">Your name *</span>
					<input
						type="text"
						name="name"
						required
						autocomplete="name"
						placeholder="Your full name"
						class="rounded-lg border border-text/30 bg-white/60 px-4 py-2.5 text-body outline-none placeholder:opacity-50 focus:border-accent" />
				</label>

				<label class="flex flex-col gap-2">
					<span class="text-caption font-semibold tracking-wide">Email *</span>
					<input
						type="email"
						name="email"
						required
						autocomplete="email"
						placeholder="you@example.com"
						class="rounded-lg border border-text/30 bg-white/60 px-4 py-2.5 text-body outline-none placeholder:opacity-50 focus:border-accent" />
				</label>

				<label class="flex flex-col gap-2">
					<span class="text-caption font-semibold tracking-wide">Phone (optional)</span>
					<input
						type="tel"
						name="phone"
						autocomplete="tel"
						placeholder="01XXXXXXXXX"
						class="rounded-lg border border-text/30 bg-white/60 px-4 py-2.5 text-body outline-none placeholder:opacity-50 focus:border-accent" />
				</label>

				<label class="flex flex-col gap-2">
					<span class="text-caption font-semibold tracking-wide">What do you need?</span>
					<select
						name="service"
						class="rounded-lg border border-text/30 bg-white/60 px-4 py-2.5 text-body outline-none focus:border-accent">
						<option>Business email</option>
						<option>Website</option>
						<option>SEO / AI presence</option>
						<option>Email + website + SEO</option>
						<option>Not sure yet</option>
					</select>
				</label>

				<label class="flex flex-col gap-2">
					<span class="text-caption font-semibold tracking-wide">Tell us briefly (optional)</span>
					<textarea
						name="message"
						rows="5"
						placeholder="What are you running, and what's missing? A sentence or two is plenty."
						class="rounded-lg border border-text/30 bg-white/60 px-4 py-2.5 text-body outline-none placeholder:opacity-50 focus:border-accent"></textarea>
				</label>

				<button type="submit" class="primary mt-2 self-start">Send message</button>

				<p class="m-0 text-caption opacity-70">
					Prefer Facebook?
					<a
						class="text-accent underline underline-offset-[3px]"
						href="https://www.facebook.com/doomkey.apps"
						target="_blank"
						rel="noreferrer">Message us here</a
					>.
				</p>
			</form>
		</div>
	</section>
</main>
