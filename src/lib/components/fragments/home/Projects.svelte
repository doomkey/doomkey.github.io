<script lang="ts">
	import ThumbImgO from '$lib/assets/images/ovidhan/thumb.png';
	import ThumbImgK from '$lib/assets/images/korbotaki/thumb.png';
	import ThumbImgS from '$lib/assets/images/sas/thumb.png';
</script>

<section id="ovidhan">
	<div>
		<article class="project">
			<h1>Ovidhan</h1>
			<div class="flex justify-between">
				<div>
					<p>
						A English to Bangla Dictionary App. <br />
						Made with Ionic Framework, with Vue 3
					</p>
					<a
						href="https://github.com/doomkey/ovidhan"
						role="button"
						target="_blank"
						rel="noreferrer">Visit Repo</a
					>
				</div>
				<div>
					<h2>Features</h2>
					<ol>
						<li>10000+ words.</li>
						<li>Unified search algorithm.</li>
						<li>Word of the day.</li>
						<li>Comprehensive details of words.</li>
						<li>Quizzes and much more.</li>
					</ol>
				</div>
			</div>
			<div class="flex">
				<!-- <img src={HomeImg} alt="" /> -->
				<!-- <img src={DetailsImg} alt="" /> -->
				<!-- <img src={QuizImg} alt="" /> -->
				<img src={ThumbImgO} alt="" />
			</div>
		</article>
	</div>
</section>
<section id="korbotaki">
	<div>
		<article class="project">
			<h1>Korbotaki</h1>
			<div class="flex justify-between">
				<div>
					<p>A Decision Making App. <br />Made with Ionic Framework, with Vue 3</p>
					<a
						href="https://github.com/doomkey/korbotaki"
						role="button"
						target="_blank"
						rel="noreferrer">Visit Repo</a
					>
				</div>
				<div>
					<h2>Features</h2>
					<ol>
						<li>Create decisions.</li>
						<li>Add alternatives.</li>
						<li>Rank criteria.</li>
						<li>Get results.</li>
					</ol>
				</div>
			</div>
			<div class="flex">
				<!-- <img src={HomeImg} alt="" /> -->
				<!-- <img src={DetailsImg} alt="" /> -->
				<!-- <img src={QuizImg} alt="" /> -->
				<img src={ThumbImgK} alt="" />
			</div>
		</article>
	</div>
</section>
<section id="sas">
	<div>
		<article class="project">
			<h1>SAS Alumni Database</h1>
			<div class="flex justify-between">
				<div>
					<p>
						Alumni Database for Students Association of Satkhira, PSTU. <br />Made with Next.js and
						Supabase.
					</p>
					<a
						href="https://github.com/doomkey/satkhira-alumni"
						role="button"
						target="_blank"
						rel="noreferrer">Visit Repo</a
					>
				</div>
				<div>
					<h2>Features</h2>
					<ol>
						<li>List, filter and sort the alumni database.</li>
						<li>Alumni data submission form with strict validation check.</li>
						<li>Photo uploading.</li>
						<li>A modern admin dashboard with charts and statistics.</li>
						<li>Moderation of alumni.</li>
					</ol>
				</div>
			</div>
			<div class="flex">
				<!-- <img src={HomeImg} alt="" /> -->
				<!-- <img src={DetailsImg} alt="" /> -->
				<!-- <img src={QuizImg} alt="" /> -->
				<img src={ThumbImgS} alt="" />
			</div>
		</article>
	</div>
</section>

<style lang="scss">
	section {
		background-color: var(--color-surface);
		color: var(--color-text);
		padding-top: 4rem;
		border-bottom: 8px solid var(--color-primary);
		h1 {
			font-size: var(--display-lg-size);
			line-height: var(--display-lg-size);
			color: var(--color-primary);
		}
		h2 {
			margin: 0;
			font-family: var(--font-text);
		}

		a {
			display: inline-block;
			margin-block: 1rem;
			background-color: var(--color-accent);
			color: var(--color-surface);
		}

		h2,
		p {
			color: var(--color-text);
			margin-block-start: 1rem;
		}
		ol {
			max-width: 30ch;
		}
	}
	#ovidhan {
		--color-surface: #eaffe8;
		--color-text: #111;
		--color-primary: #705676;
		--color-accent: #0b6f00;
		z-index: 99;
		isolation: isolate;
	}
	#korbotaki {
		--color-surface: #fff8f6;
		--color-text: #522615;
		--color-primary: #3e6474;
		--color-accent: #b5281a;
	}
	#sas {
		--color-surface: #fbfbfb;
		--color-text: #111;
		--color-primary: #7033ff;
		--color-accent: #4ac885;
	}

	@media screen and (max-width: 768px) {
		.flex {
			flex-direction: column;
		}
	}
</style>
