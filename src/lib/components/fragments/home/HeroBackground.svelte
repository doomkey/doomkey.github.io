<script>
	import { onMount, tick } from 'svelte';

	const isClient = typeof window !== 'undefined';
	const dpr = isClient ? window.devicePixelRatio || 1 : 1;

	// State
	let canvasElement;
	let canvas;
	let canvasWidth;
	let canvasHeight;

	let mouseX = $state(0);
	let mouseY = $state(0);

	let drawable = $state({ left: 0, top: 0, width: 0, height: 0 });

	function pythag(ellipseX, ellipseY, mouseX, mouseY) {
		let leg1 = Math.abs(mouseX - ellipseX);
		let leg2 = Math.abs(mouseY - ellipseY);
		let pyth = Math.pow(leg1, 2) + Math.pow(leg2, 2);
		return Math.sqrt(pyth) || 1;
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
		draw();
	}

	function draw() {
		if (!canvas) return;

		canvas.clearRect(0, 0, canvasWidth, canvasHeight);

		let size = 1;
		let gridSize = 20;

		const maxDist = 400;

		const limitX = Math.ceil(canvasWidth / dpr / gridSize);
		const limitY = Math.ceil(canvasHeight / dpr / gridSize);

		for (let i = 0; i < limitX; i++) {
			for (let j = 0; j < limitY; j++) {
				let x = i * gridSize;
				let y = j * gridSize;

				let dist = pythag(x, y, mouseX, mouseY);

				const offsetX = ((x - mouseX) / dist) * gridSize * 0.5;
				const offsetY = ((y - mouseY) / dist) * gridSize * 0.5;

				let opacity;

				if (dist > maxDist) {
					opacity = 1;
				} else {
					opacity = dist / maxDist;

					opacity = Math.pow(opacity, 3);
				}

				canvas.beginPath();
				canvas.arc(x + offsetX, y + offsetY, size, 0, Math.PI * 2);

				canvas.fillStyle = `rgba(116, 9, 229, ${opacity})`;
				canvas.fill();
			}
		}
	}

	function handleMouseMove(e) {
		if (!canvasElement) return;

		const rect = canvasElement.getBoundingClientRect();
		drawable = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };

		mouseX = e.clientX - drawable.left;
		mouseY = e.clientY - drawable.top;

		window.requestAnimationFrame(draw);
	}

	onMount(() => {
		if (!isClient) return;

		tick().then(() => {
			setupCanvas();
		});

		window.addEventListener('mousemove', handleMouseMove, false);
		window.addEventListener('resize', setupCanvas, false);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove, false);
			window.removeEventListener('resize', setupCanvas, false);
		};
	});
</script>

<canvas bind:this={canvasElement} id="sketch"></canvas>

<style>
	#sketch {
		width: 100%;
		height: 100vh;
		display: block;
		margin: 0 auto;
	}
</style>
