import { redirect, type RequestHandler } from "@sveltejs/kit";
import { supabase } from "../../lib/server/supabase";


const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID!;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET!;
const REDIRECT_URI = "http://localhost:5173/callback";

const DISCORD_SERVER_ID = process.env.DISCORD_SERVER_ID!;

export const GET: RequestHandler = async ({ url, cookies }) => {
  try {
    const code = url.searchParams.get("code");
    if (!code) throw redirect(302, "/");

    // Exchange code for access token
    const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI,
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok) {
      console.error("Token error:", tokenData);
      throw new Error("Failed to exchange code for token");
    }

    const access_token = tokenData.access_token;

    // Fetch user info
    const userRes = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const discordUser = await userRes.json();

    // Fetch user guilds
    const guildRes = await fetch("https://discord.com/api/users/@me/guilds", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const guilds = await guildRes.json();

    // 🚨 Add this check
    if (!Array.isArray(guilds)) {
      console.error("Guild fetch failed or returned non-array:", guilds);
      throw new Error("Invalid guilds response");
    }

    const isMember = guilds.some(
      (guild: any) => guild.id === DISCORD_SERVER_ID
    );

    if (!isMember) {
      console.log("User not in server:", discordUser);
      throw redirect(302, "/not-authorized");
    }

    console.log("Attempting insert with:", {
      discord_id: discordUser.id,
      email: discordUser.email,
    });

    const { data: user, error } = await supabase
      .from("users")
      .upsert({
        discord_id: discordUser.id,
        email: discordUser.email,
      })
      .select()
      .single();

    console.log("Insert result:", { user, error });

    if (error || !user) {
      console.error("Supabase error:", error);
      throw redirect(302, "/error");
    }

    cookies.set("session", JSON.stringify({ id: user.id }), {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 60 * 60 * 24 * 7,
    });

    throw redirect(302, "/");
  } catch (err) {
    console.error("OAuth callback error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
};
