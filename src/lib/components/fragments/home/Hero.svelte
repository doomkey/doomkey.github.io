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
		height: 100vh;
		position: relative;
	}
</style>
