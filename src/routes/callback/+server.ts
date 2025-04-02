import { redirect, type RequestHandler } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabase';

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID!;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET!;
const REDIRECT_URI = 'http://localhost:5173/callback';
const DISCORD_SERVER_ID = process.env.DISCORD_SERVER_ID!;

export const GET: RequestHandler = async ({ url, cookies }) => {
	const code = url.searchParams.get('code');
	if (!code) return redirect(302, '/');

	// 1. Exchange code for token
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
		return redirect(302, '/error');
	}

	const access_token = tokenData.access_token;

	// 2. Fetch Discord user
	const userRes = await fetch('https://discord.com/api/users/@me', {
		headers: { Authorization: `Bearer ${access_token}` }
	});
	const discordUser = await userRes.json();

	if (!discordUser?.id) {
		console.error('Invalid user:', discordUser);
		return redirect(302, '/error');
	}

	// 3. Fetch Discord guilds
	const guildRes = await fetch('https://discord.com/api/users/@me/guilds', {
		headers: { Authorization: `Bearer ${access_token}` }
	});
	const guilds = await guildRes.json();

	if (!Array.isArray(guilds)) {
		console.error('Invalid guild response:', guilds);
		return redirect(302, '/error');
	}

	const isMember = guilds.some((guild: any) => guild.id === DISCORD_SERVER_ID);
	if (!isMember) return redirect(302, '/not-authorized');

	// 4. Build avatar URL
	const avatar_url = discordUser.avatar
		? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`
		: null;

	// 5. Upsert user into Supabase
	const { data: user, error } = await supabase
		.from('users')
		.upsert(
			{
				discord_id: discordUser.id,
				email: discordUser.email,
				username: discordUser.username,
				global_name: discordUser.global_name ?? null,
				avatar_url
			},
			{ onConflict: 'discord_id' }
		)
		.select()
		.single();

	if (error || !user) {
		console.error('Supabase upsert error:', error);
		return redirect(302, '/error');
	}

	// 6. Set session using the access token
	const { data: session, error: sessionError } = await supabase.auth.setSession(access_token);

	if (sessionError || !session) {
		console.error('Error creating session with Supabase:', sessionError);
		return redirect(302, '/error');
	}

	// 7. Set session cookie
	cookies.set('session', JSON.stringify({ id: user.id }), {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: false, // Use true for production with HTTPS
		maxAge: 60 * 60 * 24 * 7 // 7 days
	});

	// 8. Check if session exists and redirect to the dashboard
	if (session) {
		return redirect(302, '/dashboard');
	} else {
		return redirect(302, '/error');
	}
};
