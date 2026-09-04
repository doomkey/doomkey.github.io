<script>
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>Message Received - Doomkey</title>
	<meta name="description" content="Thanks for reaching out. We reply within a day." />
	<link rel="canonical" href="https://doomkeybd.com/contact/thanks" />
</svelte:head>

<main>
	<section>
		<div class="mx-auto flex w-full max-w-narrow flex-col items-start gap-4 py-16">
			<p class="m-0 text-overline font-semibold tracking-[0.12em] text-accent uppercase">
				Message received
			</p>
			<h1 class="m-0 text-balance">Thanks. We reply within a day.</h1>
			<p class="m-0 text-body-xl opacity-90">
				Your message is on its way. Meanwhile, see what we're about:
			</p>
			<div class="mt-2 flex flex-wrap gap-3">
				<a href={resolve('/email-service')} role="button" class="outline">Email service</a>
				<a href={resolve('/website-service')} role="button" class="outline">Website service</a>
				<a href={resolve('/blog')} role="button" class="outline">Blog</a>
			</div>
		</div>
	</section>
</main>
