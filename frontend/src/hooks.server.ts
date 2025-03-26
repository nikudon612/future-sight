import type { Handle } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabase';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionCookie = event.cookies.get('session');

	if (sessionCookie) {
		try {
			const session = JSON.parse(sessionCookie);
			const { data: user } = await supabase
				.from('users')
				.select('*')
				.eq('id', session.id)
				.single();

			if (user) {
				event.locals.user = user;
			}
		} catch (e) {
			console.warn('Invalid session cookie');
		}
	}

	return resolve(event);
};
