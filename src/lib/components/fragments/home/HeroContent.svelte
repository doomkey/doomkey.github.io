<script>
	import DSTransparent from '$lib/assets/images/DSTransparent.svg';
</script>

<div class="hero">
	<section>
		<div>
			<img src={DSTransparent} alt="" style="margin-left: 0;" />
			<h1>
				Built to
				<span class="font-monospace"> Outperform. </span>
			</h1>
			<h1>
				Built to
				<span class="font-monospace color-accent"> Scale. </span>
			</h1>
			<p>We build high-performance apps with care. The apps which are loved by the users.</p>
			<button class="primary">Projects</button>
			<button class="outline">About Us</button>
		</div>
	</section>
</div>

<style>
	.hero {
		position: absolute;
		top: 10%;
		left: 0;

		width: 100%;
		height: 100%;
	}
	section {
		flex-shrink: 0;
	}
	h1 {
		margin: 0;
		font-size: var(--display-lg-size);
		line-height: var(--display-lg-size);
	}

	p {
		margin: 1rem 0;
	}

	img {
		width: 100%;
	}

	@media screen and (min-width: 400px) {
		img {
			width: 70%;
		}
	}
	@media screen and (min-width: 600px) {
		img {
			width: 50%;
		}
	}
	@media screen and (min-width: 800px) {
		img {
			width: 40%;
		}
	}
</style>
