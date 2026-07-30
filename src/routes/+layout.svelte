<script lang="ts">
	import favicon from '$lib/assets/favicon.png';
	import Nav from '$lib/components/nav.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<script src="https://kit.fontawesome.com/03ca4d4b08.js" crossorigin="anonymous"></script>
</svelte:head>

<Nav />
<main>
	{@render children()}
</main>

<style lang="scss">
	:global(:root) {
		font-family:
			'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana,
			sans-serif;
	}

	:global(*) {
		box-sizing: border-box;
	}

	:global(body) {
		--bg-color: #a1a1a1;
		--color: #1a1a1a;
		--header-bg-color: #3a3a3a;
		--header-color: #ececec;
		--page-width: 90%;

		margin: 0;
		background-color: var(--bg-color);
	}

	:global(a, p) {
		color: var(--color);
		font-weight: bold;
	}
	
	main {
		width: var(--page-width);
		margin: 0 auto;
	}
</style>
