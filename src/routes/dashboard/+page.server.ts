import { redirect } from "@sveltejs/kit";
import { getSession } from "$lib/server/session";

export const load = async ({ request }) => {
  const session = getSession(request);
  // throws error here? Log it:
  console.log("session", session);

  if (!session || !session.id) {
    throw redirect(302, "/login");
  }

  return {
    userId: session.id,
  };
};
