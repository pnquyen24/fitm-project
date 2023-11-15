import Song from "./Song/Song";
import MusicControl from "./Music Control/MusicControl";
import "./Music.css";
import axiosClient from "../../../Variable/Api/api";
import { useState, useEffect } from "react";
function Music() {
    let [songs, setSongs] = useState([]);
    const [editMusic, setEditMusic] = useState(false);

    const GET_ALL_SONGS_URL = "Song/GetAllSongs";

    document.title = "Music";

    useEffect(() => {
        getAllSongs();
    }, []);

    const getAllSongs = () => {
        axiosClient
            .get(GET_ALL_SONGS_URL)
            .then((response) => {
                setSongs(response.data);
            })
            .catch((error) => {});
    };

    return (
        <div className="music">
            <MusicControl
                getAllSongs={getAllSongs}
                setEditMusic={setEditMusic}
                editMusic={editMusic}
            ></MusicControl>
            {songs.map((song, index) => (
                <Song
                    key={index}
                    id={song.id}
                    name={song.name}
                    author={song.author}
                    beat={song.linkBeat}
                    sheet={song.linkSheet}
                    background={
                        song.backgroundImg === "" ? "" : song.backgroundImg
                    }
                ></Song>
            ))}
        </div>
    );
}

export default Music;
