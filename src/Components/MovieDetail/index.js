import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import {
  getDetailMovie,
  getImageMovie,
  getMovieVideo,
  getLinkVideo,
  getMovieCredits,
  getRecommendationsMovies,
} from "../../Services/Movies";
import { Actors } from "../Actors";
import { Tab } from "../Tabs";
import { Movies } from "../Movies";
import { Recommendations } from "../Recommendations";
import "./index.css";
export const MovieDetail = ({ setOpenModal, movieId,setMovieId }) => {
  const [detail, setDetail] = useState({});
  const [video, setVideo] = useState({});
  const [actor, setActor] = useState([]);
  const [movies, setmovies] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getDetailMovie(movieId),
      getMovieVideo(movieId),
      getMovieCredits(movieId),
      getRecommendationsMovies(movieId),
    ]).then((data) => {
      setDetail(data[0]);
      setVideo(data[1].results[0].key);
      setmovies(data[1].results);
      setActor(data[2].cast.slice(0, 10));
      setRecommendations(data[3].results);
      setLoading(false);

      console.log(data);
      console.log(data[2].crew.slice(0, 10));
    });
  }, [movieId]);

  return (
    <>
      {!loading && (
        <div className="modal-container">
          <nav className="modal-nav">
            <button
              className="btn-detail"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              <FaTimes size={24} />
            </button>

            <Tab active={0} className="tab">
              <Tab.TabPane tab="Descripcion">
                <div>
                  <img
                    width="100%"
                    src={getImageMovie(detail.backdrop_path)}
                    alt=""
                  />
                  <div className="text-container">
                    <h3 className="title-detail">{detail.title}</h3>
                    <p className="text-detail">{detail.overview}</p>
                    <h4 className="genres-title">Genres:</h4>
                    <div className="container-tag">
                      {detail.genres.map((genre) => {
                        return (
                          <span className="tag" key={genre.id}>
                            {genre.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <iframe
                    className="video-detail"
                    width="100%"
                    src={getLinkVideo(video)}
                    title="YouTube video player"
                  ></iframe>
                </div>
              </Tab.TabPane>
              <Tab.TabPane tab="Actores">
                <Actors actors={actor} />
              </Tab.TabPane>
              <Tab.TabPane tab="Videos">
                <Movies movies={movies} />
              </Tab.TabPane>
              <Tab.TabPane tab="Peliculas Recomendadas">
                <Recommendations  recommendations = {recommendations} setOpenModal ={setOpenModal} setMovieId ={setMovieId}/>
              </Tab.TabPane>
            </Tab>
          </nav>
        </div>
      )}
    </>
  );
};
