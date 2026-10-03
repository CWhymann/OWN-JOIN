# OWNJOIN

A Kanban-based project management tool built with Angular and Supabase, inspired by Trello.
Join is an educational project created during a web development bootcamp at the Developer Akademie. It is not intended for extensive business usage.

**Live demo:** https://cwhymann.github.io/OWN-JOIN/ (use the **Guest Log in** button to try it)

## Features

- **Sign up and log in** with email and password, plus a guest login
- **Summary** dashboard with task counts, the next urgent deadline and a greeting based on the time of day
- **Board** with four lists (To do, In progress, Await feedback, Done), drag and drop between lists, task search (from 3 letters) and a detail view for each task
- **Add / edit task** with title, description, due date (custom date picker), priority, assigned contacts, category and subtasks
- **Contacts** list grouped by initial letter, with create, edit and delete
- **Help, Privacy Policy and Legal Notice** pages, also available without being logged in
- Responsive layout for desktop and mobile

## Tech stack

- [Angular](https://angular.dev) 22 (standalone components, signals, reactive forms)
- TypeScript, SCSS (BEM naming)
- [Supabase](https://supabase.com) for authentication and the PostgreSQL database
- GitHub Actions and GitHub Pages for deployment

## Getting started

### Requirements

- Node.js 22.22.3 or newer, or 24.15 or newer
- npm 11
- A Supabase project (see [Supabase setup](#supabase-setup))

### Installation

```bash
git clone https://github.com/CWhymann/OWN-JOIN.git
cd OWN-JOIN
npm install
```

### Configuration

The Supabase connection is configured in `src/environments/environment.ts`. This file is not part of the repository. Create it from the template:

```bash
cp src/environments/environment.example.ts src/environments/environment.ts
```

On Windows PowerShell:

```powershell
Copy-Item src/environments/environment.example.ts src/environments/environment.ts
```

Then fill in your values:

```ts
export const environment = {
    supabaseUrl: 'https://YOUR-PROJECT-REF.supabase.co',
    supabaseAnonKey: 'YOUR-SUPABASE-ANON-OR-PUBLISHABLE-KEY',
};
```

You find both values in the Supabase dashboard under **Settings → API**.

> The anon / publishable key is public by design, it ends up in the delivered JavaScript of every web app. Access to your data is protected by Row Level Security (RLS) policies in the database, not by hiding the key. Never use the `service_role` or secret key in this project.

### Development server

```bash
ng serve
```

Open `http://localhost:4200/`. The app reloads automatically when you change a file.

### Build

```bash
npm run build
```

The build output is written to `dist/own-join/browser`. `npm run build` first runs `scripts/set-env.mjs`, which creates `environment.ts` from the environment variables `SUPABASE_URL` and `SUPABASE_ANON_KEY` if they are set (used in CI). If the file already exists and no variables are set, nothing happens.

## Supabase setup

The app uses two tables, `contacts` and `tasks`, and Supabase Auth with email and password.

**`contacts`**

| Column         | Type        |
| -------------- | ----------- |
| `id`           | uuid        |
| `name`         | text        |
| `email`        | text        |
| `phone`        | text        |
| `color`        | text        |
| `created_at`   | timestamptz |
| `is_protected` | boolean     |

**`tasks`**

| Column         | Type                              |
| -------------- | --------------------------------- |
| `id`           | integer                           |
| `title`        | text                              |
| `description`  | text                              |
| `due_date`     | date                              |
| `priority`     | text (`urgent`, `medium`, `low`)  |
| `category`     | text (`Technical Task`, `User Story`) |
| `status`       | text (`todo`, `in-progress`, `await-feedback`, `done`) |
| `position`     | integer                           |
| `assigned_to`  | uuid array (contact ids)          |
| `subtasks`     | jsonb                             |
| `created_at`   | timestamptz                       |
| `is_protected` | boolean                           |

The guest login signs in with a dedicated guest user, which has to exist in **Authentication → Users** of your project.

## Deployment

The app is deployed to GitHub Pages by the workflow in `.github/workflows/deploy.yml` on every push to `main`.

1. In the repository, open **Settings → Pages** and set the source to **GitHub Actions**.
2. Under **Settings → Secrets and variables → Actions**, add the repository secrets `SUPABASE_URL` and `SUPABASE_ANON_KEY` (values without quotes).
3. In Supabase under **Authentication → URL Configuration**, set the **Site URL** to the Pages address, so confirmation links point to the live app.

The workflow builds with `--base-href /OWN-JOIN/` and copies `index.html` to `404.html`, so direct links like `/board` also work on GitHub Pages.

## Project structure

```text
src/app
├── components      pages and UI components (board, contacts, add-task, layout, ...)
├── core
│   ├── constants   shared constants (operator details for the legal pages)
│   ├── guards      route guards (auth)
│   ├── models      TypeScript models
│   ├── services    Supabase, auth, contacts and tasks services
│   └── utils       helpers (dates, validators, avatars)
└── app.routes.ts   routing, public and protected routes
src/environments    Supabase configuration (environment.ts is git-ignored)
src/styles          global SCSS (abstracts, variables, mixins)
scripts             set-env.mjs, creates environment.ts from environment variables
```

## Legal

Before publishing, replace the placeholders in `src/app/core/constants/imprint.ts` with the real operator details. They are used by the Legal Notice, Privacy Policy and Help pages.

The design of Join is owned by the Developer Akademie GmbH.