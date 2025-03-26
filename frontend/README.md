# ⏳ Time Spiral Scheduler

A Discord-integrated scheduling app designed specifically for managing Magic: The Gathering Commander games for your playgroup. Built with SvelteKit, Supabase, and Discord OAuth, Time Spiral Scheduler streamlines game scheduling, reminders, and player management.

> **⚠️ Note:** This project is currently under active development.

## ✨ Features

- **Discord OAuth Login**: Seamless user authentication using Discord credentials.
- **Supabase Integration**: Securely store user data and manage game schedules.
- **Session Management**: Lightweight cookie-based sessions, removing the need for heavy auth libraries.
- **Intuitive Scheduling Interface**: Allow players to view, book, and manage scheduled games easily.

## 🛠️ Tech Stack

- **Frontend**: [SvelteKit](https://kit.svelte.dev/) (TypeScript)
- **Database & Auth**: [Supabase](https://supabase.com)
- **Authentication**: Discord OAuth2

## 📚 Project Structure

```
frontend/
├── src/
│   ├── lib/
│   │   └── server/
│   │       └── supabase.ts
│   ├── routes/
│   │   ├── login/
│   │   ├── callback/
│   │   └── logout/
│   ├── hooks.server.ts
│   └── app.d.ts
├── .env
└── package.json
```

## 🔒 Security

Ensure your `.env` file is never committed to your repository. Verify it is listed in `.gitignore`.

## 📄 License

MIT License.


# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
