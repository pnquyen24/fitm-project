import React, { useState } from "react";
import YouTube from "react-youtube";
import "./Song.css";

function Song({ id, name, author, beat, sheet, background }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const opts = {
    width: "180",
    height: "99",
    playerVars: {
      autoplay: 0, // Đặt giá trị ban đầu là 0 (không tự động phát)
    },
  };

  function getYouTubeVideoId(url) {
    if (url.includes("?v=")) {
      return url.split("?v=")[1];
    } else {
      if (url.includes("/embed/")) {
        return url.split("/embed/")[1];
      } else {
        if (url.includes("/watch?v=")) {
          return url.split("/watch?v=")[1];
        } else {
          return url.split("/").pop();
        }
      }
    }
  }

  console.log(
    `linear-gradient(to right, rgba(0, 0, 0, 0.703), rgba(0, 0, 0, 0.221)),  url("${background}");`
  );
  return (
    <div
      className="song"
      style={
        background == ""
          ? {}
          : {
              backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.703), rgba(0, 0, 0, 0.221)), url("${background}")`,
            }
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h1> {id} </h1>
      <div className="song-info">
        <h3>{name}</h3>
        <p>{author}</p>
      </div>
      {isHovered && (
        <YouTube
          videoId={getYouTubeVideoId(beat)} // Đặt videoId là đoạn ID của video YouTube
          opts={{
            ...opts,
            playerVars: {
              ...opts.playerVars,
              autoplay: 1, // Khi hover vào, tự động phát
            },
          }}
          style={{ marginTop: "6px" }}
        />
      )}
      <div className="song-doc">
        <p>💿</p>
        <a href={sheet}>
          <ion-icon name="document-text"></ion-icon>
        </a>
      </div>
      <div className="blurAll"></div>
    </div>
  );
}

export default Song;
