import { useState } from "react";
import axiosClient from "../../../../../Variable/Api/api";
function MusicPopup({ editMusic, setEditMusic, getAllSongs }) {
    const GET_SONG_BY_ID_URL = "Song/GetSongById";
    const DELETE_SONG_URL = "Song/DeleteSong";
    const UPDATE_SONG_URL = "Song/UpdateSong";
    const CREATE_SONG_URL = "Song/CreateSong";

    let [idInput, setIdInput] = useState("");
    let [songName, setSongName] = useState("");
    let [Author, setAuthor] = useState("");
    let [linkBeat, setLinkBeat] = useState("");
    let [linkSheet, setLinkSheet] = useState("");
    let [backgroundImage, setBackGroundImage] = useState("");

    const handleIdOnchange = (e) => {
        const inputValue = e.target.value;
        setIdInput(inputValue);
        getSongById(inputValue);
    };

    const getSongById = (inputValue) => {
        axiosClient
            .get(`${GET_SONG_BY_ID_URL}/${inputValue}`)
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
    const deleteSongById = async () => {
        await axiosClient
            .delete(`${DELETE_SONG_URL}/${idInput}`)
            .then((response) => {})
            .catch((error) => {});

        getAllSongs();
        setEditMusic(false);
    };

    const UpdateSong = async () => {
        let updateSong = {
            id: idInput,
            name: songName,
            author: Author,
            linkBeat: linkBeat,
            linkSheet: linkSheet,
            backgroundImg: backgroundImage,
        };

        await axiosClient
            .put(`${UPDATE_SONG_URL}/${idInput}`, updateSong)
            .then((response) => {})
            .catch((error) => {});
        getAllSongs();
        setEditMusic(false);
    };

    const CreateSong = async () => {
        let NewSong = {
            id: 0,
            name: songName,
            author: Author,
            linkBeat: linkBeat,
            linkSheet: linkSheet,
            backgroundImg: backgroundImage,
        };

        await axiosClient
            .post(CREATE_SONG_URL, NewSong)
            .then((response) => {})
            .catch((error) => {});
        getAllSongs();
        setEditMusic(false);
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
                    <button
                        className="ms-delete"
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
