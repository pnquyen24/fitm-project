import Song from "./Song/Song";
import MusicControl from "./Music Control/MusicControl";
import "./Music.css";
import axios from "axios";
import { useState, useEffect } from "react";
function Music() {
    let [songs, setSongs] = useState([]);
    const [editMusic, setEditMusic] = useState(false);

    useEffect(() => {
        axios.defaults.headers[
            "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;

        getAllSongs();
    }, []);

    const getAllSongs = () => {
        axios
            .get("https://localhost:7226/apis/Song/GetAllSongs")
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
