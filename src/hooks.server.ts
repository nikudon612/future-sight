import { supabase } from '$lib/server/supabaseClient';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const sessionCookie = event.cookies.get('session');

  if (sessionCookie) {
    try {
      // Try to parse the session cookie into a JSON object
      let session = null;
      try {
        session = JSON.parse(sessionCookie); // Parse it as JSON
      } catch (e) {
        console.warn('Invalid session cookie:', e);
      }

      if (session) {
        // Fetch user from the Supabase users table using the session ID
        const { data: user, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.id) // Match the session ID with the user table
          .single();

        if (error) {
          console.error('Error fetching user:', error);
        }

        if (user) {
          event.locals.user = user;
        }
      }
    } catch (e) {
      console.warn('Error with session or user retrieval:', e);
    }
  }

  return resolve(event);
};
