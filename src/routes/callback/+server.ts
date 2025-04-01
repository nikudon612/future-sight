// src/routes/callback/+server.ts
import { redirect, error, type RequestHandler } from '@sveltejs/kit';
import { auth } from '$lib/lucia'; // your Lucia instance
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_SERVER_ID } from '$env/static/private';

const REDIRECT_URI = 'http://localhost:5173/callback';

export const GET: RequestHandler = async ({ url, cookies }) => {
	// 1. Get the Discord OAuth code
	const code = url.searchParams.get('code');
	if (!code) throw redirect(302, '/');

	// 2. Exchange code for token
	const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			client_id: DISCORD_CLIENT_ID,
			client_secret: DISCORD_CLIENT_SECRET,
			code,
			grant_type: 'authorization_code',
			redirect_uri: REDIRECT_URI
		})
	});
	const tokenData = await tokenRes.json();
	if (!tokenRes.ok) {
		console.error('Token fetch error:', tokenData);
		throw redirect(302, '/error');
	}
	const access_token = tokenData.access_token;

	// 3. Fetch Discord user info
	const userRes = await fetch('https://discord.com/api/users/@me', {
		headers: { Authorization: `Bearer ${access_token}` }
	});
	const discordUser = await userRes.json();
	if (!discordUser?.id) {
		console.error('Invalid user:', discordUser);
		throw redirect(302, '/error');
	}

	// 4. Fetch Discord guilds to verify membership
	const guildRes = await fetch('https://discord.com/api/users/@me/guilds', {
		headers: { Authorization: `Bearer ${access_token}` }
	});
	const guilds = await guildRes.json();
	if (!Array.isArray(guilds)) {
		console.error('Invalid guild response:', guilds);
		throw redirect(302, '/error');
	}
	const isMember = guilds.some((guild: any) => guild.id === DISCORD_SERVER_ID);
	if (!isMember) throw redirect(302, '/not-authorized');

	// 5. Build avatar URL
	const avatar_url = discordUser.avatar
		? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`
		: null;

	// 6. Upsert or create the user and session using Lucia
	// This will depend on your Lucia adapter setup. The following is pseudocode.
	// Adjust the method names based on Lucia’s documentation.
	let user, session;
	try {
		({ user, session } = await auth.handleOAuthCallback('discord', {
			id: discordUser.id,
			email: discordUser.email,
			username: discordUser.username,
			global_name: discordUser.global_name ?? null,
			avatar_url
		}));
	} catch (err) {
		console.error('Lucia OAuth error:', err);
		throw redirect(302, '/error');
	}

	// 7. Set the session cookie
	// Lucia typically returns a session token that you store as a cookie.
	cookies.set('session', session.token, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: false, // set true in production
		maxAge: 60 * 60 * 24 * 7 // 7 days
	});

	// 8. Redirect to the dashboard
	throw redirect(302, '/dashboard');
};
