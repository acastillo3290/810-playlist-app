const Playlist = require("../model/Playlist");

const servePlaylists = (req, res, next) => {
  const playLists = Playlist.list();
  res.status(200);
  res.send(playLists);
};

const servePlaylist = (req, res, next) => {
  const { id } = req.params;
  const playlist = Playlist.find(Number(id));
  if (!playlist) return res.status(404).send(`No playlist with the id: ${id}`);
  res.send(playlist);
};

const createPlaylist = (req, res, next) => {
  const { playlist } = req.body;
  const newPlaylist = new Playlist(playlist);
  res.send(newPlaylist);
};

const updatePlaylist = (req, res, next) => {
  const { playlist } = req.body;
  const { id } = req.params;
  const updatePlaylist = Playlist.editName(Number(id), playlist);
  if (!updatePlaylist) return res.sendStatus(404);
  res.send(updatePlaylist);
};

const deletePlaylist = (req, res, next) => {
  const { id } = req.params;
  const didDelete = Playlist.delete(Number(id));
  const statusCode = didDelete ? 204 : 404;
  res.send(statusCode);
};

module.exports = {
  servePlaylist,
  servePlaylists,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
};
