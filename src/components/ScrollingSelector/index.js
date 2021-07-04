import React, { useEffect, useState } from "react";

import styles from "./styles.module.css";

export function ScrollingSelector({ dataUrl, placeholderData, label, width = "150px", height = "225px", imgSize = "w342" }) {
  const [data, setData] = useState(placeholderData);

  useEffect(() => {
    async function getData() {
      const result = await fetch(dataUrl, { headers: { Authorization: `Bearer ${process.env.REACT_APP_TMDB_BEARER_READONLY}` } });
      const info = await result.json();

      info.results.sort((a, b) => b.popularity - a.popularity);

      console.log(info.results);

      setData(info.results);
    }

    getData();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>{label}</h2>
      <ul className={styles.scroller}>
        {data.map((movie) => {
          return (
            <li tabIndex="1" className={styles.item} key={movie.id}>
              <figure>
                <picture style={{ width, height }}>
                  <img
                    draggable="false"
                    className={styles.poster}
                    loading="lazy"
                    width="150"
                    height="225"
                    src={Boolean(movie.poster_path) ? `https://image.tmdb.org/t/p/${imgSize}${movie.poster_path}` : undefined}
                    alt="Poster"
                    style={{ width }}
                  />
                </picture>
                <figcaption className={styles.title}>{movie.title || movie.name}</figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
