import React, { useEffect, useState } from "react";

import styles from "./styles.module.css";

export function Trending() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      const result = await fetch("https://api.themoviedb.org/3/trending/all/week", { headers: { Authorization: `Bearer ${process.env.REACT_APP_TMDB_BEARER_READONLY}` } });
      const info = await result.json();

      console.log(info);

      setData(info.results);
    }

    getData();
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>Trending</header>
      <ul>
        {data.map((movie) => {
          return <li key={movie.id}>{movie.title}</li>;
        })}
      </ul>
    </div>
  );
}
