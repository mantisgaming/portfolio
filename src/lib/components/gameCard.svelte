<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';

	const {
		href,
		gameTitle,
		teamSize,
		thumbnail,
		description,
		tags
	}: {
		href?: Pathname;
		gameTitle: string;
		teamSize: number;
		thumbnail: {
			src: string;
			alt: string;
		};
		description: string;
		tags: {
			label: string;
			color: string;
		}[];
	} = $props();
</script>

<svelte:element this={href ? 'a' : 'div'} class="card" href={href ? resolve(href) : undefined}>
	<img src={thumbnail?.src} alt={thumbnail?.alt} />
	<div class="body">
		<div class="row" style:justify-content="space-between">
			<h2>{gameTitle}</h2>
			<p>Team Size: {teamSize}</p>
		</div>
		<p>{description}</p>
		{#if tags.length > 0}
			<div class="row">
				{#each tags as tag (tag.label)}
					<p class="tag" style:--tag-color={tag.color}>{tag.label}</p>
				{/each}
			</div>
		{/if}
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

		* {
			color: var(--header-color);
		}

		text-decoration: none;

		transition-duration: 0.25s;

		&:hover {
			transform: scale(105%);
		}
	}

	.row {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		flex-wrap: wrap;
		align-items: baseline;
	}

	.body * {
		margin: 0;
	}

	.body > p {
		margin: 1rem 0;
	}

	img {
		border-radius: 1rem;
	}

	.tag {
		display: block;

		background-color: rgb(from var(--tag-color) r g b / calc(alpha * 0.5));
		border: solid 0.15rem hsl(from var(--tag-color) h s calc(l * 1.5));

		padding: 0.25rem;
		border-radius: 0.5rem;
	}
</style>
