import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import fetchData from "../utils/fetchData";

const PlaylistDetails = () => {
  const [playlist, setPlaylist] = useState({});
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const doFetch = async () => {
      try {
        const [data, error] = await fetchData(`/api/playlist/${id}`);
        if (data) setPlaylist(data);
      } catch (error) {
        console.log(error);
      }
    };
    doFetch();
  }, []);

  const deletePlaylist = async () => {
    try {
      const options = {
        method: "DELETE",
      };
      const [data, error] = await fetchData(`/api/playlist/${id}`, options);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const changePlaylistName = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ playlistName: newPlaylistName }),
      };
      const [data, error] = await fetchData(`/api/playlist/${id}`, options);
      if (data) setPlaylist(data);
    } catch (error) {
      console.log(error);
    }
    setNewPlaylistName("");
  };

  return (
    <>
      <h1>Playlist Details</h1>
      <p>
        {playlist.name} - {playlist.id}
      </p>
      <button onClick={deletePlaylist}>Delete playlist</button>
      <form onSubmit={changePlaylistName}>
        <label htmlFor="name">Update Playlist Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <Link to="/">
        <button>Go Home</button>
      </Link>
    </>
  );
};

export default PlaylistDetails;
