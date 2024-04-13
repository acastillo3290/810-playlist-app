const express = require("express");
const app = express();
const path = require("path");

const {
  servePlaylist,
  servePlaylists,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
} = require("../server/controllers/playlistControllers");

const pathToDist = path.join(__dirname, "..", "App", "dist");
const serveStatic = express.static(pathToDist);

const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  req.time = time;
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

const parseJSON = express.json();

app.use(serveStatic);
app.use(parseJSON);
app.use(logRoutes);

app.get("/api/playlist", servePlaylists);
app.get("/api/playlist/:id", servePlaylist);
app.post("/api/playlist", createPlaylist);
app.patch("/api/playlist/:id", updatePlaylist);
app.delete("/api/playlist/:id", deletePlaylist);

const port = 8080;
app.listen(port, () => console.log(`Live on port: ${port}`));
