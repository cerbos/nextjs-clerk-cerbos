import Link from "next/link";
import styles from "@/styles/Home.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1 className={styles.title}>404 - Not Found</h1>
        <p className={styles.description}>
          <Link href="/">Back to the demo</Link>
        </p>
      </div>
    </div>
  );
}
