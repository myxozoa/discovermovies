import React from "react";
import { ScrollGallery } from "./components/ScrollGallery";
import { Header } from "./components/Header";
import { generateTmdbTrendingUrl, generateTmdbImageUrl } from "./utils";
import { trending } from "./placeholderState.json";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <ScrollGallery dataUrl={generateTmdbTrendingUrl("movie", "week")} generateImageURL={generateTmdbImageUrl} imagePath="poster_path" headerText="Trending Movies" placeholderData={trending} />
      <ScrollGallery dataUrl={generateTmdbTrendingUrl("tv", "week")} generateImageURL={generateTmdbImageUrl} imagePath="poster_path" headerText="Trending TV" placeholderData={trending} />
      <ScrollGallery dataUrl={generateTmdbTrendingUrl("person", "week")} generateImageURL={generateTmdbImageUrl} imagePath="profile_path" headerText="Trending People" placeholderData={trending} />
    </div>
  );
}

export default App;
