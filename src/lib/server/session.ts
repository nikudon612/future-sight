import { parse } from 'cookie';
import { supabase } from '$lib/server/supabase';

// Function to get the session from request cookies
export async function getSession(request: Request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = parse(cookieHeader);

  const sessionCookie = cookies['auth-session'];  // Make sure this is the cookie set by Supabase (auth-session or your custom name)

  if (sessionCookie) {
    try {
      // Use Supabase to get the user from the session cookie
      const { user, error } = await supabase.auth.api.getUserByCookie(request);

      if (error || !user) {
        console.warn('Invalid or expired session', error);
        return null;
      }

      // Return the user if the session is valid
      return { user, session: sessionCookie };
    } catch (e) {
      console.warn('Error parsing session cookie:', e);
      return null;
    }
  }

  return null;  // Return null if no session cookie is found
}
