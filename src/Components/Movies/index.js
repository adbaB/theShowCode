import React from "react";
import { getLinkVideo } from "../../Services/Movies";
import './index.css'
export const Movies = ({ movies }) => {
  return (
    <div className= 'movie-container'>
      {movies.map((video) => (
        <article key={video.id} >
          <iframe
            className="video-detail"
            width="100%"
            src={getLinkVideo(video.key)}
            title="YouTube video player"
          ></iframe>
          <p className="title">{video.name}</p>
        </article>
      ))}
    </div>
  );
};
