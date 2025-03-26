Here’s your fully rewritten, **Future Sight–branded** `README.md`, cleaned up and restructured to reflect the new name and vibe while keeping all your core info intact:

---

```markdown
🔮 Future Sight Scheduler

A Discord-integrated scheduling app built to organize and streamline Magic: The Gathering Commander games for your playgroup. Designed with SvelteKit, Supabase, and Discord OAuth, **Future Sight** makes scheduling games, sending reminders, and managing players seamless and efficient.

> ⚠️ This project is currently under active development.

---

## ✨ Features

- **Discord OAuth Login**  
  Authenticate users through their Discord accounts for easy sign-in.

- **Supabase Integration**  
  Store user profiles, schedules, and booking data securely.

- **Session Management**  
  Lightweight cookie-based sessions without heavy auth dependencies.

- **Commander-Centric Scheduling UI**  
  An intuitive interface to view, book, and manage Commander games with your group.

---

## 🛠️ Tech Stack

- **Frontend**: SvelteKit (TypeScript)  
- **Database & Auth**: Supabase  
- **Authentication**: Discord OAuth2  

---

## 📁 Project Structure

```
future-sight/
├── frontend/
│   ├── src/
│   │   ├── lib/
│   │   │   └── server/
│   │   │       └── supabase.ts
│   │   ├── routes/
│   │   │   ├── login/
│   │   │   ├── callback/
│   │   │   └── logout/
│   │   ├── hooks.server.ts
│   │   └── app.d.ts
│   ├── .env
│   └── package.json
├── bot/            # Future CLI + Discord bot integrations (coming soon)
├── supabase/       # Supabase configuration and migration tracking
└── README.md
```

---

## 🔒 Security

- Your `.env` file should **never** be committed.
- Confirm `.env` is included in `.gitignore`.

---

## 📄 License

MIT License.

---

## 🧪 Development Guide

This project was scaffolded using `sv`, a Svelte starter tool.

### Create a New Project (already done)

```bash
npx sv create
# or in a named folder
npx sv create my-app
```

### Start the Dev Server

```bash
npm install
npm run dev
# or auto-open in browser
npm run dev -- --open
```

### Build for Production

```bash
npm run build
npm run preview  # Preview your production build
```

> For deployment, you may need to configure a platform-specific adapter (e.g. Vercel, Netlify).

---

## 🧙‍♂️ About the Name

Just like the Magic: The Gathering set it’s named after, **Future Sight** is all about planning ahead — empowering your Commander pod to see what’s coming next, and making game night smoother and more organized than ever.

---

```

Let me know if you want to:
- Add badges (like build status, license, etc.)
- Include contribution instructions
- Auto-generate docs
- Or integrate this with GitHub Pages later on

Want this saved in your project automatically?