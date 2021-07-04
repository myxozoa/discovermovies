import React, { useEffect, useState, useRef } from "react";
import { throttle, tmdbRequest, generateTmdbImageUrl } from "../../utils";
import { scrollHandler, scroll } from "./utils";
import styles from "./styles.module.css";

export function ScrollingSelector({ dataUrl, placeholderData, headerText, width = "150px", height = "225px", imgSize = "w342" }) {
  const [data, setData] = useState(placeholderData);
  const [atScrollConstraint, setAtScrollConstraint] = useState("start"); // 'none' | 'start' | 'end'
  const scrollContainer = useRef(null);

  useEffect(() => {
    const _scrollContainerRef = scrollContainer.current;
    const scrollListener = _scrollContainerRef.addEventListener("scroll", throttle(scrollHandler(setAtScrollConstraint), 100));

    return () => {
      _scrollContainerRef.removeEventListener("scroll", scrollListener);
    };
  }, [scrollContainer, setAtScrollConstraint]);

  useEffect(() => {
    async function getData() {
      const response = await tmdbRequest(dataUrl);
      const result = await response.json();

      result.results.sort((a, b) => b.popularity - a.popularity);

      setData(result.results);
    }

    getData();
  }, [dataUrl]);

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>{headerText}</h2>
      <div className={styles.row}>
        <button disabled={atScrollConstraint === "start"} className={`${styles.scrollButton} ${styles.leftScrollButton}`} onClick={throttle(scroll("left", scrollContainer))}>
          <div>
            <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152 287">
              <path d="M136 274L27 144 136 13" strokeWidth="50" />
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
                      src={Boolean(movie.poster_path) ? generateTmdbImageUrl(imgSize, movie.poster_path) : undefined}
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
        <button disabled={atScrollConstraint === "end"} className={`${styles.scrollButton} ${styles.rightScrollButton}`} onClick={throttle(scroll("right", scrollContainer))}>
          <div>
            <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152 287">
              <path d="M16 13l109 131L16 274" strokeWidth="50" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}
