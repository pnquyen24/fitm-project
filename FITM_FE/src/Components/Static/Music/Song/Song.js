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
    width: "320", 
    height: "100",
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
  

  return (
    <div
      className="song"
      style={{ backgroundImage: background }}
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
          style={{marginTop:"6px"}}
        />
      )}
      <div className="song-doc">
        <p>💿</p>
        <p>
          <ion-icon name="document-text"></ion-icon>
        </p>
      </div>
      <div className="blurAll"></div>

      
    </div>
  );
}

export default Song;
