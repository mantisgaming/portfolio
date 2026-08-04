<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Pathname } from '$app/types';
	import type { ProjectData } from '$lib/types/projectData';

	const {
		href,
		project
	}: {
		href?: Pathname;
		project: ProjectData;
	} = $props();
</script>

<svelte:element this={href ? 'a' : 'div'} class="card" href={href ? resolve(href) : undefined}>
	<img src={project.thumbnail?.src} alt={project.thumbnail?.alt} />
	<div class="body">
		<h2>{project.title}</h2>
		<div class="row" style:justify-content="space-between">
			<p>Team Size: {project.teamSize}</p>
			{#if project.roles.length == 1}
				<p>Role: {project.roles[0]}</p>
			{:else if project.roles.length > 1}
				<p>
					Roles: {#each project.roles as role, i (role)}
						{#if i > 0},
						{/if}
						{role}
					{/each}
				</p>
			{/if}
		</div>
		<p>{project.brief}</p>
		{#if project.tags.length > 0}
			<div class="row">
				{#each project.tags as tag (tag)}
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
		user-select: none;

		transition-duration: 0.25s;

		@media screen and (hover: hover) {
			&:hover {
				transform: scale(105%);
			}
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
