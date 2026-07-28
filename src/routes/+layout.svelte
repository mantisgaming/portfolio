<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Nav from './_components/nav.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
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
		box-sizing: border-box;
	}

	:global(body) {
		--bg-color: #818181;
		--header-bg-color: #3a3a3a;
		--header-color: #d3d3d3;
		--page-width: 90%;

		--columns: 1;

		@media screen and (min-width: 750px) {
			--page-width: 700px;
		}

		@media screen and (min-width: 1200px) {
			--page-width: 1100px;
			--columns: 3;
		}

		@media screen and (min-width: 1500px) {
			--page-width: 1400px;
		}

		margin: 0;
		background-color: var(--bg-color);
	}

	main {
		width: var(--page-width);
		margin: 0 calc((100vw - var(--page-width)) / 2);
	}
</style>
