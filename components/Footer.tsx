import Image from "next/image";
import styles from "@/styles/Home.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      Powered by{" "}
      <a
        href="https://clerk.com?utm_source=github&utm_medium=starter_repos&utm_campaign=nextjs_starter"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src="/clerk.svg" alt="Clerk" width={84} height={24} className={styles.logo} />
      </a>
      +
      <a href="https://cerbos.dev" target="_blank" rel="noopener noreferrer">
        <Image src="/cerbos.svg" alt="Cerbos" width={64} height={24} className={styles.logo} />
      </a>
      +
      <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">
        <Image src="/nextjs.svg" alt="Next.js" width={41} height={24} className={styles.logo} />
      </a>
    </footer>
  );
}
