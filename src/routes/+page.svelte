<script>
	import Login from '@components/Login.svelte';
	import AltLogin from '@components/AltLogin.svelte';
</script>

<main class="page">
	<h1>Melodymatch</h1>
	<Login />
	<hr />
	<AltLogin />
</main>

<style>
	.page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.page h1 {
		font-size: 3rem;
		margin: 0 0 1rem 0;
	}

	:global(.page > *:not(h1)) {
		padding: 0 10%;
	}

	hr {
		margin: 1.5rem 0;
		width: 80%;
	}
</style>
