<script>
	//  Importing the functions from the services folder
	import { onMount } from 'svelte';
	import {
		getSongEmbed,
		getSavedTracks,
		getSpotifyAccessToken,
		getRecommendations,
		getMelodimatchPlaylist,
		getMelodimatchPlaylistTracks,
		addTracksToMelodimatchPlaylist,
		getArtist
	} from '../../services/spotify.js';
	import { getUserSession } from '../../services/getUserSession.js';
	import Loader from '../../Components/Loader.svelte';
	import LikeSvg from '../../Components/LikeSVG.svelte';
	import NextSvg from '../../Components/NextSVG.svelte';

	// Dev States

	//  State variables
	let melodimatchPlaylist = {};
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
	let spotifyUserId = '';
	let accessToken = '';

	// Handle the skip button
	function handleSkip() {
		currentTrack++;
		track = recomendations.tracks[currentTrack];
	}

	// Handle the like button
	async function handleLike() {
		console.log('Like');
		await addTracksToMelodimatchPlaylist(accessToken, melodimatchPlaylist, track);
		handleSkip();
	}

	// On mount, get the user session, the access token, the saved tracks, the first track as the principal recomendation, the recomendations based on the principal recomendation and set the first recomendation as the current track
	onMount(async () => {
		// Get the user session and the access token
		const session = await getUserSession();
		accessToken = await getSpotifyAccessToken(session);
		spotifyUserId = session.user.user_metadata?.provider_id;

		// Get the meloymatch playlist
		melodimatchPlaylist = await getMelodimatchPlaylist(accessToken, spotifyUserId);

		// Get the Melodimatch playlist tracks
		const melodimatchPlaylistTracks = await getMelodimatchPlaylistTracks(
			accessToken,
			melodimatchPlaylist
		);

		// Get saved tracks
		savedTracks = await getSavedTracks(accessToken);

		// If melodimatch playlist is not empty, set the first track of the playlist as the principal recomendation
		recomendationBaseTrack =
			melodimatchPlaylistTracks.items.length > 0
				? melodimatchPlaylistTracks.items[melodimatchPlaylistTracks.items.length - 1].track
				: savedTracks.items[0].track;

		// Get recomendations based on the principal recomendation
		recomendations = await getRecommendations(accessToken, recomendationBaseTrack);

		// Set the first recomendation as the current track
		track = recomendations.tracks[currentTrack];
	});
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
		<button on:click={handleLike} class="like"><LikeSvg /></button>
		<button on:click={handleSkip} class="skip"> <NextSvg /></button>
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
		gap: 1rem;
		height: 50%;
	}

	.buttons {
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		gap: 1rem;
		width: 100%;
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

	.buttons button {
		height: 5rem;
		aspect-ratio: 1/1;
		border: none;
		border-radius: 50%;
		font-size: 1.5rem;
		font-weight: 600;
		cursor: pointer;
		margin-top: 5rem;
		display: grid;
		place-items: center;
	}
</style>
