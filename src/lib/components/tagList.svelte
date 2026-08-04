<script lang="ts">
	import type { Tag } from '$lib/types/tag';

	const {
		tags = []
	}: {
		tags: Tag[];
	} = $props();
</script>

{#if tags.length > 0}
	<ul class="tag-list">
		{#each tags as tag (tag)}
			<li class="tag" style:--tag-color={tag.color}>{tag.label}</li>
		{/each}
	</ul>
{/if}

<style lang="scss">
	.tag-list {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		flex-wrap: wrap;
		align-items: baseline;
		padding: 0;
		list-style: none;
	}

	.tag {
		display: block;

		background-color: rgb(from var(--tag-color) r g b / calc(alpha * 0.5));
		border: solid 0.15rem hsl(from var(--tag-color) h s calc(l * 1.5));

		padding: 0.25rem;
		border-radius: 0.5rem;

		margin: 0;
	}
</style>
