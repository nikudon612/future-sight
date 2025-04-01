// src/routes/login/+server.ts
import { redirect } from '@sveltejs/kit';
import { DISCORD_CLIENT_ID } from '$env/static/private';

const REDIRECT_URI = 'http://localhost:5173/callback';

export async function GET() {
	const params = new URLSearchParams({
		client_id: DISCORD_CLIENT_ID,
		redirect_uri: REDIRECT_URI,
		response_type: 'code',
		scope: 'identify email guilds'
	});

	throw redirect(302, `https://discord.com/api/oauth2/authorize?${params}`);
}
