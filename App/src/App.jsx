import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PlaylistDetails from "./pages/PlaylistDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/playlist/:id" element={<PlaylistDetails />}></Route>
      </Routes>
    </>
  );
}

export default App;
