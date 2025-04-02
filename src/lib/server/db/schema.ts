// src/lib/server/db/schema.ts
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: text('id').primaryKey(), // Discord ID (string)
	username: text('username').notNull(),
	avatar_url: text('avatar_url'),
	created_at: timestamp('created_at', { mode: 'date' }).defaultNow()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull().references(() => user.id), // keep the DB column name as user_id
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull() // same here
});

export const key = pgTable('key', {
	id: text('id').primaryKey(), // "oauth_discord:discordId"
	userId: text('user_id').notNull().references(() => user.id)
});

