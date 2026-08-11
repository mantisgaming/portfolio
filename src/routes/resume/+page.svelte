<script lang="ts">
	import { asset } from '$app/paths';

	const resumePath: string = '/max-allen-resume.pdf';
</script>

<svelte:head>
	<title>Max Allen | Resume</title>
</svelte:head>

<section>
	<h1>Resume</h1>
	<div class="row">
		<a href={asset('/max-allen-resume.pdf')} target="_blank">Open in new tab</a>
		<a href={asset('/max-allen-resume.pdf')} download>Download</a>
	</div>
	<div class="container">
		<embed src={resumePath} width="100%" height="500px" type="application/pdf" />
	</div>
</section>

<style lang="scss">
	.container {
		container-type: inline-size;
	}

	.row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin: 0 0 0.5rem;
	}

	embed {
		width: 100cqw;
		height: 130cqw;
	}
</style>
