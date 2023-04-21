<script>
	import MusicSvg from './MusicSVG.svelte';
	import ProfileSvg from './ProfileSVG.svelte';
</script>

<header>
	<a href="/">
		<h1>Melodimatch</h1>
	</a>
	<nav>
		<a href="/profile"><ProfileSvg /></a>
		<a href="/feed"><MusicSvg /></a>
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
	}

	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	a {
		text-decoration: none;
		color: white;
		margin: 0 1rem;
	}

	:global(nav svg) {
		width: 2rem;
		height: 2rem;
	}
</style>
