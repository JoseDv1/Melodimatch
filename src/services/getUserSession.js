import { auth } from '../supabase/auth.js';

export async function getUserSession() {
	const { data, error } = await auth.getSession();
	const { session } = data;

	if (!session) {
		window.location.href = '/access';
	}

	if (error) {
		return error;
	}

	return session;
}
