<script lang="ts">
	import type { TocEntry } from '$lib/blog/posts';

	let {
		toc,
		activeId,
		sidebar = false
	}: {
		toc: TocEntry[];
		activeId: string;
		sidebar?: boolean;
	} = $props();
</script>

<nav aria-label="Table of contents" class={sidebar ? '' : 'rounded-2xl border border-text/20 bg-white/40 p-6'}>
	<p class="m-0 mb-3 text-overline font-semibold tracking-[0.12em] text-accent uppercase {sidebar ? 'pl-3' : ''}">On this page</p>
	<ul class="m-0 flex list-none flex-col {sidebar ? 'gap-1 border-l border-text/20' : 'gap-2'} p-0">
		{#each toc as entry (entry.id)}
			<li class={entry.level === 3 ? 'pl-4' : ''}>
				<a
					href="#{entry.id}"
					class={sidebar
						? `-mb-px block border-l-2 py-1 pr-2 no-underline hover:underline hover:underline-offset-[3px] ${activeId === entry.id ? 'border-accent font-semibold text-accent' : 'border-transparent text-inherit opacity-80 hover:opacity-100'}`
						: `text-sm no-underline hover:underline hover:underline-offset-[3px] ${activeId === entry.id ? 'font-semibold text-accent' : 'text-inherit'}`}>
					{entry.text}
				</a>
			</li>
		{/each}
	</ul>
</nav>
