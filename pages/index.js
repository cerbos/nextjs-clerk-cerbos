import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { APIRequest } from "../components/APIRequest";
import CerbosPolicy from "../components/CerbosPolicy";
import RoleSelect from "../components/RoleSelect";

const ClerkFeatures = () => (
  <Link href="/user">
    <a className={styles.cardContent}>
      <img src="/icons/layout.svg" />
      <div>
        <h3>Manage your Clerk user profile</h3>
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
        <h3>Log in/Sign up for an account</h3>
        <p>
          Login to your account or sign up for a new account maanged by
          Clerk.dev. This will provide your identity which will be used by
          Cerbos for authorization.
        </p>
      </div>
      <div className={styles.arrow}>
        <img src="/icons/arrow-right.svg" />
      </div>
    </a>
  </Link>
);

const userAPISample = (
  id
) => `import { requireSession, users } from "@clerk/nextjs/api";
const { Cerbos } = require("cerbos");
const cerbos = new Cerbos({
  hostname: "http://localhost:3592", // The Cerbos PDP instance
});

export default requireSession(async (req, res) => {
  const user = await users.getUser(req.session.userId);
  const cerbosPayload = {
    principal: {
      id: "${id}", // Clerk user ID
      roles: user.publicMetadata.roles, // Clerk user roles
      // pass in the Clerk user profile to use attributes in policies
      attr: user,
    },
    // these resources would be fetched from a DB normally
    resource: {
      kind: "contact",
      instances: {
        "id#1": {
          attr: {
            owner: "${id}", // faked to demostrate ownership policy
            lastUpdated: "2021-10-10",
          },
        },
        "id#2": {
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
  // make decisions baased on the result
  // if(result.isAuthorized("id#1", "update")) {
  //  ... do edit action
  // }

  // return the payload for demo purposes
  res.json(result.resp);
});`;

// Main component using <SignedIn> & <SignedOut>.
//
// The SignedIn and SignedOut components are used to control rendering depending
// on whether or not a visitor is signed in.
//
// https://docs.clerk.dev/frontend/react/signedin-and-signedout
const Main = () => {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Clerk + Cerbos Demo App</h1>
      <p className={styles.description}>
        Example NextJS app using Clerk for authentication and Cerbos for
        authorization.
      </p>

      <div className={styles.cards}>
        <div className={styles.card}>
          <SignedIn>
            <ClerkFeatures />
          </SignedIn>
          <SignedOut>
            <SignupLink />
          </SignedOut>
        </div>
      </div>

      <SignedIn>
        <CerbosPolicy />
        <CerbosDemo />
      </SignedIn>

      <div className={styles.links}>
        <Link href="https://docs.clerk.dev?utm_source=github&utm_medium=starter_repos&utm_campaign=nextjs_starter">
          <a target="_blank" rel="noopener" className={styles.link}>
            <span className={styles.linkText}>Read Clerk documentation</span>
          </a>
        </Link>
        <Link href="https://docs.cerbos.dev">
          <a target="_blank" rel="noopener" className={styles.link}>
            <span className={styles.linkText}>Read Cerbos documentation</span>
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
};

const CerbosDemo = () => {
  const user = useUser();

  return (
    <div>
      <RoleSelect />
      <APIRequest
        apiSample={userAPISample(user.id)}
        endpoint={"/api/getResources"}
        title={`Access API authorized by Cerbos`}
        intro={`Now that you are authenticated as ${user.primaryEmailAddress} the following makes a request to the API endpoint of a sample CRM application. This will call Cerbos to check that you are authorized based on the resources being requested. The result will be returned below demonstrating the authorization decision from Cerbos.`}
        signedInMessage={
          "You are signed in so the actions for two contact resources will be returned based on Cerbos policies"
        }
        signedOutMessage={"You are signed out so unauthorized will be returned"}
        description={
          "Retrieve what permissions a user has on resouces based on upon Cerbos policies. The backend will make an authorization call to the Cerbos instance using your Clerk identity and two sample resouces."
        }
      />
    </div>
  );
};

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
    <a href="https://cerbos.dev" target="_blank">
      <img src="/cerbos.svg" alt="Cerbos.dev" className={styles.logo} />
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
      <title>Clerk + Cerbos Demo App</title>
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
