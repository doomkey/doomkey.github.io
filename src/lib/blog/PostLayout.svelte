<script lang="ts">
	let { children } = $props();
</script>

<article
	class="prose max-w-post prose-headings:text-text-alt prose-p:text-text prose-li:text-text prose-strong:text-text-alt prose-a:text-accent prose-a:underline-offset-[3px] prose-blockquote:border-l-accent prose-li:marker:text-accent prose-code:text-text-alt prose-code:bg-text/10 prose-code:rounded prose-code:px-[0.4em] prose-code:py-[0.15em] prose-code:before:content-none prose-code:after:content-none prose-pre:rounded-xl prose-th:text-text-alt [&_h2]:scroll-mt-20 [&_h3]:scroll-mt-20 [&_pre]:bg-text-alt [&_pre]:text-bg [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_img]:rounded-xl [&_table]:text-caption [&_table]:block [&_table]:w-full [&_table]:max-w-full [&_table]:overflow-x-auto"
>
	{@render children?.()}
</article>
