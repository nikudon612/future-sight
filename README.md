Got it — here’s a clean, updated **README** that blends the structure and voice of the original while reflecting your new stack (Lucia instead of Supabase) and current direction:

---

```markdown
# 🔮 Future Sight Scheduler

A Discord-integrated scheduling app built to organize and streamline Magic: The Gathering Commander games for your playgroup. Rebuilt from the ground up using SvelteKit and Lucia, **Future Sight** empowers you to schedule games, manage players, and send reminders with ease.

> ⚠️ This project is under active redevelopment with a new architecture.

---

## ✨ Features

- **Discord OAuth Login**  
  Authenticate users through their Discord accounts using Lucia.

- **Lucia Authentication**  
  Lightweight, flexible session and user management without heavy auth dependencies.

- **Commander-Centric Scheduling UI**  
  An intuitive interface to view, book, and manage Commander games with your group.

- **Flexible Architecture**  
  Built to grow: frontend with SvelteKit, backend features integrated with future support for a game bot and reminders.

---

## 🛠️ Tech Stack

- **Frontend & Framework**: SvelteKit (TypeScript)  
- **Authentication**: Lucia (with Discord OAuth)  
- **Database**: (TBD / Self-managed or coming soon)  
- **Bot Integration**: Planned with Discord.js

---

## 📁 Project Structure

```
future-sight/
├── src/
│   ├── lib/
│   │   └── server/
│   │       └── auth/         # Lucia + Discord integration
│   ├── routes/
│   │   ├── login/
│   │   ├── callback/
│   │   └── logout/
│   ├── hooks.server.ts
│   └── app.d.ts
├── static/
├── .env
└── README.md
```

---

## 🔐 Environment Setup

Ensure `.env` includes the proper values for your Discord app and session secret.

> Your `.env` file should **never** be committed. Confirm it is listed in `.gitignore`.

---

## 🧪 Development Guide

### Install & Start Dev Server

```bash
npm install
npm run dev
```

Or open the app in your browser automatically:

```bash
npm run dev -- --open
```

### Build for Production

```bash
npm run build
npm run preview
```

> For deployment, install the appropriate [adapter](https://kit.svelte.dev/docs/adapters) (e.g. Vercel, Netlify, etc.).

---

## 🧙‍♂️ About the Name

Just like the Magic: The Gathering set it’s named after, **Future Sight** is all about planning ahead — empowering your Commander pod to see what’s coming next and making game night smoother and more organized than ever.
