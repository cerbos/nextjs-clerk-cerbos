import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { APIRequest } from "../components/APIRequest";
import CerbosPolicy from "../components/CerbosPolicy";
import RoleSelect from "../components/RoleSelect";

const ClerkFeatures = () => (
  <Link href="/user" className={styles.cardContent}>
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
  </Link>
);

const SignupLink = () => (
  <Link href="/sign-up" className={styles.cardContent}>
    <img src="/icons/user-plus.svg" />
    <div>
      <h3>Log in/Sign up for an account</h3>
      <p>
        Login to your account or sign up for a new account maanged by Clerk.dev.
        This will provide your identity which will be used by Cerbos for
        authorization.
      </p>
    </div>
    <div className={styles.arrow}>
      <img src="/icons/arrow-right.svg" />
    </div>
  </Link>
);

const userAPISample = (
  id
) => `import { requireSession, users } from "@clerk/nextjs/api";
import { GRPC as Cerbos } from "@cerbos/grpc";
const cerbos = new Cerbos("localhost:3593");

export default requireSession(async (req, res) => {
  const user = await users.getUser("${id}");

  const roles = user.publicMetadata.role
    ? [user.publicMetadata.role]
    : ["user"];

  const cerbosPayload = {
    principal: {
      id: "${id}",
      roles, //roles from Clerk profile
      attributes: user,
    },
    resources: [
      {
        resource: {
          kind: "contact",
          id: "1",
          attributes: {
            owner: "${id}", // faked to demostrate ownership policy
            lastUpdated: "2021-10-10",
          },
        },
        // the list of actions on the resource to check authorization for
        actions: ["read", "create", "update", "delete"],
      },

      {
        resource: {
          kind: "contact",
          id: "2",
          attributes: {
            owner: "somerUserId",
            lastUpdated: "2021-10-10",
          },
        },
        // the list of actions on the resource to check authorization for
        actions: ["read", "create", "update", "delete"],
      },
    ],
  };
  

  const result = await cerbos.checkResources(cerbosPayload);
  
  // make decisions baased on the result
  // if(result.isAllowed({
  //   resource: {
  //     kind: "contact",
  //     id: "1",
  //   },
  //   action: "edit",
  // })) {
  //  ... can do edit action on resource ID 1
  // }

  // return the payload for demo purposes
  res.json(result.results);
});
`;

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

      <SignedIn>
        <CerbosDemo />
      </SignedIn>
      <div className={styles.backend}>
        <h2>Clerk - User Profile</h2>
        <div className={styles.card}>
          <SignedIn>
            <ClerkFeatures />
          </SignedIn>
          <SignedOut>
            <SignupLink />
          </SignedOut>
        </div>
      </div>

      <div className={styles.links}>
        <a
          href="https://docs.clerk.dev?utm_source=github&utm_medium=starter_repos&utm_campaign=nextjs_starter"
          target="_blank"
          rel="noopener"
          className={styles.link}
        >
          <span className={styles.linkText}>Read Clerk documentation</span>
        </a>
        <a
          target="_blank"
          rel="noopener"
          className={styles.link}
          href="https://docs.cerbos.dev"
        >
          <span className={styles.linkText}>Read Cerbos documentation</span>
        </a>

        <a
          target="_blank"
          rel="noopener"
          className={styles.link}
          href="https://nextjs.org/docs"
        >
          <span className={styles.linkText}>Read NextJS documentation</span>
        </a>
      </div>
    </main>
  );
};

const CerbosDemo = () => {
  const user = useUser();

  return (
    <div>
      <RoleSelect />

      <div className={styles.exampleLinks}>
        <div className={styles.card} disabled={!user.user.publicMetadata?.role}>
          <a href="#resource-access" className={styles.cardContent}>
            <img src="/icons/server.svg" alt="" />
            <h3>Resource Access Demo</h3>
            <div></div>
          </a>
        </div>
        <div className={styles.card} disabled={!user.user.publicMetadata?.role}>
          <a href="#route-guard" className={styles.cardContent}>
            <img src="/icons/lock.svg" alt="" />
            <h3>Route Guard Demo</h3>
            <div></div>
          </a>
        </div>
      </div>
      <CerbosPolicy />
      <section id="resource-access" className={styles.section}>
        <APIRequest
          apiSample={userAPISample(user.id)}
          endpoint={"/api/getResources"}
          title={`Access API authorized by Cerbos`}
          intro={`Now that you are authenticated as ${user.primaryEmailAddress} the following makes a request to the API endpoint of a sample CRM application. This will call Cerbos to check that you are authorized based on the resources being requested. The result will be returned below demonstrating the authorization decision from Cerbos.`}
          signedInMessage={
            "You are signed in so the actions for two contact resources will be returned based on Cerbos policies"
          }
          signedOutMessage={
            "You are signed out so unauthorized will be returned"
          }
          description={
            "Retrieve what permissions a user has on resouces based on upon Cerbos policies. The backend will make an authorization call to the Cerbos instance using your Clerk identity and two sample resouces."
          }
        />
      </section>
      <section id="route-guard" className={styles.section}>
        <div className={styles.backend}>
          <h2>Demo: Guarded Routes</h2>
          <p>
            For this demo set a <b>role</b> on your Clerk user above and attempt
            to access the routes below. The{" "}
            <code className={styles.code}>admin</code> role has access to all
            routes, while the <code className={styles.code}>user</code> role
            only has access to the user route.
          </p>
          <div className={styles.card}>
            <Link href="/documents/1" className={styles.cardContent}>
              <img src="/icons/lock.svg" alt="" />
              <div>
                <h3>A Route the Admin user role can access</h3>
                <p>
                  This route is <b>only</b> accessible by users with the{" "}
                  <code className={styles.code}>admin</code> role.
                </p>
              </div>
              <div className={styles.arrow}>
                <img src="/icons/arrow-right.svg" alt="" />
              </div>
            </Link>
          </div>
          <div className={styles.card}>
            <Link href="/documents/2" className={styles.cardContent}>
              <img src="/icons/external-link.svg" alt="" />
              <div>
                <h3>A Route the user who owns the resource can access</h3>
                <p>
                  This route is <b>only</b> accessible by users with the{" "}
                  <code className={styles.code}>admin</code> role.
                </p>
                <p>
                  This route is "guarded" by the{" "}
                  <code className={styles.code}>id</code> of the user matching
                  the <code className={styles.code}>author</code>
                  property of the <b>document</b> resource.
                </p>
              </div>
              <div className={styles.arrow}>
                <img src="/icons/arrow-right.svg" alt="" />
              </div>
            </Link>
          </div>
          <div className={styles.card}>
            <Link href="/documents/3" className={styles.cardContent}>
              <img src="/icons/document.svg" alt="" />
              <div>
                <h3>A Route the user does not own</h3>
                <p>
                  This route is "guarded" by the{" "}
                  <code className={styles.code}>id</code> of the{" "}
                  <code className={styles.code}>author</code> of the
                  <b>document</b> resource.
                </p>
              </div>
              <div className={styles.arrow}>
                <img src="/icons/arrow-right.svg" alt="" />
              </div>
            </Link>
          </div>
        </div>
      </section>
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
