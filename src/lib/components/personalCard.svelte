<script lang="ts">
	import portrait from '$lib/assets/portrait.jpg';
	import Card from './card.svelte';
</script>

<Card image={{ src: portrait, alt: 'Photo of Max Allen' }}>
	<h1>Max Allen</h1>
	<p class="subtitle">Systems Programmer</p>
	<p>
		I recently graduated from WPI with a double major in "Interactive Media & Game Development" and
		"Computer Science". My primary focus is on technical game programming, though I am knowledgeable
		in all fields of game development.
	</p>
</Card>

<style lang="scss">
	.subtitle {
		text-align: center;
	}

	:has(+.subtitle) {
		margin-bottom: 0;
	}
</style>
