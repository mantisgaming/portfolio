<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';

	const showProjects = $derived(new MediaQuery('min-width: 1280px', false).current);
</script>

<svelte:head>
	<title>Max Allen | Computer Graphics & Animation</title>
</svelte:head>

<section>
	<h1>Computer Graphics & Animation</h1>
</section>
<section>
	<h2>Project Demos</h2>
	{#if showProjects}
		<h3>WebGL Graphics Engine</h3>
		<embed
			src="/project/computer-graphics-animation/graphics-2/index.html"
			width={1280}
			height={720}
		/>
		<h3>WebGL Raytracing</h3>
		<embed
			src="/project/computer-graphics-animation/graphics-3/index.html"
			width={1280}
			height={762}
		/>
		<h3>WebGL Animation</h3>
		<embed
			src="/project/computer-graphics-animation/animation/final-project.html"
			width={1280}
			height={720}
		/>
	{:else}
		<p>
			My computer graphics and animation projects are built in WebGL and published here, but your
			device is not large enough to display them. Please view this page on a computer with a
			resolution of at least 1280 x 720 to view the projects.
		</p>
	{/if}
</section>

<style>
	embed {
		display: block;
		margin: 1rem 0;
		left: 50%;
		transform: translate(-50%, 0);
		position: relative;
	}
</style>
