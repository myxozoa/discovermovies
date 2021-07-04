import { tmdbImageURL, tmdbTrendingURL } from "./constants.json";

/**
 * Throttle that ensures the last call is made
 * @param {function} func
 * @param {number} limit
 * @returns {function}
 */
export const throttle = (func, limit = 200) => {
  let lastFunc;
  let lastRan;
  return (...args) => {
    if (!lastRan) {
      func(...args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

/**
 * Function to abstract the fetch auth configuration away
 * @param {string} url
 * @returns {Promise}
 */
export function tmdbRequest(url) {
  return fetch(url, { headers: { Authorization: `Bearer ${process.env.REACT_APP_TMDB_BEARER_READONLY}` } });
}

export function generateTmdbImageUrl(width, imageLocator) {
  return `${tmdbImageURL}${width}${imageLocator}`;
}

export function generateTmdbTrendingUrl(type, time) {
  return `${tmdbTrendingURL}${type}/${time}`;
}
