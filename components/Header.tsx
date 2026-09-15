import Image from "next/image";
import Link from "next/link";
import { Show, UserButton } from "@clerk/nextjs";
import styles from "@/styles/Header.module.css";

// The <Show> component controls rendering depending on whether or not a
// visitor is signed in: https://clerk.com/docs/reference/components/control/show
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link href="/" className={styles.logo}>
          <Image src="/logo.svg" width={32} height={32} alt="Logo" />
          <span className={styles.appName}>Clerk + Cerbos Demo App</span>
        </Link>
      </div>
      <div className={styles.right}>
        <Show when="signed-out">
          <Link href="/sign-in">Sign in</Link>
        </Show>
        <Show when="signed-in">
          <UserButton userProfileUrl="/user" />
        </Show>
      </div>
    </header>
  );
}
