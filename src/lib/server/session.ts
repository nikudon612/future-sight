import { parse } from 'cookie';
import { supabase } from '$lib/server/supabase';

// Function to get the session from request cookies
export async function getSession(request: Request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = parse(cookieHeader);

  // Log cookies to see what is in the request
  console.log('Cookies:', cookies);

  const sessionCookie = cookies['auth-session'];  // Ensure this is the correct cookie name you set

  // Log session cookie to see if it's being set
  console.log('Session Cookie:', sessionCookie);

  if (sessionCookie) {
    try {
      // Use supabase.auth.getSession() to get the current session from cookies
      const { data: session, error } = await supabase.auth.getSession();
      
      console.log('Supabase session:', session);  // Log the session data

      if (error || !session) {
        console.warn('Invalid or expired session', error);
        return null;
      }

      // Return the user and session if valid
      return { user: session.user, session };
    } catch (e) {
      console.warn('Error parsing session cookie:', e);
      return null;
    }
  }

  return null;  // Return null if no session cookie is found
}
