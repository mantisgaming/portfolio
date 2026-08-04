<script lang="ts">
	const currentYear = new Date().getFullYear();
	const copyrightYears = currentYear == 2026 ? 2026 : `2026-${currentYear}`;
</script>

<footer>
	<p>
		<small>
			Website developed, hosted, and maintained by Max Allen.<br />
			&copy;{copyrightYears} Max Allen
		</small>
	</p>
</footer>

<style lang="scss">
	footer {
		background-color: var(--header-bg-color);
		text-align: center;
		* {
			color: var(--header-color);
		}
	}
</style>
