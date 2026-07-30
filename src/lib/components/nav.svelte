<script lang="ts">
	import { resolve } from '$app/paths';

	var hamburgerVisible = $state(false);

	export function toggleHamburger() {
		hamburgerVisible = !hamburgerVisible;
	}

	export function showHamburger() {
		hamburgerVisible = true;
	}

	export function hideHamburger() {
		hamburgerVisible = false;
	}
</script>

<nav>
	<div class="main-content">
		<a class="title" href={resolve('/')} onclick={hideHamburger}>
			<h1>Max Allen</h1>
			<p>Systems Programmer</p>
		</a>
		<button onclick={toggleHamburger} aria-label="Show Menu">
			<i class="fa-solid fa-bars"></i>
		</button>
	</div>
	<div class={`hamburger${hamburgerVisible ? '' : ' hidden'}`}>
		<hr />
		<a href={resolve('/about')} onclick={hideHamburger}>About</a>
		<a href={resolve('/resume')} onclick={hideHamburger}>Resume</a>
	</div>
</nav>

<style lang="scss">
	nav {
		top: 0;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;

		background-color: var(--header-bg-color);

		* {
			color: var(--header-color);
		}

		a {
			color: var(--header-color);
			font-weight: bold;
			text-decoration: none;
		}

		&::after {
			content: '';
			display: block;
			position: absolute;
			top: 100%;
			width: 100%;
			height: 1rem;
			background-color: transparent;
			background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), transparent);
		}
	}

	.main-content {
		width: 100%;
		position: relative;

		> * {
			padding: 1rem;
		}

		display: flex;
		flex-direction: row;
		align-items: top;
		justify-content: space-between;

		* {
			margin: 0;
		}
	}

	.title {
		display: block;
	}

	button {
		background-color: rgba(0, 0, 0, 0);
		border: none;
		font-size: 2em;
		cursor: pointer;
	}

	.spacer {
		flex-grow: 1;
	}

	.hamburger {
		width: 100%;

		display: block;
		position: relative;

		background-color: inherit;

		> * {
			position: relative;
			padding: 1rem;
			margin: 0;
			width: 100%;
			text-align: center;
			display: block;
		}

		transition-duration: 0.5s;

		&.hidden {
			height: 0;
			overflow: hidden;
		}

		hr {
			padding: 0;
			width: 90%;
			margin: 0.5rem auto;
			border-style: dashed;
			opacity: 50%;
		}
	}
</style>
