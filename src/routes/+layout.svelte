<script>
	import Header from '../Components/Header.svelte';
	import './global.css';
</script>

<!-- Create a layout for a mobile view -->
<div class="layout">
	<Header />
	<main>
		<slot />
	</main>
</div>

<style>
	.layout {
		display: flex;
		flex-direction: column;

		min-height: 100dvh;
		width: 500px;
		box-shadow: 0 0 20px 0px black;
		margin: 0 auto;
		background: rgb(119, 0, 212);
		background: linear-gradient(
			179deg,
			rgba(119, 0, 212, 1) 0%,
			rgba(0, 110, 255, 1) 52%,
			rgba(0, 132, 165, 1) 100%
		);
		background-size: 100%;
		background-attachment: fixed;
	}

	.layout main {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	@media (max-width: 769px) {
		.layout {
			box-shadow: none;
			width: 100%;
		}
	}
</style>
