import { redirect } from '@sveltejs/kit';

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID!;
const REDIRECT_URI = 'http://localhost:5173/callback';

export async function GET() {
	const params = new URLSearchParams({
		client_id: DISCORD_CLIENT_ID,
		redirect_uri: REDIRECT_URI,
		response_type: 'code',
		scope: 'identify email guilds' // ← add guilds here
	});

	throw redirect(302, `https://discord.com/api/oauth2/authorize?${params}`);
}
