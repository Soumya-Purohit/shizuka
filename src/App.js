import React, { useState, useEffect } from "react";
import axios from "axios";

const tmdbKey = "a1cf3dcd3fac1adc1ae07fd36b7f92a8";

function App() {
  const [movies, setMovies] = useState([]);
  const [adults, setAdults] = useState([]);
  const [search, setSearch] = useState("");
  const [downloads, setDownloads] = useState([]);

  const fetchTMDB = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${tmdbKey}`
    );
    setMovies(res.data.results || []);
  };

  const fetchAdult = async () => {
    if (!search) return;
    const res = await axios.get(
      `https://pornhub-scraper-api.onrender.com/api/pornhub/search?query=${search}`
    );
    setAdults(res.data.results || []);
  };

  const fetchDownload = async (url) => {
    const res = await axios.post(
      "https://universal-downloader-api.onrender.com/api/extract",
      { url }
    );
    setDownloads(res.data.links || []);
  };

  useEffect(() => {
    fetchTMDB();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Shizuka - Cinematic App</h1>

      <h2>Trending Movies</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {movies.map((m) => (
          <div key={m.id}>
            <img
              src={`https://image.tmdb.org/t/p/w200${m.poster_path}`}
              alt={m.title}
              style={{ width: 120, borderRadius: 8 }}
            />
            <p>{m.title}</p>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: 30 }}>Search Adult Videos</h2>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: 8, width: "80%", marginBottom: 10 }}
      />
      <button onClick={fetchAdult} style={{ padding: 8 }}>
        Search
      </button>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 20 }}>
        {adults.map((v, i) => (
          <div key={i}>
            <img src={v.thumb} alt={v.title} style={{ width: 120 }} />
            <p>{v.title}</p>
            <button onClick={() => fetchDownload(v.videoUrl)}>Download</button>
          </div>
        ))}
      </div>

      {downloads.length > 0 && (
        <div style={{ marginTop: 30 }}>
          <h3>Download Links</h3>
          <ul>
            {downloads.map((d, i) => (
              <li key={i}>
                <a href={d.url} target="_blank" rel="noreferrer">
                  {d.quality || "Link"} - {d.url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
          
