import styles from "./styles.module.css";

export function Header() {
  return (
    <header className={styles.container}>
      <h1>Discover Movies</h1>
      <img className={styles.tmdb} src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="TMDB Logo" />
    </header>
  );
}
