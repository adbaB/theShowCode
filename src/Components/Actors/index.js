import React from "react";
import { getImageMovie } from "../../Services/Movies";
import './index.css'
export const Actors = ({ actors }) => {
  return (
    <div className="container-actor">
      {actors.map((actor) => (
        <article key={actor.id} className= 'card-actor'>
          <img className="img-actor" src={getImageMovie(actor.profile_path)} alt="" />
          <div className="text-actor">

          <p>{actor.original_name}</p>
          <p>{actor.character}</p>
          </div>
        </article>
      ))}
    </div>
  );
};
