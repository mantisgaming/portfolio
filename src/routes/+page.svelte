<script>
	import GameCard from '$lib/components/gameCard.svelte';
	import fishyMissileIcon from '$lib/assets/fishy-missile.png';
</script>

<svelte:head>
	<title>Max Allen | Portfolio</title>
</svelte:head>

<GameCard
	// href="/project/fishy-missile"
	project={{
		title: 'Fishy Missile',
		teamSize: 7,
		thumbnail: { src: fishyMissileIcon, alt: 'Fishy Missile icon' },
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
			}
		],
		roles: ['Producer', 'Programmer'],
		brief:
			'Fishy Missile is a casual arcade mobile game where players use tilt controls to collect scrap from the ocean to build a rocket and blow up the moon.',
		body: 'Nothing yet'
	}}
/>
