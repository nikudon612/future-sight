import { getSession } from '$lib/server/session';  // Import getSession from session.ts
import { supabase } from '$lib/server/supabase';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  // Get the session using the custom function
  const sessionData = await getSession(event.request);

  if (sessionData && sessionData.user) {
    // Store the user in event.locals so it's available in the route handlers
    event.locals.user = sessionData.user;
  }

  // Proceed with the request
  return resolve(event);
};
