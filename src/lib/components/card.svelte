<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';
	import type { Snippet } from 'svelte';

	const {
		children,
		href,
		image
	}: {
		children: Snippet;
		href?: Pathname;
		image?: {
			src: string;
			alt: string;
		};
	} = $props();
</script>

<svelte:element this={href ? 'a' : 'div'} class="card" href={href ? resolve(href) : undefined}>
	{#if image}
		<img src={image?.src} alt={image?.alt} />
	{/if}
	<div class="content">
		{@render children()}
	</div>
</svelte:element>

<style lang="scss">
	.card {
		background-color: var(--header-bg-color);
		border-radius: 2rem;
		padding: 2rem;
		margin: 3rem auto;

		box-shadow: 0.5rem 0.5rem 2rem black;

		display: flex;
		flex-direction: column;
		gap: 2rem;

		:global(*) {
			color: var(--header-color);
		}

		text-decoration: none;

		transition-duration: 0.25s;

		img {
			border-radius: 1rem;
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
