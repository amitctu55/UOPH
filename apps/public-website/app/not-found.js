import Link from "next/link";
import styles from "@/styles/Home.module.css";

export default function Custom404() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.description}>
        Page not found. Please check the URL or return to the homepage.
      </p>
      <Link href="/" className={styles.buttonPrimary}>
        Go to Homepage
      </Link>
    </div>
  );
}
