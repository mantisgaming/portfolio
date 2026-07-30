<script>
	import GameCard from '$lib/components/gameCard.svelte';
	import fishyMissileIcon from '$lib/assets/fishy-missile.png';
</script>

<svelte:head>
	<title>Max Allen | Portfolio</title>
</svelte:head>

<GameCard
	gameTitle="Fishy Missile"
	teamSize={7}
	thumbnail={{ src: fishyMissileIcon, alt: 'Fishy Missile icon' }}
/>
