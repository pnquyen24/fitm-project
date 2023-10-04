import Song from "./Song/Song";
import MusicControl from "./Music Control/MusicControl";
import "./Music.css";
function Music() {
  return (
    <div className="music">
      <MusicControl></MusicControl>
      <Song></Song>
    </div>
  );
}

export default Music;
