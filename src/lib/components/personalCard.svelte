<script lang="ts">
	import portrait from '$lib/assets/portrait.jpg';
</script>

<div class="card">
	<img src={portrait} alt="Portrait of Max Allen" />
	<div class="info">
		<div class="row">
			<h1>Max Allen</h1>
			<p>Systems Programmer</p>
		</div>
		<p>
			I recently graduated from WPI with a double major in Interactive Media & Game Design and
			Computer Science. My primary focus is on technical game programming, though I am knowledgeable
			in all fields of game development.
		</p>
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

		max-width: 1000px;

		* {
			color: var(--header-color);
		}

		img {
			width: 100%;
			aspect-ratio: 1/1;
			border-radius: 1rem;
		}
	}

	.info {
		:first-child {
			margin-top: 0;
		}
	}

	.row {
		h1 {
			margin-bottom: 0;
		}

		+ * {
			margin-top: 0;
		}
	}
</style>
