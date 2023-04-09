export function getSpotifyAccessToken(session) {
	const spotifyAccessToken = session.provider_token;
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
	const trackURL = trackRef.external_urls.spotify;
	const songEmbedReq = await fetch(`https://open.spotify.com/oembed?url=${trackURL}`, {
		method: 'GET'
	});
	const songEmbed = await songEmbedReq.json();
	return songEmbed;
}

// Get recomendations
export async function getRecommendations(spotifyAccessToken, trackRef, limit = 100) {
	const seedArtists = trackRef.artists.map((artist) => artist.id).join(',');
	const seedTracks = trackRef.id;
	const seedGenres = 'world-music';

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
}
