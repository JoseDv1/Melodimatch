import { signOut } from '../supabase/auth.js';

// ----------------------- Spotify API ----------------------- //
export function getSpotifyAccessToken(session) {
	const spotifyAccessToken = session.provider_token;

	if (!spotifyAccessToken) {
		signOut();
	}

	return spotifyAccessToken;
}

// Get user top artists
export async function getTopArtists(spotifyAccessToken, limit = 5) {
	const userTopArtistReq = await fetch(`https://api.spotify.com/v1/me/top/artists?limit=${limit}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${spotifyAccessToken}`
		}
	});

	const UserTopArtist = await userTopArtistReq.json();
	return UserTopArtist;
}

// Get user top tracks
export async function getTopTracks(spotifyAccessToken, limit = 5) {
	const userTopTracksReq = await fetch(
		`https://api.spotify.com/v1/me/top/tracks?limit=${limit}&time_range=long_term`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${spotifyAccessToken}`
			}
		}
	);

	const UserTopTracks = await userTopTracksReq.json();
	return UserTopTracks;
}

// Get user saved tracks
export async function getSavedTracks(spotifyAccessToken, limit = 5) {
	const UsersSavedTracksReq = await fetch(`https://api.spotify.com/v1/me/tracks?limit=${limit}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${spotifyAccessToken}`
		}
	});

	const UsersSavedTracks = await UsersSavedTracksReq.json();
	return UsersSavedTracks;
}

// Get a song embed
export async function getSongEmbed(trackRef) {
	const trackURL = trackRef.external_urls?.spotify;
	const songEmbedReq = await fetch(`https://open.spotify.com/oembed?url=${trackURL}`, {
		method: 'GET'
	});
	const songEmbed = await songEmbedReq.json();
	return songEmbed;
}

// Get an Artist
export async function getArtist(spotifyAccessToken, artistId) {
	const artistReq = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${spotifyAccessToken}`
		}
	});
	const artist = await artistReq.json();
	return artist;
}

// Get recomendations
export async function getRecommendations(spotifyAccessToken, trackRef, limit = 100) {
	try {
		// All Genres
		const allGenres = [
			'acoustic',
			'afrobeat',
			'alt-rock',
			'alternative',
			'ambient',
			'anime',
			'black-metal',
			'bluegrass',
			'blues',
			'bossanova',
			'brazil',
			'breakbeat',
			'british',
			'cantopop',
			'chicago-house',
			'children',
			'chill',
			'classical',
			'club',
			'comedy',
			'country',
			'dance',
			'dancehall',
			'death-metal',
			'deep-house',
			'detroit-techno',
			'disco',
			'disney',
			'drum-and-bass',
			'dub',
			'dubstep',
			'edm',
			'electro',
			'electronic',
			'emo',
			'folk',
			'forro',
			'french',
			'funk',
			'garage',
			'german',
			'gospel',
			'goth',
			'grindcore',
			'groove',
			'grunge',
			'guitar',
			'happy',
			'hard-rock',
			'hardcore',
			'hardstyle',
			'heavy-metal',
			'hip-hop',
			'holidays',
			'honky-tonk',
			'house',
			'idm',
			'indian',
			'indie',
			'indie-pop',
			'industrial',
			'iranian',
			'j-dance',
			'j-idol',
			'j-pop',
			'j-rock',
			'jazz',
			'k-pop',
			'kids',
			'latin',
			'latino',
			'malay',
			'mandopop',
			'metal',
			'metal-misc',
			'metalcore',
			'minimal-techno',
			'movies',
			'mpb',
			'new-age',
			'new-release',
			'opera',
			'pagode',
			'party',
			'philippines-opm',
			'piano',
			'pop',
			'pop-film',
			'post-dubstep',
			'power-pop',
			'progressive-house',
			'psych-rock',
			'punk',
			'punk-rock',
			'r-n-b',
			'rainy-day',
			'reggae',
			'reggaeton',
			'road-trip',
			'rock',
			'rock-n-roll',
			'rockabilly',
			'romance',
			'sad',
			'salsa',
			'samba',
			'sertanejo',
			'show-tunes',
			'singer-songwriter',
			'ska',
			'sleep',
			'songwriter',
			'soul',
			'soundtracks',
			'spanish',
			'study',
			'summer',
			'swedish',
			'synth-pop',
			'tango',
			'techno',
			'trance',
			'trip-hop',
			'turkish',
			'work-out',
			'world-music'
		];

		const seedArtists = trackRef.artists[0].id;
		const seedTracks = trackRef.id;
		// RAndom Genre recommendation
		const seedGenres = allGenres[Math.floor(Math.random() * allGenres.length)];

		const recommendationReq = await fetch(
			`https://api.spotify.com/v1/recommendations?limit=${limit}&seed_artists=${seedArtists}&seed_genres=${seedGenres}&seed_tracks=${seedTracks}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${spotifyAccessToken}`
				}
			}
		);
		const recommendations = await recommendationReq.json();
		return recommendations;
	} catch (error) {
		console.log(error);
	}
}

// ----------------------- Melodimatch Playlist ----------------------- //
// Create Melodimatch Playlist
export async function createMelodimatchPlaylist(spotifyAccessToken, userId) {
	try {
		const playlistReq = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${spotifyAccessToken}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: 'Melodimatch',
				description: 'Playlist creada por Melodimatch',
				public: false
			})
		});
		const playlist = await playlistReq.json();
		return playlist;
	} catch (error) {
		console.log(error);
	}
}

// Get Melodimatch Playlist
export async function getMelodimatchPlaylist(spotifyAccessToken, userId, limit = 50) {
	try {
		const playlistReq = await fetch(
			`https://api.spotify.com/v1/users/${userId}/playlists?limit=${limit}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${spotifyAccessToken}`
				}
			}
		);
		const playlist = await playlistReq.json();

		// Dentro de playlist.items busca el playlist que tenga el nombre Melodimatch
		const melodimatchPlaylist = playlist.items.find((playlist) => playlist.name === 'Melodimatch');

		// Si no existe, crea una nueva
		if (!melodimatchPlaylist) {
			const newMelodimatchPlaylist = await createMelodimatchPlaylist(spotifyAccessToken, userId);
			return newMelodimatchPlaylist;
		}

		return melodimatchPlaylist;
	} catch (error) {
		console.log(error);
	}
}

// Get melodimatch playlist tracks
export async function getMelodimatchPlaylistTracks(
	spotifyAccessToken,
	melodimatchPlaylistRef,
	limit = 50
) {
	try {
		const playlistId = melodimatchPlaylistRef.id;
		const playlistTracksReq = await fetch(
			`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=${limit}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${spotifyAccessToken}`
				}
			}
		);
		const playlistTracks = await playlistTracksReq.json();
		return playlistTracks;
	} catch (error) {
		console.log(error);
	}
}

// Add tracks to melodimatch playlist
export async function addTracksToMelodimatchPlaylist(
	spotifyAccessToken,
	melodimatchPlaylistRef,
	trackRef
) {
	try {
		const playlistId = melodimatchPlaylistRef.id;
		const addTracksReq = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${spotifyAccessToken}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				uris: [trackRef.uri]
			})
		});
		const addTracks = await addTracksReq.json();
		return addTracks;
	} catch (error) {
		console.log(error);
	}
}
