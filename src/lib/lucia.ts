import { Lucia } from 'lucia';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { dev } from '$app/environment';

import { db } from '$lib/server/db';
import { session, key, user } from '$lib/server/db/schema';

const adapter = new DrizzlePostgreSQLAdapter(db, session, key);

export const auth = new Lucia(adapter, {
	getUserAttributes: (rawUser) => {
		const userData = rawUser as typeof user.$inferSelect;

		return {
			userId: userData.id,
			username: userData.username,
			avatar: userData.avatar_url ?? null,
			email: userData.email ?? null,
			globalName: userData.global_name ?? null,

		};
	}
});
