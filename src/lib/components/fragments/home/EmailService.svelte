<script>
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';

	let termNode;
	let bodyNode;

	const script = [
		{
			html: '<span class="dmk-prompt">$</span> <span class="dmk-cmd">checking your business email</span>',
			typed: true,
			pause: 300
		},
		{
			html: '<span class="dmk-out dmk-bad">yourbusinessname823@gmail.com</span>',
			typed: false,
			pause: 380
		},
		{
			html: '<span class="dmk-out dmk-bad">personal, not a business</span>',
			typed: false,
			pause: 700
		},
		{
			html: '<span class="dmk-prompt">$</span> <span class="dmk-cmd">moving it to your domain</span>',
			typed: true,
			pause: 320
		},
		{
			html: '<span class="dmk-out dmk-ok">hello@yourbusiness.com</span>',
			typed: false,
			pause: 380
		},
		{
			html: '<span class="dmk-out dmk-final">an established company</span>',
			typed: false,
			pause: 0
		}
	];

	onMount(() => {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		let activeTimer = null;
		let activeInterval = null;
		let io = null;

		function finalRender() {
			if (!bodyNode) return;
			bodyNode.innerHTML =
				script.map((s) => '<div class="dmk-line">' + s.html + '</div>').join('') +
				'<span class="dmk-cursor"></span>';
		}

		if (reduce) {
			finalRender();
			return;
		}

		let played = false;

		function typeLine(html, cb) {
			if (!bodyNode) return;
			const wrap = document.createElement('div');
			wrap.className = 'dmk-line';
			bodyNode.appendChild(wrap);

			const tmp = document.createElement('div');
			tmp.innerHTML = html;
			const full = tmp.textContent || '';
			let i = 0;

			const speed = 16;
			activeInterval = setInterval(() => {
				i++;
				wrap.textContent = full.slice(0, i);
				if (i >= full.length) {
					clearInterval(activeInterval);
					wrap.innerHTML = html;
					cb();
				}
			}, speed);
		}

		function outputLine(html, cb) {
			if (!bodyNode) return;
			const wrap = document.createElement('div');
			wrap.className = 'dmk-line';
			wrap.innerHTML = html;
			wrap.style.opacity = '0';
			bodyNode.appendChild(wrap);
			requestAnimationFrame(() => {
				wrap.style.transition = 'opacity 200ms ease';
				wrap.style.opacity = '1';
			});
			cb();
		}

		function runStep(idx) {
			if (idx >= script.length) {
				if (!bodyNode) return;
				const cursor = document.createElement('span');
				cursor.className = 'dmk-cursor';
				bodyNode.appendChild(cursor);
				return;
			}
			const step = script[idx];
			const advance = () => {
				activeTimer = setTimeout(() => runStep(idx + 1), step.pause);
			};

			if (step.typed) {
				typeLine(step.html, advance);
			} else {
				outputLine(step.html, advance);
			}
		}

		io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting && !played) {
						played = true;
						runStep(0);
						io.disconnect();
					}
				});
			},
			{ threshold: 0.4 }
		);

		if (termNode) {
			io.observe(termNode);
		}

		return () => {
			if (io) io.disconnect();
			if (activeTimer) clearTimeout(activeTimer);
			if (activeInterval) clearInterval(activeInterval);
		};
	});

	function handleCtaClick() {
		window.location.hash = 'contact';
	}
</script>

<section class="dmk-email-section" id="services">
	<div class="dmk-email-inner">
		<h2 class="dmk-heading">A gmail address makes a real business look unfinished.</h2>

		<p>
			An @gmail.com address reads like a side project. An address on your own domain reads like a
			real company. You already own the domain, we just move your email onto it.
		</p>

		<div class="dmk-term" bind:this={termNode}>
			<div class="dmk-term-bar">
				<div class="dmk-term-dots"><i></i><i></i><i></i></div>
				<p class="dmk-term-title">yourbusiness.com</p>
			</div>
			<div class="dmk-term-body" bind:this={bodyNode} aria-live="polite"></div>
		</div>

		<ul class="dmk-checklist">
			<li><span class="dmk-check">✓</span> The domain you already own</li>
			<li><span class="dmk-check">✓</span> Set up and sending within a day</li>
			<li><span class="dmk-check">✓</span> Nothing technical for you to do</li>
			<li><span class="dmk-check">✓</span> Full access handed to you</li>
		</ul>

		<div class="dmk-cta-row">
			<a role="button" href={resolve('/contact')}>Set up my business email</a>

			<a href={resolve('/email-service')} class="outline" role="button"> Learn More </a>
		</div>
	</div>
