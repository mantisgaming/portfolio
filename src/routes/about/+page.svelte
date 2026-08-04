<script lang="ts">
	import Card from '$lib/components/card.svelte';
	import PersonalCard from '$lib/components/personalCard.svelte';
	import TagList from '$lib/components/tagList.svelte';
</script>

<svelte:head>
	<title>Max Allen | About</title>
</svelte:head>

<PersonalCard />

<Card>
	<h2>Skills</h2>
	<TagList
		tags={[
			{
				color: '#0063bf',
				label: 'iOS'
			},
			{
				color: '#0063bf',
				label: 'Android'
			},
			{
				color: '#0063bf',
				label: 'Web'
			},
			{
				color: '#0063bf',
				label: 'PC'
			},
			{
				color: '#0063bf',
				label: 'Mac'
			},
			{
				color: '#bf2d00',
				label: 'Unity (C#)'
			},
			{
				color: '#bf2d00',
				label: 'Godot (GDScript)'
			},
			{
				color: '#bf2d00',
				label: 'Unreal (C++/Blueprints)'
			},
			{
				color: '#bf2d00',
				label: 'Svelte (Typescript)'
			},
			{
				color: '#bf2d00',
				label: 'Cloudflare (Pages/Workers)'
			},
			{
				color: '#bf2d00',
				label: 'NodeJS'
			},
			{
				color: '#bf2d00',
				label: 'SFML (2D Graphics)'
			},
			{
				color: '#bf2d00',
				label: 'WebGL/OpenGL (3D Graphics)'
			},
			{
				color: '#bf2d00',
				label: 'C++'
			},
			{
				color: '#bf2d00',
				label: 'SCSS'
			},
			{
				color: '#a32ec7',
				label: 'Network Multiplayer'
			},
			{
				color: '#a32ec7',
				label: 'Websockets'
			},
			{
				color: '#a32ec7',
				label: 'Latency Compensation'
			},
			{
				color: '#a32ec7',
				label: 'Procedural Generation'
			},
			{
				color: '#a32ec7',
				label: 'Monetization (ads)'
			},
			{
				color: '#a32ec7',
				label: 'Custom Game Engine'
			},
			{
				color: '#a32ec7',
				label: 'Data Driven Design'
			}
		]}
	/>
</Card>
