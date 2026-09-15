import Image from "next/image";
import Link from "next/link";
import { Show } from "@clerk/nextjs";
import CerbosDemo from "@/components/CerbosDemo";
import Footer from "@/components/Footer";
import styles from "@/styles/Home.module.css";

const ClerkFeatures = () => (
  <Link href="/user" className={styles.cardContent}>
    <Image src="/icons/layout.svg" alt="" width={24} height={24} />
    <div>
      <h3>Manage your Clerk user profile</h3>
      <p>
        Interact with the user button, user profile, and more to preview what
        your users will see
      </p>
    </div>
    <div className={styles.arrow}>
      <Image src="/icons/arrow-right.svg" alt="" width={24} height={24} />
    </div>
  </Link>
);

const SignupLink = () => (
  <Link href="/sign-up" className={styles.cardContent}>
    <Image src="/icons/user-plus.svg" alt="" width={24} height={24} />
    <div>
      <h3>Log in/Sign up for an account</h3>
      <p>
        Log in to your account or sign up for a new account managed by Clerk.
        This will provide your identity which will be used by Cerbos for
        authorization.
      </p>
    </div>
    <div className={styles.arrow}>
      <Image src="/icons/arrow-right.svg" alt="" width={24} height={24} />
    </div>
  </Link>
);

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1 className={styles.title}>Clerk + Cerbos Demo App</h1>
        <p className={styles.description}>
          Example Next.js app using Clerk for authentication and Cerbos for
          authorization.
        </p>

        <Show when="signed-in">
          <CerbosDemo />
        </Show>

        <div className={styles.backend}>
          <h2>Clerk - User Profile</h2>
          <div className={styles.card}>
            <Show when="signed-in">
              <ClerkFeatures />
            </Show>
            <Show when="signed-out">
              <SignupLink />
            </Show>
          </div>
        </div>

        <div className={styles.links}>
          <a
            href="https://clerk.com/docs?utm_source=github&utm_medium=starter_repos&utm_campaign=nextjs_starter"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            <span className={styles.linkText}>Read Clerk documentation</span>
          </a>
          <a
            href="https://docs.cerbos.dev"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            <span className={styles.linkText}>Read Cerbos documentation</span>
          </a>
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            <span className={styles.linkText}>Read Next.js documentation</span>
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
