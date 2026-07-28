<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<nav>
	<div>
		<h1><a href={resolve('/')}>Max Allen</a></h1>
		<p>Systems Programmer</p>
		<div class="spacer"></div>
		<a href={resolve('/resume')}>Resume</a>
	</div>
</nav>

<style lang="scss">
	nav {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		background-color: var(--header-bg-color);
		color: var(--header-color);

		> div {
			display: flex;
			flex-direction: row;
			align-items: baseline;
			justify-content: center;
			gap: 1rem;
			height: 5rem;
			width: 100%;
			max-width: var(--page-width);
		}

		> * {
			margin: 0;
		}

		a {
			color: var(--header-color);
			font-weight: bold;
			text-decoration: none;
		}
	}

	.spacer {
		flex-grow: 1;
	}
</style>
