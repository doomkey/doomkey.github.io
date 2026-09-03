<script>
	import DSTransparent from '$lib/assets/images/DSTransparent.svg';
</script>

<div class="hero">
	<section>
		<div class="hero-content">
			<img src={DSTransparent} alt="" style="margin-left: 0;" />
			<!-- <h1>
				Built to
				<span class="font-monospace"> Outperform. </span>
			</h1> -->
			<h1 style="margin-bottom: 2rem">We make apps that</h1>

			<div class="scale-marquee" aria-hidden="true">
				<div class="scale-marquee-track">
					<span>SCAAAAAAALE.</span>
					<span>SCAAAAAAALE.</span>
					<span>SCAAAAAAALE.</span>
					<span>SCAAAAAAALE.</span>
					<span>SCAAAAAAALE.</span>
					<span>SCAAAAAAALE.</span>
					<span>SCAAAAAAALE.</span>
					<span>SCAAAAAAALE.</span>
					<span>SCAAAAAAALE.</span>
					<span>SCAAAAAAALE.</span>
					<span>SCAAAAAAALE.</span>
				</div>
			</div>
			<div class="scale-marquee scale-marquee--bottom" aria-hidden="true">
				<div class="scale-marquee-track scale-marquee-track--reverse">
					<span>SCAAAAAAALE.</span>
					<span>SCAAAAAAALE.</span>
					<span>SCAAAAAAALE.</span>
					<span>SCAAAAAAALE.</span>
					<span>SCAAAAAAALE.</span>
					<span>SCAAAAAAALE.</span>
					<span>SCAAAAAAALE.</span>
					<span>SCAAAAAAALE.</span>
					<span>SCAAAAAAALE.</span>
					<span>SCAAAAAAALE.</span>
					<span>SCAAAAAAALE.</span>
				</div>
			</div>
			<!-- <p>We build high-performance apps with care. The apps which are loved by the users.</p>
			<p class="text-black! italic">Scroll down to see our projects.</p> -->
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
		overflow: hidden;
	}
	.hero-content {
		position: relative;
		z-index: 1;
	}

	.scale-marquee {
		position: absolute;
		bottom: -1.8em;
		left: 50%;
		width: 160vw;
		transform: translateX(-50%) rotate(-8deg);
		transform-origin: center;
		overflow: hidden;
		z-index: -1;
		pointer-events: none;
	}
	.scale-marquee--bottom {
		bottom: -4.5rem;
		top: auto;
	}

	.scale-marquee-track {
		display: flex;
		white-space: nowrap;
		width: max-content;
		animation: scroll-x 16s linear infinite;
		font-size: var(--display-lg-size);
		font-weight: 900;
		color: var(--color-accent);
	}
	.scale-marquee-track span {
		padding-right: 2rem;
	}
	.scale-marquee-track--reverse {
		animation: scroll-x-reverse 16s linear infinite;
	}
	@keyframes scroll-x {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	@keyframes scroll-x-reverse {
		from { transform: translateX(-50%); }
		to   { transform: translateX(0); }
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
