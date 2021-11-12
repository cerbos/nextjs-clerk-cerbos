import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { APIRequest } from "../components/APIRequest";

const ClerkFeatures = () => (
  <Link href="/user">
    <a className={styles.cardContent}>
      <img src="/icons/layout.svg" />
      <div>
        <h3>Explore features provided by Clerk</h3>
        <p>
          Interact with the user button, user profile, and more to preview what
          your users will see
        </p>
      </div>
      <div className={styles.arrow}>
        <img src="/icons/arrow-right.svg" />
      </div>
    </a>
  </Link>
);

const SignupLink = () => (
  <Link href="/sign-up">
    <a className={styles.cardContent}>
      <img src="/icons/user-plus.svg" />
      <div>
        <h3>Sign up for an account</h3>
        <p>
          Sign up and sign in to explore all the features provided by Clerk
          out-of-the-box
        </p>
      </div>
      <div className={styles.arrow}>
        <img src="/icons/arrow-right.svg" />
      </div>
    </a>
  </Link>
);

const userAPISample = `import { requireSession, users } from "@clerk/nextjs/api";
const { Cerbos } = require("cerbos");
const cerbos = new Cerbos({
  hostname: "http://localhost:3592", // The Cerbos PDP instance
});

export default requireSession(async (req, res) => {
  const user = await users.getUser(req.session.userId);
  const cerbosPayload = {
    principal: {
      id: req.session.userId,
      roles: ["user"],
      // pass in the Clerk user profile to use attributes in policies
      attr: user, 
    },
    // these resources would be fetched from a DB normally
    resource: {
      kind: "contact",
      instances: {
        "5cc22de4": {
          attr: {
            owner: req.session.userId, // faked to demostrate ownership policy
            lastUpdated: "2021-10-10",
          },
        },
        ac29e6df: {
          attr: {
            owner: "somerUserId",
            lastUpdated: "2021-01-20",
          },
        },
      },
    },
    // the list of actions on the resource to check authorization for
    actions: ["read", "update", "delete"],
  };

  const result = await cerbos.check(cerbosPayload);
  // make decisions baaased on the result but return payload for demo purposes
  res.json(result.resp);
});

`;

const contactAPISample = `import { withSession } from '@clerk/nextjs/api'

export default withSession((req, res) => {
  res.statusCode = 200
  if (req.session) {
    res.json({ id: req.session.userId })
  } else {
    res.json({ id: null })
  }
})`;

// Main component using <SignedIn> & <SignedOut>.
//
// The SignedIn and SignedOut components are used to control rendering depending
// on whether or not a visitor is signed in.
//
// https://docs.clerk.dev/frontend/react/signedin-and-signedout
const Main = () => (
  <main className={styles.main}>
    <h1 className={styles.title}>Welcome to your new app</h1>
    <p className={styles.description}>Sign up for an account to get started</p>

    <div className={styles.cards}>
      <div className={styles.card}>
        <SignedIn>
          <ClerkFeatures />
        </SignedIn>
        <SignedOut>
          <SignupLink />
        </SignedOut>
      </div>

      <div className={styles.card}>
        <Link href="https://dashboard.clerk.dev?utm_source=github&utm_medium=starter_repos&utm_campaign=nextjs_starter">
          <a target="_blank" rel="noopener" className={styles.cardContent}>
            <img src="/icons/settings.svg" />
            <div>
              <h3>Configure settings for your app</h3>
              <p>
                Visit Clerk to manage instances and configure settings for user
                management, theme, and more
              </p>
            </div>
            <div className={styles.arrow}>
              <img src="/icons/arrow-right.svg" />
            </div>
          </a>
        </Link>
      </div>
    </div>

    <APIRequest
      apiSample={userAPISample}
      endpoint={"/api/getContacts"}
      title={`Get contacts authorized via Cerbos`}
      signedInMessage={
        "You are signed in so the actions for two contact resources will be returned based on Cerbos policies"
      }
      signedOutMessage={"You are signed out so unauthorized will be returned"}
      description={
        "Retrieve what permissions the user has to two Contact resouces based on upon Cerbos policies"
      }
    />

    <APIRequest
      apiSample={contactAPISample}
      endpoint={"/api/getAuthenticatedUserId"}
      title={`Get the authenticated user's ID`}
      signedInMessage={"You are signed in so your userId will be returned"}
      signedOutMessage={"You are signed out so null be returned"}
      description={
        "Retrieve the user ID of the signed in user, or null if there is no user"
      }
    />

    <div className={styles.links}>
      <Link href="https://docs.clerk.dev?utm_source=github&utm_medium=starter_repos&utm_campaign=nextjs_starter">
        <a target="_blank" rel="noopener" className={styles.link}>
          <span className={styles.linkText}>Read Clerk documentation</span>
        </a>
      </Link>
      <Link href="https://nextjs.org/docs">
        <a target="_blank" rel="noopener" className={styles.link}>
          <span className={styles.linkText}>Read NextJS documentation</span>
        </a>
      </Link>
    </div>
  </main>
);

// Footer component
const Footer = () => (
  <footer className={styles.footer}>
    Powered by{" "}
    <a
      href="https://clerk.dev?utm_source=github&utm_medium=starter_repos&utm_campaign=nextjs_starter"
      target="_blank"
    >
      <img src="/clerk.svg" alt="Clerk.dev" className={styles.logo} />
    </a>
    +
    <a href="https://nextjs.org/" target="_blank" rel="noopener">
      <img src="/nextjs.svg" alt="Next.js" className={styles.logo} />
    </a>
  </footer>
);

const Home = () => (
  <div className={styles.container}>
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
    </Head>
    <Main />
    <Footer />
  </div>
);

export default Home;
