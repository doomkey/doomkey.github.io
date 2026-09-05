<script>
	import { onMount, tick } from 'svelte';
	const isClient = typeof window !== 'undefined';
	const dpr = isClient ? window.devicePixelRatio || 1 : 1;

	let canvasElement;
	let canvas;
	let canvasWidth;
	let canvasHeight;
	let mouseX = $state(0);
	let mouseY = $state(0);
	let drawable = $state({ left: 0, top: 0, width: 0, height: 0 });

	let points = [];
	let rafId = null;
	let burstStart = null;

	const gridSize = 24;
	const baseSize = 1;
	const maxDist = 400;
	const easeFactor = 0.12;
	const burstDuration = 600;

	function pythag(ax, ay, bx, by) {
		const dx = ax - bx;
		const dy = ay - by;
		return Math.sqrt(dx * dx + dy * dy) || 1;
	}

	function buildGrid() {
		const limitX = Math.ceil(canvasWidth / dpr / gridSize) + 1;
		const limitY = Math.ceil(canvasHeight / dpr / gridSize) + 1;
		points = [];
		for (let i = 0; i < limitX; i++) {
			for (let j = 0; j < limitY; j++) {
				points.push({
					baseX: i * gridSize,
					baseY: j * gridSize,
					offX: 0,
					offY: 0
				});
			}
		}
	}

	function setupCanvas() {
		if (!canvasElement || !isClient) return;
		const rect = canvasElement.getBoundingClientRect();
		drawable = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
		canvasWidth = drawable.width * dpr;
		canvasHeight = drawable.height * dpr;
		canvasElement.width = canvasWidth;
		canvasElement.height = canvasHeight;
		canvas = canvasElement.getContext('2d');
		canvas.scale(dpr, dpr);
		buildGrid();
	}

	function currentMaxDist(now) {
		if (burstStart === null) return maxDist;
		const elapsed = now - burstStart;
		if (elapsed > burstDuration) {
			burstStart = null;
			return maxDist;
		}
		const t = elapsed / burstDuration;
		const pulse = Math.sin(t * Math.PI) * 500;
		return maxDist + pulse;
	}

	function draw(now) {
		if (!canvas) return;

		canvas.clearRect(0, 0, canvasWidth / dpr, canvasHeight / dpr);

		const effMaxDist = currentMaxDist(now);

		for (const p of points) {
			const dist = pythag(p.baseX, p.baseY, mouseX, mouseY);
			const targetOffX = ((p.baseX - mouseX) / dist) * gridSize * 0.5;
			const targetOffY = ((p.baseY - mouseY) / dist) * gridSize * 0.5;

			p.offX += (targetOffX - p.offX) * easeFactor;
			p.offY += (targetOffY - p.offY) * easeFactor;

			const x = p.baseX + p.offX;
			const y = p.baseY + p.offY;

			let opacity;
			if (dist > effMaxDist) {
				opacity = 1;
			} else {
				opacity = dist / effMaxDist;
				opacity = Math.pow(opacity, 3);
			}
			opacity = Math.min(1, Math.max(0.03, opacity));

			const size = baseSize + (1 - opacity) * 3;
			const hue = (Math.atan2(p.baseY - mouseY, p.baseX - mouseX) * 180) / Math.PI;
			const normalizedHue = ((hue + 360) % 360);

			canvas.beginPath();
			canvas.arc(x, y, size, 0, Math.PI * 2);
			canvas.fillStyle = `hsla(${normalizedHue}, 80%, 60%, ${opacity})`;
			canvas.fill();
		}

		rafId = window.requestAnimationFrame(draw);
	}

	function handleMouseMove(e) {
		if (!canvasElement) return;
		const rect = canvasElement.getBoundingClientRect();
		drawable = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
		mouseX = e.clientX - drawable.left;
		mouseY = e.clientY - drawable.top;
	}

	function handleClick(e) {
		burstStart = performance.now();
	}

	onMount(() => {
		if (!isClient) return;
		tick().then(() => {
			setupCanvas();
			rafId = window.requestAnimationFrame(draw);
		});
		window.addEventListener('mousemove', handleMouseMove, false);
		window.addEventListener('resize', setupCanvas, false);
		window.addEventListener('click', handleClick, false);
		return () => {
			window.removeEventListener('mousemove', handleMouseMove, false);
			window.removeEventListener('resize', setupCanvas, false);
			window.removeEventListener('click', handleClick, false);
			if (rafId) window.cancelAnimationFrame(rafId);
		};
	});
</script>

<canvas bind:this={canvasElement} id="sketch"></canvas>

<style>
	#sketch {
		width: 100%;
		height: 100%;
		display: block;
		margin: 0 auto;
	}
</style>
