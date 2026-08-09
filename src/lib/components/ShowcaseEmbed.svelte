<script lang="ts">
	const {
		src,
		width = 1280,
		height = 720
	}: {
		src: string;
		width?: number;
		height?: number;
	} = $props();
</script>

<div class="container">
	<embed {src} {width} {height} />
	<p>The project cannot be displayed on this device.</p>
</div>

<style lang="scss">
	p {
		display: none;
	}

	embed {
		display: block;
	}

	@media screen and (max-width: 1280px) {
		embed {
			display: none;
		}

		p {
			display: block;
		}
	}
    
    .container {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
</style>
