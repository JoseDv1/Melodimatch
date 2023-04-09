<script>
	import { signInWithSpotify } from '../supabase/auth.js';

	const handleSpotify = async () => {
		const { data, error } = await signInWithSpotify();
		if (error) console.log(error);
		console.log(data);
	};
</script>

<div class="alt_login">
	<button on:click={handleSpotify}>
		<img src="https://img.icons8.com/color/48/000000/spotify--v1.png" alt="Spotify" />
		Continue with Spotify
	</button>
</div>

<style>
	.alt_login {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
	}

	.alt_login button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.5rem;
		border: none;
		border-radius: 5px;
		background: #000;
		color: #fff;
		cursor: pointer;
		font-size: 1.2rem;
	}

	.alt_login button img {
		width: 2rem;
	}
</style>
