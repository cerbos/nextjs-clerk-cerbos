# Clerk, Cerbos and Next.js Example

This example shows how to use [Clerk](https://www.clerk.dev/?utm_source=github&utm_medium=starter_repos&utm_campaign=nextjs_starter) with [Cerbos](https://cerbos.dev) in a Next.js application.

The example features adding sign up, sign in, profile management, and an authenticated API route to your Next.js application which using Cerbos to authorize access.

## Demo

A hosted demo of this example is available at [https://nextjs-clerk-cerbos.vercel.app/](https://nextjs-clerk-cerbos.vercel.app/)

## Table of Contents

- [Cerbos, Clerk and Next.js Example](#cerbos--clerk-and-nextjs-example)

  - [Demo](#table-of-contents)
  - [Overview](#overview)
    - [Tech Stack](#tech-stack)
  - [How to Run the Example](#how-to-run-the-example)

    - [1. Clone the repository and install the dependencies](#1-clone-the-repository-and-install-the-dependencies)
    - [2. Set up your Clerk account and project](#2-set-up-your-clerk-account-and-project)
    - [3. Add your ENV variables to an `env.local` at the root of the project](#3-add-your-env-variables-to-an-envlocal-at-the-root-of-the-project)
    - [4. Start Cerbos locally](#4-start-cerbos-locally)
    - [5. Start the demo locally](#5-start-the-demo-locally)
    - [6. Check out the example implementation](#6-check-out-the-example-implementation)

  - [Commands](#commands)
  - [Learn More](#learn-more)

## Overview

**[Cerbos](https://cerbos.dev)** is an open-source authorization-as-a-service option for allowing decoupled access control in your software. It allows writing human-readable policy definitions that serve as context-aware access control policies for your application resources.

Cerbos works with any identity provider services like Auth0, Okta, FusionAuth, Clerk, Magic, WorkOS or even your own, bespoke directory system.

In this demo we use [Clerk](https://www.clerk.dev/?utm_source=github&utm_medium=starter_repos&utm_campaign=nextjs_starter) as the identity provider.

Our [Next.js](https://nextjs.org/) application will connect with Clerk for authentication and Cerbos for authorization, to decide what actions are available on which resources for a given user.

The policies is defined in the `cerbos/policies` directory. Each policy is authored in the a very human-readable format which you can learn more about at the [Cerbos Policy documentation site](https://docs.cerbos.dev/cerbos/latest/policies), and for the demo revolves around access to a `contacts` resource.

### Tech Stack

- [Cerbos](https://cerbos.dev)
- [Clerk](https://www.clerk.dev/?utm_source=github&utm_medium=starter_repos&utm_campaign=nextjs_starter)
- [Next.js v13.x](https://nextjs.org/) - React meta framework
- [React.js v18.x](https://reactjs.org/)
- [CSS Modules](https://github.com/css-modules/css-modules)

## How to Run the Example

### 1. Clone the repository and install the dependencies

```bash
git clone https://github.com/cerbos/nextjs-clerk-cerbos.git
```

Then `cd` into the project directory and run `npm install` to install the dependencies.

```sh
npm install
```

_Alternatviely you could use `yarn` or `pnpm` or anything that runs `npm scripts`_

### 2. Set up your Clerk account and project

Create a free account at https://clerk.dev and create a new **application** for `development`.

If you have any trouble you can check out [Clerk](https://clerk.dev)'s documentation for [setting up you application.](https://clerk.dev/docs/authentication/set-up-your-application)

### 3. Add your ENV variables to an `env.local` at the root of the project

There are 2 environment variables from Clerk's SDK that need to be set for this demo to work.

There is a `.env.local.example` file in the root of the project that you can copy and rename to `.env.local` and add your Clerk API keys to.

```sh
# .env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_xxxxx
CLERK_SECRET_KEY=sk_xxxxx
```

The Clerk API keys can be found at the [API Keys page](https://dashboard.clerk.dev/last-active?path=api-keys) in the Clerk dashboard.

### 4. Run a Cerbos instance

Cerbos runs [along side of the app](https://docs.cerbos.dev/cerbos/latest/deployment/index.html). All Cerbos command included in this Showcase make use of a deployed sample cerbos app.
This instance is automatically by the showcase and it does not need any further setup.

The content of the Docker Container can be found in `./cerbos`. This folder includes all the information necessary to run a local copy of Cerbos. You should take a look at the content of the `policies` folder.

In the event in which you would like to run a local copy of Cerbos, you can easily do so using docker by following the steps below:

#### Use a local instance of Cerbos

1. Run a Local istance of Cerbos

**If you have [Docker](https://www.docker.com/) installed**: you can simply run the following command to start Cerbos in a Docker container:

```bash
cd ./cerbos
sh ./start.sh
```

2. Change the app to use query our local instance instead than the deployed version

To achieve this open `./utils/cerbos.js` and replace the existing code, with the suggested replacement in the comment. The end file should look something like this:

```javascript
import { GRPC } from "@cerbos/grpc";

export const cerbos = new GRPC("localhost:3593", { tls: false });
```

3. Make changes to your Cerbos Policies

Your showcase is now running a local version of Cerbos, and you can easily make changes to the Policies and learn more about Cerbos and all its features.

### 5. Start the demo locally

This demo is how to use Clerk with Cerbos in a Next.js application, so to start it you can just start the Next.js app in dev mode with the following command:

```bash
npm run dev
```

You could also `build` and `start` the app to see what it would be like in production. Deployment of this app is out of scope for this example.

### 6. Check out the example implementation

- Open your browser to `http://localhost:3000` to see the included example code running.

There is a demonstration of changing the user's role, and seeing how that affects the permissions of the user to take actions on the resources.

## Commands

- `npm run dev` - Starts the development server.
- `npm run build` - Builds the project for production.
- `npm run start` - Starts the production preview after build.

## Learn More

To learn more about Clerk.dev, Cerbos and Next.js, take a look at the following resources:

- [Cerbos Website](https://cerbos.dev)
- [Cerbos Documentation](https://docs.cerbos.dev)
- [Clerk Quick start](https://docs.clerk.dev/get-started/nextjs?utm_source=github&utm_medium=starter_repos&utm_campaign=nextjs_starter)
- [Clerk.dev Documentation](https://docs.clerk.dev/?utm_source=github&utm_medium=starter_repos&utm_campaign=nextjs_starter) - learn about Clerk.dev features and API.
- [Next.js Documentation](https://nextjs.org/docs?utm_source=github&utm_medium=starter_repos&utm_campaign=nextjs_starter) - learn about Next.js features and API.
