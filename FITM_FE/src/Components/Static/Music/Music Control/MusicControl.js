import "./MusicControl.css";
import { Color } from "../../../../Variable/Color/Color";
import MusicPopup from "./Music PopUp/MusicPopUp";
import { useState } from "react";

function MusicControl({getAllSongs}) {
  const [editMusic, setEditMusic] = useState(false);

  const handleEditClick = () => {
    setEditMusic(true);
  };

  return (
    <div className="MusicControl">
      {editMusic ? <MusicPopup editMusic={editMusic} setEditMusic={setEditMusic} getAllSongs={getAllSongs}/> : ""}
      <button
        className="edit-musics-btn"
        style={{ backgroundColor: Color.color3 }}
        onClick={handleEditClick}
      >
        <ion-icon name="create-outline"></ion-icon> Modify
      </button>
    </div>
  );
}

export default MusicControl;
