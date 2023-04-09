<script>
	import { onMount } from 'svelte';
	import {
		getSongEmbed,
		getSavedTracks,
		getSpotifyAccessToken,
		getRecommendations
	} from '../../services/spotify.js';
	import { getUserSession } from '../../services/getUserSession.js';
	import Loader from '../../Components/Loader.svelte';

	let currentTrack = 0;
	let savedTracks = {};
	let recomendations = {};
	let recomendationBaseTrack = {};
	let track = {
		artists: [
			{
				name: 'Loading...'
			}
		],
		name: ''
	};

	onMount(async () => {
		// Get the user session and the access token
		const session = await getUserSession();
		const accessToken = await getSpotifyAccessToken(session);

		// Get saved tracks and set the first track as the principal recomendation
		savedTracks = await getSavedTracks(accessToken);
		recomendationBaseTrack = savedTracks.items[0].track;

		// Get recomendations based on the principal recomendation
		recomendations = await getRecommendations(accessToken, recomendationBaseTrack);

		// Set the first recomendation as the current track
		track = recomendations.tracks[currentTrack];
	});

	// Update the current track when the currentTrack variable changes and the track is not undefined or 0 (the first track)
	$: {
		async function updateTrack() {
			if (track == undefined) return;
			if (currentTrack == 0) return;

			track = recomendations.tracks[currentTrack];
		}

		updateTrack();
	}
</script>

<div class="feed">
	<div class="main">
		<div class="song">
			{#await getSongEmbed(track)}
				<Loader />
			{:then songEmbedHtml}
				{@html songEmbedHtml.html}
			{/await}
		</div>
		<div class="title">
			<h1>{track?.name}</h1>
			<h2>{track?.artists[0].name}</h2>
		</div>
	</div>
	<div class="buttons">
		<button on:click={() => {}}>X</button>
		<button
			on:click={() => {
				currentTrack++;
			}}>Skip</button
		>
		<button> Like </button>
	</div>
</div>

<style>
	.feed {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		width: 100%;
	}

	.main {
		width: 100%;
		padding: 0 10%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	.buttons {
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		gap: 1rem;
		width: 100%;
	}

	.buttons button {
		width: 100px;
		height: 50px;
		border: none;
		border-radius: 1rem;
	}

	.buttons button:hover {
		cursor: pointer;
	}

	.song {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.title {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
</style>
