import { redirect, type RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { auth } from '$lib/lucia';
import { user as userTable } from '$lib/server/db/schema';
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_SERVER_ID } from '$env/static/private';
import { eq } from 'drizzle-orm';

const REDIRECT_URI = 'http://localhost:5173/callback';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const code = url.searchParams.get('code');
	if (!code) throw redirect(302, '/');

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
	if (!tokenRes.ok || !tokenData.access_token) {
		console.error('Token fetch error:', tokenData);
		throw redirect(302, '/error');
	}
	const access_token = tokenData.access_token;

	const userRes = await fetch('https://discord.com/api/users/@me', {
		headers: { Authorization: `Bearer ${access_token}` }
	});
	const discordUser = await userRes.json();

	// ✅ Safety check
	if (!discordUser?.id || typeof discordUser.id !== 'string') {
		console.error('❌ Invalid Discord user ID:', discordUser);
		throw redirect(302, '/error');
	}

	const guildRes = await fetch('https://discord.com/api/users/@me/guilds', {
		headers: { Authorization: `Bearer ${access_token}` }
	});
	const guilds = await guildRes.json();
	if (!Array.isArray(guilds)) {
		console.error('Guild fetch error:', guilds);
		throw redirect(302, '/error');
	}
	const isMember = guilds.some((guild: any) => guild.id === DISCORD_SERVER_ID);
	if (!isMember) throw redirect(302, '/not-authorized');

	const avatar_url = discordUser.avatar
		? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`
		: null;

	const userId = discordUser.id;

	const existing = await db
		.select()
		.from(userTable)
		.where(eq(userTable.id, userId));

	if (existing.length === 0) {
		await db.insert(userTable).values({
			id: userId,
			username: discordUser.username,
			avatar_url
		});
	}

	// ✅ Double-check before creating the session
	if (!userId) {
		console.error('❌ Cannot create session without valid userId');
		throw redirect(302, '/error');
	}

	const session = await auth.createSession(userId, {});

	cookies.set('session', session.id, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: false,
		maxAge: 60 * 60 * 24 * 7
	});

	throw redirect(302, '/dashboard');
};
