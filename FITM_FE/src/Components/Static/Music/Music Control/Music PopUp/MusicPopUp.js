import { useState, useEffect } from "react";
import axios from "axios";
function MusicPopup({ editMusic, setEditMusic, getAllSongs }) {
  let [idInput, setIdInput] = useState("");
  let [songName, setSongName] = useState("");
  let [Author, setAuthor] = useState("");
  let [linkBeat, setLinkBeat] = useState("");
  let [linkSheet, setLinkSheet] = useState("");
  let [backgroundImage, setBackGroundImage] = useState("");

  useEffect(() => {
    axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "token"
    )}`;
  }, []);

  const handleIdOnchange = (e) => {
    const inputValue = e.target.value;
    setIdInput(inputValue);
    getSongById(inputValue);
  };

  const getSongById = (inputValue) => {
    console.log(`https://localhost:7226/apis/Song/GetSongById/${inputValue}`);
    axios
      .get(`https://localhost:7226/apis/Song/GetSongById/${inputValue}`)
      .then((response) => {
        setSongName(response.data.name);
        setAuthor(response.data.author);
        setLinkBeat(response.data.linkBeat);
        setLinkSheet(response.data.linkSheet);
        setBackGroundImage(response.data.backgroundImg);
      })
      .catch((error) => {
        setSongName("");
        setAuthor("");
        setLinkBeat("");
        setLinkSheet("");
        setBackGroundImage("");
      });
  };
  const deleteSongById = () => {
    axios
      .delete(`https://localhost:7226/apis/Song/DeleteSong/${idInput}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const UpdateSong = () => {
    let updateSong = {
      id: idInput,
      name: songName,
      author: Author,
      linkBeat: linkBeat,
      linkSheet: linkSheet,
      backgroundImg: backgroundImage,
    };

    axios
      .put(`https://localhost:7226/apis/Song/UpdateSong/${idInput}`, updateSong)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {});
  };

  const CreateSong = () => {
    let NewSong = {
      id: 0,
      name: songName,
      author: Author,
      linkBeat: linkBeat,
      linkSheet: linkSheet,
      backgroundImg: backgroundImage,
    };

    axios
      .post(`https://localhost:7226/apis/Song/CreateSong`, NewSong)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {});
  };

  const handleEditClick = () => {
    setEditMusic(false);
    getAllSongs();
  };
  return (
    <div className="fixed-cmn">
      <div className="blur-ms" onClick={handleEditClick}></div>

      <div className="edit-ms-form">
        <input
          type="text"
          className="ms-id"
          value={idInput}
          onChange={(e) => handleIdOnchange(e)}
          placeholder="If you want to modify the song, enter song ID here"
        ></input>

        <div className="ms-name ms-info">
          <div className="ms-icon">
            <ion-icon name="musical-notes-outline"></ion-icon>
          </div>
          <input
            type="text"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
          ></input>
        </div>

        <div className="ms-author ms-info">
          <div className="ms-icon">
            <ion-icon name="person-circle-outline"></ion-icon>
          </div>
          <input
            type="text"
            value={Author}
            onChange={(e) => setAuthor(e.target.value)}
          ></input>
        </div>

        <div className="ms-beat ms-info">
          <div className="ms-icon">
            <ion-icon name="disc-outline"></ion-icon>
          </div>
          <input
            type="text"
            value={linkBeat}
            onChange={(e) => setLinkBeat(e.target.value)}
          ></input>
        </div>

        <div className="ms-sheet ms-info">
          <div className="ms-icon">
            <ion-icon name="documents-outline"></ion-icon>
          </div>
          <input
            type="text"
            value={linkSheet}
            onChange={(e) => setLinkSheet(e.target.value)}
          ></input>
        </div>

        <div className="ms-bgr ms-info">
          <div className="ms-icon">
            <ion-icon name="image-outline"></ion-icon>
          </div>
          <input
            type="text"
            value={backgroundImage}
            onChange={(e) => setBackGroundImage(e.target.value)}
          ></input>
        </div>


        <div className="ms-btn">

        <button
            className="ms-create"
            onClick={CreateSong}
            style={{ display: idInput === "" ? "flex" : "none" }}
          >
            <ion-icon name="add-circle-outline"></ion-icon> Create{" "}
          </button>

          <button
            className="ms-update"
            onClick={UpdateSong}
            style={{ display: idInput === "" ? "none" : "flex" }}
          >
            <ion-icon name="cloud-upload-outline"></ion-icon> Update{" "}
          </button>
          <button className="ms-delete" 
          onClick={deleteSongById}
          style={{ display: idInput === "" ? "none" : "flex" }}
          >
          
            <ion-icon name="close-circle-outline"></ion-icon> Delete{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
export default MusicPopup;
