<script lang="ts">
	import { onMount } from 'svelte';

	let { children } = $props();

	let article: HTMLElement | undefined = $state();

	// Code blocks are prerendered HTML — inject copy buttons client-side.
	onMount(() => {
		if (!article) return;
		for (const pre of article.querySelectorAll('pre')) {
			if (pre.querySelector('.copy-btn')) continue;
			const btn = document.createElement('button');
			btn.type = 'button';
			btn.className = 'copy-btn';
			btn.textContent = 'Copy';
			btn.addEventListener('click', async () => {
				const code = pre.querySelector('code')?.innerText ?? '';
				try {
					await navigator.clipboard.writeText(code);
				} catch {
					// Clipboard unavailable (permissions, http) — leave text selected instead.
					const range = document.createRange();
					const codeEl = pre.querySelector('code');
					if (codeEl) {
						range.selectNodeContents(codeEl);
						getSelection()?.removeAllRanges();
						getSelection()?.addRange(range);
					}
					return;
				}
				btn.textContent = 'Copied!';
				setTimeout(() => (btn.textContent = 'Copy'), 2000);
			});
			pre.appendChild(btn);
		}
	});
</script>

<article
	bind:this={article}
	class="prose max-w-post prose-headings:text-text-alt prose-p:text-text prose-li:text-text prose-strong:text-text-alt prose-a:text-accent prose-a:underline-offset-[3px] prose-blockquote:border-l-accent prose-li:marker:text-accent prose-code:text-text-alt prose-code:bg-text/10 prose-code:rounded prose-code:px-[0.4em] prose-code:py-[0.15em] prose-code:before:content-none prose-code:after:content-none prose-pre:rounded-xl prose-pre:p-0 prose-th:text-text-alt [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_img]:rounded-xl [&_table]:text-caption [&_table]:block [&_table]:w-full [&_table]:max-w-full [&_table]:overflow-x-auto"
>
	{@render children?.()}
</article>

<style>
	/* rehype-pretty-code output (shiki dracula paints its own #282A36 bg) */

	/* Filename title bar, e.g. ```html title="contact.html" */
	:global([data-rehype-pretty-code-title]) {
		background-color: #282a36;
		color: #6272a4;
		font-family: var(--font-main);
		font-size: 0.75rem;
		padding: 0.6rem 1rem;
		border-bottom: 1px solid #44475a;
		border-top-left-radius: 0.75rem;
		border-top-right-radius: 0.75rem;
	}
	:global([data-rehype-pretty-code-figure] pre) {
		margin-top: 0;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}

	/* Line numbers via CSS counters (no fence meta needed; ::before
	   content never lands in copied text) */
	:global(pre code) {
		counter-reset: line;
		display: grid;
		padding: 1rem 0;
	}
	:global(pre code [data-line]) {
		padding: 0 1rem 0 0.5rem;
	}
	:global(pre code [data-line]::before) {
		counter-increment: line;
		content: counter(line);
		display: inline-block;
		width: 2ch;
		margin-right: 1.25rem;
		text-align: right;
		color: #6272a4;
		user-select: none;
	}

	/* Copy button (injected client-side, see onMount) */
	:global(pre) {
		position: relative;
	}
	:global(pre .copy-btn) {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		font-family: var(--font-main);
		font-size: 0.7rem;
		line-height: 1;
		padding: 0.45rem 0.7rem;
		border: 1px solid #44475a;
		border-radius: 0.45rem;
		background-color: #343746;
		color: #e1e4e8;
		cursor: pointer;
		opacity: 0.7;
	}
	:global(pre .copy-btn:hover) {
		opacity: 1;
		background-color: #44475a;
	}
</style>