</section>

<style>
	:root {
		--bg-raised: #12160f;
		--line: rgba(237, 234, 226, 0.09);
		--line-soft: rgba(237, 234, 226, 0.05);
		--ink: #edeae2;
		--ink-dim: #7c8178;
		--amber: #e8a33d;
		--amber-dim: #6b5527;
		--rust: #b4553f;
	}

	* {
		box-sizing: border-box;
	}

	.dmk-email-section {
		background: var(--bg);
		color: var(--ink);
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		padding: 108px 24px;
		position: relative;
		overflow: hidden;
	}

	.dmk-email-section::before {
		content: '';
		position: absolute;
		inset: 0;
		background: repeating-linear-gradient(
			to bottom,
			rgba(237, 234, 226, 0.012) 0px,
			rgba(237, 234, 226, 0.012) 1px,
			transparent 1px,
			transparent 3px
		);
		pointer-events: none;
	}

	.dmk-email-inner {
		max-width: 680px;
		margin: 0 auto;
		position: relative;
	}

	.dmk-heading {
		font-size: clamp(28px, 4.4vw, 42px);
		line-height: 1.22;
		font-weight: 700;
		margin: 0 0 18px;
		max-width: 15ch;
		letter-spacing: -0.01em;
	}

	.dmk-term {
		background: var(--bg-raised);
		border: 1px solid var(--line);
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 40px 80px -40px rgba(0, 0, 0, 0.6);
		margin-top: 2rem;
	}

	.dmk-term-bar {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 12px 16px;
		border-bottom: 1px solid var(--line);
	}
	.dmk-term-dots {
		display: flex;
		gap: 6px;
	}
	.dmk-term-dots i {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: rgba(237, 234, 226, 0.18);
		display: block;
	}
	.dmk-term-title {
		color: var(--ink-dim);
		font-size: 12.5px;
		margin: 0 auto 0 6px;
	}

	.dmk-term-body {
		padding: 22px 20px 26px;
		font-size: 14px;
		line-height: 1.9;
		min-height: 268px;
	}

	:global(.dmk-line) {
		white-space: pre-wrap;
		word-break: break-word;
	}
	:global(.dmk-prompt) {
		color: var(--amber);
	}
	:global(.dmk-cmd) {
		color: var(--ink);
	}
	:global(.dmk-out) {
		color: var(--ink-dim);
		padding-left: 20px;
		display: block;
	}
	:global(.dmk-ok) {
		color: var(--amber);
	}
	:global(.dmk-bad) {
		color: var(--rust);
	}
	:global(.dmk-final) {
		color: var(--ink);
		font-weight: 600;
	}

	:global(.dmk-cursor) {
		display: inline-block;
		width: 7px;
		height: 15px;
		background: var(--amber);
		margin-left: 2px;
		transform: translateY(2px);
		animation: dmk-blink 1s steps(1) infinite;
	}
	:global(.dmk-cursor.dmk-hide) {
		animation: none;
		opacity: 0;
	}

	@keyframes dmk-blink {
		50% {
			opacity: 0;
		}
	}

	.dmk-checklist {
		list-style: none;
		margin: 28px 0 0;
		padding: 0;
		display: grid;
		gap: 12px;
	}
	.dmk-checklist li {
		display: flex;
		align-items: baseline;
		gap: 10px;
		font-size: 14px;
		line-height: 1.5;
		color: var(--ink-dim);
	}
	.dmk-check {
		color: var(--amber);
		font-weight: 700;
		flex-shrink: 0;
	}

	.dmk-cta-row {
		display: flex;
		align-items: center;
		gap: 20px;
		margin-top: 40px;
		flex-wrap: wrap;
	}

	@media (max-width: 520px) {
		.dmk-email-section {
			padding: 76px 18px;
		}
		.dmk-term-body {
			font-size: 12.8px;
			min-height: 300px;
		}
		.dmk-cta-row {
			flex-direction: column;
			align-items: flex-start;
			gap: 12px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.dmk-cursor) {
			animation: none;
		}
	}
</style>
