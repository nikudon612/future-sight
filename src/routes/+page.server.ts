import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
  // Access the authenticated user from event.locals
  const user = locals.user;

  if (!user) {
    // If there's no user (i.e., they are not authenticated), redirect to the login page
    throw redirect(302, '/login');
  }

  // Return the user to be used in the page
  return { user };
}
