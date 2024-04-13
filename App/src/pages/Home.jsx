import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fetchData from "../utils/fetchData";

const Home = () => {
  const [playlist, setPlaylist] = useState([]);
  const [newListName, setNewListName] = useState("");
  const [newlyAddedList, setNewlyAddedList] = useState({});

  useEffect(() => {
    const doFetch = async () => {
      try {
        const [data, error] = await fetchData("/api/playlist/");
        if (data) setPlaylist(data);
      } catch (error) {
        console.log(error);
      }
    };
    doFetch();
  }, [newlyAddedList]);

  const createPlaylist = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ playlistName: newListName }),
      };
      const [data, error] = await fetchData(`/api/playlist/`, options);
      if (data) setNewlyAddedList(data);
    } catch (error) {
      console.log(error);
    }
    setNewListName("");
  };

  return (
    <>
      <h1>Home</h1>
      <form onSubmit={createPlaylist}>
        <label htmlFor="name">Add A New Playlist</label>
        <input
          type="text"
          name="name"
          id="name"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {playlist.map((song) => {
          return (
            <li key={song.id}>
              <Link to={`/playlist/${song.id}`}>
                {song.name} - {song.id}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Home;
