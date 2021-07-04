import React from "react";
import { ScrollingSelector } from "./components/ScrollingSelector";
import { Header } from "./components/Header";
import { trending } from "./placeholderState.json";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <ScrollingSelector dataUrl="https://api.themoviedb.org/3/trending/movie/week" label="Trending Movies" placeholderData={trending} />
      <ScrollingSelector dataUrl="https://api.themoviedb.org/3/trending/tv/week" label="Trending TV" placeholderData={trending} />
    </div>
  );
}

export default App;
