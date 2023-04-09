<script>
	import AltLogin from '../../Components/AltLogin.svelte';

	let isNewUser = true;

	const SwapForm = () => {
		isNewUser = !isNewUser;
	};
</script>

<div class="login-page">
	<h1>Melodymatch</h1>
	<p>
		Melody match is a music discovery app that helps you find new music based on your favorite
		artists and songs.
	</p>
	<p class="sign">Sign in with Spotify to get started.</p>
	<hr />
	<AltLogin />
</div>

<style>
	.login-page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.login-page h1 {
		font-size: 3.5rem;
		margin: 0 0 1rem 0;
	}

	.login-page p {
		font-size: 1.5rem;
		margin: 0 0 1rem 0;
		text-align: center;
	}

	.login-page p.sign {
		margin: 1.5rem 0 0 0;
		font-size: 1.2rem;
	}

	:global(.login-page > *:not(h1)) {
		padding: 0 10%;
	}

	hr {
		margin: 1.5rem 0;
		width: 80%;
	}
</style>
