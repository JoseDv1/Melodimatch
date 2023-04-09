<script>
	import { onMount } from 'svelte';
	import { signOut } from '../../supabase/auth.js';
	import {
		getSpotifyAccessToken,
		getTopArtists,
		getTopTracks,
		getSavedTracks
	} from '../../services/spotify.js';
	import { getUserSession } from '../../services/getUserSession.js';
	import Loader from '../../Components/Loader.svelte';

	// State variables
	let name = '';
	let img = '';
	let artist = [];
	let songs = [];
	let savedSongs = [];
	let loading = true;

	onMount(async () => {
		try {
			const session = await getUserSession();
			const spotifyAccessToken = getSpotifyAccessToken(session);

			if (!spotifyAccessToken) {
				throw new Error('No Spotify Access Token');
			}

			const [userTopArtist, userTopTracks, UsersSavedTracks] = await Promise.all([
				getTopArtists(spotifyAccessToken, 5),
				getTopTracks(spotifyAccessToken, 5),
				getSavedTracks(spotifyAccessToken, 5)
			]);

			name = session.user.user_metadata.full_name;
			img = session.user.user_metadata.avatar_url;
			artist = userTopArtist.items;
			songs = userTopTracks.items;
			savedSongs = UsersSavedTracks.items;
		} catch (error) {
			console.log(error);
		} finally {
			loading = false;
		}
	});
</script>

<div class="profile_page">
	{#if loading}
		<div class="loader">
			<Loader />
		</div>
	{:else}
		<div class="profile">
			<img src={img} alt="Profile" />
			<span>
				{name}
			</span>
		</div>
		<div class="info">
			<div class="card">
				<h1>Top Artist</h1>
				<ul class="card-data">
					{#each artist as artist}
						<li>
							<img src={artist.images[0].url} alt={artist.name} />
							<span>{artist.name}</span>
						</li>
					{/each}
				</ul>
			</div>

			<div class="card">
				<h1>Top Songs</h1>
				<ul class="card-data">
					{#each songs as song}
						<li>
							<img src={song.album.images[0].url} alt={song.name} />
							<span>{song.name} - {song.artists[0].name} </span>
						</li>
					{/each}
				</ul>
			</div>

			<div class="card">
				<h1>Saved Songs</h1>
				<ul class="card-data">
					{#each savedSongs as song}
						<li>
							<img src={song.track.album.images[0].url} alt={song.track.name} />
							<span>{song.track.name} - {song.track.artists[0].name} </span>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="logout">
			<button on:click={signOut}>Logout</button>
		</div>
	{/if}
</div>

<style>
	.profile_page {
		align-items: center;
		justify-content: center;
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.profile_page {
		align-items: center;
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.profile {
		margin: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	.profile img {
		width: 100px;
		height: 100px;
		border-radius: 50%;
	}

	.profile span {
		font-size: 1.5rem;
	}

	.info {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		width: 100%;
		padding: 0 10%;
	}

	.card {
		backdrop-filter: blur(10px);
		background-color: #eaeaea88;
		border-radius: 0.5rem;
		color: #232323;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
	}

	.card-data {
		display: flex;
		flex-direction: column;
		list-style: none;
		gap: 1rem;
	}

	.card-data li {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.card-data li img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}

	.card-data li span {
		font-size: 1.2rem;
	}

	.logout {
		margin: 1rem;
	}

	.logout button {
		backdrop-filter: blur(10px);
		background-color: #eaeaea88;
		border-radius: 0.5rem;
		border: none;
		color: #232323;
		cursor: pointer;
		font-size: 1.2rem;
		padding: 0.5rem 1rem;
	}
</style>
