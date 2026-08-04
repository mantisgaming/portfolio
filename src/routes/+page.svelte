<script>
	import ProjectCard from '$lib/components/projectCard.svelte';
</script>

<svelte:head>
	<title>Max Allen | Portfolio</title>
</svelte:head>

<ProjectCard
	// href="/project/fishy-missile"
	project={{
		title: 'Fishy Missile',
		teamSize: 7,
		thumbnail: { src: '/projects/fishy-missile/thumbnail.jpg', alt: 'Fishy Missile icon' },
		tags: [
			{
				color: '#37a600',
				label: 'Published'
			},
			{
				color: '#0063bf',
				label: 'iOS'
			},
			{
				color: '#0063bf',
				label: 'Android'
			},
			{
				color: '#bf2d00',
				label: 'Unity'
			},
			{
				color: '#a32ec7',
				label: 'Data Driven Design'
			},
			{
				color: '#a32ec7',
				label: 'Procedural Generation'
			}
		],
		roles: ['Producer', 'Programmer'],
		brief:
			'Fishy Missile is a casual arcade mobile game where players use tilt controls to collect scrap from the ocean to build a rocket and blow up the moon.'
	}}
/>
<ProjectCard
	// href="/project/treasure-of-the-sierra-madre"
	project={{
		title: 'Treasure of the Sierra Madre',
		teamSize: 6,
		thumbnail: {
			src: '/projects/treasure-of-the-sierra-madre/thumbnail.jpg',
			alt: 'Treasure of the Sierra Madre thumbnail'
		},
		tags: [
			{
				color: '#37a600',
				label: 'Deployed'
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
				color: '#bf2d00',
				label: 'Godot'
			},
			{
				color: '#bf2d00',
				label: 'Svelte'
			},
			{
				color: '#bf2d00',
				label: 'Cloudflare'
			},
			{
				color: '#a32ec7',
				label: 'Multiplayer'
			},
			{
				color: '#a32ec7',
				label: 'Procedural Generation'
			}
		],
		roles: ['Producer', 'Programmer'],
		brief:
			'Treasure of the Sierra Madre is a digital board game played like Jackbox where it\'s not a question of "if" but "when" to betray your friends.'
	}}
/>
<ProjectCard
	// href="/project/multiplayer-fruit-ninja"
	project={{
		title: 'Multiplayer Fruit Ninja',
		teamSize: 1,
		thumbnail: {
			src: '/projects/multiplayer-fruit-ninja/thumbnail.jpg',
			alt: 'Multiplayer Fruit Ninja thumbnail'
		},
		tags: [
			{
				color: '#0063bf',
				label: 'PC'
			},
			{
				color: '#bf2d00',
				label: 'C++'
			},
			{
				color: '#bf2d00',
				label: 'SFML'
			},
			{
				color: '#a32ec7',
				label: 'Network Multiplayer'
			},
			{
				color: '#a32ec7',
				label: 'Custom Game Engine'
			}
		],
		roles: ['Programmer'],
		brief:
			'Multiplayer Fruit ninja is a practice project for developing a C++ game engine with network multiplayer capability using only system calls and SFML for graphics.'
	}}
/>
