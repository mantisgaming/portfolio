<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';
	import type { Tag } from '$lib/types/tag';
	import type { Snippet } from 'svelte';
	import TagList from './tagList.svelte';

	const {
		children,
		href,
		image,
		tags = []
	}: {
		children?: Snippet;
		href?: Pathname;
		image?: {
			src: string;
			alt: string;
		};
		tags?: Tag[];
	} = $props();
</script>

<svelte:element this={href ? 'a' : 'div'} class="card" href={href ? resolve(href) : undefined}>
	{#if image}
		<img src={image?.src} alt={image?.alt} />
	{/if}
	<div class="content">
		{@render children?.()}
	</div>
	{#if tags.length > 0}
		<div class="tag-list">
			<TagList {tags} />
		</div>
	{/if}
</svelte:element>

<style lang="scss">
	.card {
		background-color: var(--header-bg-color);
		border-radius: 2rem;
		padding: 2rem;
		margin: 2rem 0;

		box-shadow: 0.5rem 0.5rem 2rem black;

		display: grid;
		flex-direction: column;
		gap: 1rem;

		columns: auto auto;

		:global(*) {
			color: var(--header-color);
		}

		text-decoration: none;

		transition-duration: 0.25s;

		img {
			border-radius: 1rem;
			width: 100%;
		}

		@media screen and (min-width: 600px) {
			align-items: center;

			img {
				width: 30vw;
				aspect-ratio: 1/1;
			}
		}
	}

	@media screen and (min-width: 600px) {
		.content {
			grid-row: 1;
			grid-column: 2;
		}

		.tag-list {
			grid-row: 2;
			grid-column: 1/3;
		}
	}

	@media screen and (hover: hover) {
		a.card:hover {
			transform: scale(105%);
		}
	}

	:global(.content > *) {
		margin: 0 0 1rem;
	}

	:global(.content > *:last-child) {
		margin: 0;
	}
</style>
