import { supabase } from './client.js';

export const auth = supabase.auth;

// Crear un usuario
export async function signUpWithEmail(email, password) {
	const { data, error } = await auth.signUp({ email, password });
	return { data, error };
}

// Iniciar sesión
export async function signInWithEmail(email, password) {
	const { data, error } = await auth.signInWithPassword({ email, password });
	return { data, error };
}

// iniciar sesión con Spotify
export async function signInWithSpotify() {
	const { data, error } = await auth.signInWithOAuth({
		provider: 'spotify',
		// All scopes
		options: {
			scopes:
				'user-read-email user-read-private user-read-playback-state user-modify-playback-state user-read-currently-playing user-library-read user-library-modify user-top-read user-read-recently-played playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private streaming app-remote-control user-follow-read user-follow-modify'
		}
	});
	return { data, error };
}

// Sign out
export async function signOut() {
	const { error } = await auth.signOut();
	if (error) console.log('Error signing out:', error.message);
	window.location.href = '/';
}
