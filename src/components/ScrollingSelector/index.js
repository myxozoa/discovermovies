import React, { useEffect, useState, useRef } from "react";

import styles from "./styles.module.css";

function throttle(func, limit = 200) {
  let waiting = false;
  return () => {
    if (!waiting) {
      func();
      waiting = true;
      setTimeout(() => (waiting = false), limit);
    }
  };
}

export function ScrollingSelector({ dataUrl, placeholderData, label, width = "150px", height = "225px", imgSize = "w342" }) {
  const [data, setData] = useState(placeholderData);
  const scrollContainer = useRef(null);

  const scroll = (direction) => () => {
    if (direction === "left") {
      scrollContainer.current.scrollBy({ left: -300, behavior: "smooth" });
    } else {
      scrollContainer.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  useEffect(() => {
    async function getData() {
      const result = await fetch(dataUrl, { headers: { Authorization: `Bearer ${process.env.REACT_APP_TMDB_BEARER_READONLY}` } });
      const info = await result.json();

      info.results.sort((a, b) => b.popularity - a.popularity);

      console.log(info.results);

      setData(info.results);
    }

    getData();
  }, [dataUrl]);

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>{label}</h2>
      <div className={styles.row}>
        <button className={`${styles.scrollButton} ${styles.leftScrollButton}`} onClick={throttle(scroll("left"))}>
          <div>
            <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152 287">
              <path d="M136 274L27 144 136 13" stroke-width="40" />
            </svg>
          </div>
        </button>
        <ul ref={scrollContainer} className={styles.scroller}>
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
        <button className={`${styles.scrollButton} ${styles.rightScrollButton}`} onClick={throttle(scroll("right"))}>
          <div>
            <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152 287">
              <path d="M16 13l109 131L16 274" stroke-width="40" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}
