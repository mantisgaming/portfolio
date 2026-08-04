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
			'Fishy Missile is a casual arcade mobile game where players use tilt controls to collect scrap from the ocean to build a rocket and blow up the moon.',
		body: 'Nothing yet'
	}}
/>
<ProjectCard
	// href="/project/treasure-of-the-sierra-madre"
	project={{
		title: 'Treasure of the Sierra Madre',
		teamSize: 6,
		thumbnail: { src: '/projects/treasure-of-the-sierra-madre/thumbnail.jpg', alt: 'Treasure of the Sierra Madre thumbnail' },
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
			'Treasure of the Sierra Madre is a digital board game played like Jackbox where it\'s not a question of "if" but "when" to betray your friends.',
		body: 'Nothing yet'
	}}
/>
