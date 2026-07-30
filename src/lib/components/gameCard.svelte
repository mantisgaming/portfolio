<script lang="ts">
	const {
		gameTitle = $bindable(''),
		teamSize = $bindable(0),
		thumbnail = undefined
	}: {
		gameTitle: string;
		teamSize: number;
		thumbnail?: {
			src: string;
			alt: string;
		};
	} = $props();
</script>

<div class="card">
	{#if thumbnail}
		<img src={thumbnail?.src} alt={thumbnail?.alt} />
	{/if}
	<div class="body">
		<h2>{gameTitle}</h2>

		<div class="row">
			<p>Team Size: {teamSize}</p>
		</div>
	</div>
</div>

<style lang="scss">
	.card {
		background-color: var(--header-bg-color);
		border-radius: 2rem;
		padding: 2rem;
		margin: 3rem auto;

		box-shadow: 0.5rem 0.5rem 2rem black;

		display: flex;
		flex-direction: column;
		gap: 2rem;

		* {
			color: var(--header-color);
		}
	}
</style>
