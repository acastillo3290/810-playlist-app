const getId = require("../utils/getId");

class Playlist {
  static #all = [];

  constructor(name) {
    this.name = name;
    this.id = getId();
  }

  static list() {
    return Playlist.#all;
  }

  static editName(id, newName) {
    const playlist = Playlist.#all.find((list) => list.id === id);
    if (!playlist) return null;
    playlist.name = newName;
    return playlist;
  }

  static delete(id) {
    const listIndex = Playlist.#all.findIndex((val) => val.id == id);
    if (listIndex < 0) return null;

    Playlist.#all.splice(listIndex, 1);
    return true;
  }
}

module.exports = Playlist;
