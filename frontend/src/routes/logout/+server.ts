import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	// Clear the session cookie
	cookies.delete('session', { path: '/' });

	throw redirect(302, '/');
};
