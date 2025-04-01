import { Lucia } from 'lucia';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { dev } from '$app/environment';

import { db } from '$lib/server/db';
import { session, user, key } from '$lib/server/db/schema';

const adapter = new DrizzlePostgreSQLAdapter(db, session, key);

export const auth = new Lucia(adapter, {
	env: dev ? 'DEV' : 'PROD',
	transformUserData: (userData) => ({
		userId: userData.id,
		username: userData.username,
		avatar: userData.avatar_url
	})
});
