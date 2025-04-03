// src/lib/discord.ts
export async function fetchDiscordUser(access_token: string) {
    const res = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
  
    if (!res.ok) {
      throw new Error('Failed to fetch Discord user');
    }
  
    return await res.json();
  }
  