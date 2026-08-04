<script lang="ts">
	import favicon from '$lib/assets/favicon.png';
	import Nav from '$lib/components/nav.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<script src="https://kit.fontawesome.com/03ca4d4b08.js" crossorigin="anonymous"></script>
	<meta name="theme-color" content="#3a3a3a" />
</svelte:head>

<Nav />
<main>
	{@render children()}
</main>

<style lang="scss">
	:global(*) {
		box-sizing: border-box;
	}

	:global(body) {
		font-family:
			'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana,
			sans-serif;

		--bg-color: #a1a1a1;
		--color: #1a1a1a;
		--header-bg-color: #3a3a3a;
		--header-color: #ececec;
		--page-width: 90%;

		background-color: var(--header-bg-color);

		margin: 0;
		min-height: 100vh;
	}

	:global(a, p) {
		color: var(--color);
	}

	main {
		width: 100%;
		min-height: 100vh;
		position: relative;
		top: 0;
		padding: 5rem calc((100vw - var(--page-width)) / 2) 0;
		background-color: var(--bg-color);
		z-index: 10;
		display: flow-root;
	}
</style>
