# Clerk, Cerbos and Next.js Example

This example shows how to use [Clerk](https://clerk.com/?utm_source=github&utm_medium=starter_repos&utm_campaign=nextjs_starter) for authentication with [Cerbos](https://cerbos.dev) for authorization in a Next.js application built on the App Router.

The example features sign up, sign in, profile management, an authenticated Route Handler and a server-rendered page that are both authorized by Cerbos.

## Demo

A hosted demo of this example is available at [https://nextjs-clerk-cerbos.vercel.app/](https://nextjs-clerk-cerbos.vercel.app/)

## Overview

**[Cerbos](https://cerbos.dev)** is an open-source authorization layer for allowing decoupled access control in your software. It allows writing human-readable policy definitions that serve as context-aware access control policies for your application resources.

Cerbos works with any identity provider such as Auth0, Okta, FusionAuth, Clerk, Magic, WorkOS or your own bespoke directory system. In this demo we use [Clerk](https://clerk.com/?utm_source=github&utm_medium=starter_repos&utm_campaign=nextjs_starter) as the identity provider.

The [Next.js](https://nextjs.org/) application connects to Clerk for authentication and to Cerbos for authorization, to decide what actions are available on which resources for a given user.

The policies are defined in the `cerbos/policies` directory. Each policy is authored in a human-readable format which you can learn more about at the [Cerbos policy documentation](https://docs.cerbos.dev/cerbos/latest/policies). The demo revolves around access to `contact` and `document` resources.

### Tech Stack

- [Cerbos](https://cerbos.dev) with the [`@cerbos/grpc`](https://www.npmjs.com/package/@cerbos/grpc) client
- [Clerk](https://clerk.com/?utm_source=github&utm_medium=starter_repos&utm_campaign=nextjs_starter) with [`@clerk/nextjs`](https://www.npmjs.com/package/@clerk/nextjs) v7
- [Next.js 16](https://nextjs.org/) App Router, Server Components, Route Handlers and Server Actions
- [React 19](https://react.dev/)
- TypeScript and [CSS Modules](https://github.com/css-modules/css-modules)

### How it works

| File | Purpose |
| --- | --- |
| `proxy.ts` | Runs Clerk's `clerkMiddleware()` on every request and requires a signed-in user for everything except `/`, `/sign-in` and `/sign-up`. |
| `app/layout.tsx` | Wraps the app in `<ClerkProvider>` and renders the header. |
| `app/page.tsx` | The demo home page. Signed-in users see the Cerbos demos. |
| `app/actions.ts` | A Server Action that stores the selected role in the Clerk user's `publicMetadata`. |
| `app/api/getResources/route.ts` | A Route Handler that reads the Clerk user, builds a Cerbos principal from it and calls `checkResources()` for two sample `contact` resources. |
| `app/documents/[id]/page.tsx` | A Server Component that calls `isAllowed()` before rendering a `document`, returning 404 or 403 style responses otherwise. |
| `lib/cerbos.ts` | The Cerbos gRPC client. |
| `lib/roles.ts` | Maps the Clerk `publicMetadata.role` to the Cerbos principal's `roles`. |
| `cerbos/` | The Cerbos policies and configuration for running the Policy Decision Point (PDP). |

## How to Run the Example

### 1. Clone the repository and install the dependencies

```bash
git clone https://github.com/cerbos/nextjs-clerk-cerbos.git
cd nextjs-clerk-cerbos
npm install
```

Node.js 22 or later is required (see `.nvmrc`).

### 2. Set up your Clerk account and project

Create a free account at https://clerk.com and create a new **application** for `development`.

If you have any trouble you can check out Clerk's documentation for [setting up your application](https://clerk.com/docs/quickstarts/setup-clerk).

### 3. Add your environment variables to `.env.local` at the root of the project

Copy `.env.local.sample` to `.env.local` and add your Clerk API keys:

```sh
# .env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_xxxxx
CLERK_SECRET_KEY=sk_xxxxx
```

The Clerk API keys can be found on the [API Keys page](https://dashboard.clerk.com/last-active?path=api-keys) in the Clerk dashboard.

### 4. Run a Cerbos instance

Cerbos runs [alongside the app](https://docs.cerbos.dev/cerbos/latest/deployment/index.html). By default the app talks to a hosted demo PDP, so no further setup is needed.

The contents of `./cerbos` include everything necessary to run a local copy of Cerbos with the same policies. Take a look at the `policies` folder.

To run Cerbos locally with [Docker](https://www.docker.com/):

```bash
cd ./cerbos
sh ./start.sh
```

Then point the app at it by adding the following to `.env.local`:

```sh
CERBOS_PDP_ADDRESS=localhost:3593
CERBOS_PDP_TLS=false
```

You can now edit the policies in `cerbos/policies` (they are reloaded automatically) and see the effect in the app.

### 5. Start the demo locally

```bash
npm run dev
```

You could also `build` and `start` the app to see what it would be like in production. Deployment of this app is out of scope for this example.

### 6. Check out the example implementation

Open your browser to `http://localhost:3000` to see the included example code running.

There is a demonstration of changing the user's role, and seeing how that affects the permissions of the user to take actions on the resources.

## Commands

- `npm run dev` - Starts the development server.
- `npm run build` - Builds the project for production.
- `npm run start` - Starts the production server after a build.
- `npm run lint` - Lints the project with ESLint.
- `npm run typecheck` - Type-checks the project with TypeScript.

## Learn More

To learn more about Clerk, Cerbos and Next.js, take a look at the following resources:

- [Cerbos Website](https://cerbos.dev)
- [Cerbos Documentation](https://docs.cerbos.dev)
- [Clerk Next.js Quickstart](https://clerk.com/docs/quickstarts/nextjs?utm_source=github&utm_medium=starter_repos&utm_campaign=nextjs_starter)
- [Clerk Documentation](https://clerk.com/docs?utm_source=github&utm_medium=starter_repos&utm_campaign=nextjs_starter)
- [Next.js Documentation](https://nextjs.org/docs?utm_source=github&utm_medium=starter_repos&utm_campaign=nextjs_starter)
