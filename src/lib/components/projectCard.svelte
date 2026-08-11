<script lang="ts">
	import type { Pathname } from '$app/types';
	import type { ProjectData } from '$lib/types/projectData';
	import Card from './card.svelte';

	const {
		href,
		project
	}: {
		href?: Pathname;
		project: ProjectData;
	} = $props();
</script>

<Card {href} tags={project.tags} image={project.thumbnail}>
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
</Card>

<style lang="scss">
	.row {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		flex-wrap: wrap;
		align-items: baseline;

		* {
			margin: 0;
		}
	}
</style>
