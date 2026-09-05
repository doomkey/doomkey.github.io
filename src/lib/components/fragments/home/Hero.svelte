<script>
	import HeroBackground from './HeroBackground.svelte';
	import HeroContent from '$lib/components/fragments/home/HeroContent.svelte';
</script>

<div class="hero-container">
	<HeroBackground />
	<HeroContent />
</div>

<style>
	.hero-container {
		width: 100%;
		/* Pull hero under sticky header so particles show behind it.
		   --hero-pull must match header bar height (py-3 + text-lg + border). */
		--hero-pull: 53px;
		height: calc(100vh + var(--hero-pull));
		margin-top: calc(-1 * var(--hero-pull));
		position: relative;
	}
</style>
