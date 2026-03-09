<div align="center">

# 🧠 MindBridge
### Virtual Counselling Platform

*AI-powered mental health support for students, parents, and counsellors*

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)](https://mongodb.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-counsellingapp.vercel.app-brightgreen?logo=vercel)](https://counsellingapp.vercel.app)

</div>

---

## 🌐 Live Demo

**➜ [https://counsellingapp.vercel.app](https://counsellingapp.vercel.app)**

---

## ✨ Features

- **Multi-role Authentication** — Student, Parent, Counsellor, and Admin portals
- **AI Chat Assistant** — 24/7 mental health support powered by Groq (Llama 3.3)
- **Video Sessions** — Live video counselling with emotion analysis for counsellors
- **Appointment Booking** — Schedule sessions between students and counsellors
- **Secure Messaging** — Direct communication with priority levels
- **Admin Dashboard** — System-wide stats, user management, and alerts
- **Google OAuth** — Sign in with Google across all roles
- **MongoDB Atlas** — Full persistence for users, appointments, messages, and sessions

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Database | MongoDB Atlas + Mongoose |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui + Radix UI |
| AI | Groq API (Llama 3.3 70B) |
| Auth | Custom JWT + Google OAuth |
| Deployment | Vercel |

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Surindhar-It/counsellingapp.git
cd counsellingapp
pnpm install
```

### 2. Set up environment variables

Create a `.env.local` file in the project root:

```env
# MongoDB Atlas
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/mindbridge?retryWrites=true&w=majority

# App
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Groq AI — https://console.groq.com/keys
GROQ_API_KEY=your_groq_api_key
```

### 3. Seed demo users

```bash
pnpm run seed
```

### 4. Run the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👥 Demo Accounts

| Role | Email | Password |
|---|---|---|
| Student | `student@example.com` | `password` |
| Parent | `parent@example.com` | `password` |
| Counsellor | `counsellor@example.com` | `password` |
| Admin | Private |

---

## 📁 Project Structure

```
counsellingapp/
├── app/
│   ├── api/               # API routes (auth, appointments, messages, sessions, chat)
│   ├── auth/              # Login & register pages
│   ├── student/           # Student dashboard
│   ├── parent/            # Parent dashboard
│   ├── counsellor/        # Counsellor dashboard
│   ├── admin/             # Admin dashboard
│   └── session/[id]/      # Video session page
├── lib/
│   ├── mongodb.ts         # Connection singleton
│   ├── models/            # Mongoose models (User, Appointment, Message, Session)
│   ├── auth.ts            # Auth utilities
│   └── auth-context.tsx   # React auth context
├── components/            # Shared UI components
└── scripts/
    └── seed.ts            # Database seeder
```

---

## 🌐 Deployment

This app is deployed on **Vercel**. To deploy your own instance:

1. Push to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Add all environment variables from `.env.local` in the Vercel dashboard
4. Deploy ✅

---

## 📄 License

MIT © [Surindhar](https://github.com/Surindhar-It)
