<script lang="ts">
	import { asset } from '$app/paths';

	const resumePath: string = '/max-allen-resume.pdf';
</script>

<div class="container">
	<div class="row">
		<a href={asset('/max-allen-resume.pdf')} target="_blank">Open in new tab</a>
		<a href={asset('/max-allen-resume.pdf')} download>Download</a>
	</div>
	<embed src={resumePath} width="100%" height="500px" type="application/pdf" />
</div>

<style lang="scss">
	.container {
		margin: 3rem auto;
	}

	.row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin: 0.5rem 0;
	}

	embed {
		width: 100%;
		height: 90vh;
	}
</style>
