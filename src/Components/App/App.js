import { useContext, useEffect, useState } from "react";
import { FilterContext } from "../../Context/CineContext";
import { discoverMovies, getImageMovie } from "../../Services/Movies";
import { Card } from "../Card";
import { CardList } from "../CardList";
import { Filters } from "../Filters";
import { Header } from "../Header";
import { Loading } from "../Loanding";
import { Modal } from "../Modal";
import { MovieDetail } from "../MovieDetail";

import "./App.css";

function App() {
  const { valueInput, filter } = useContext(FilterContext);
  const [movies, setMovies] = useState([]);
  const [imagesMovies, setImagesMovies] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [movieId, setMovieId] = useState(0);



  useEffect(() => {
    discoverMovies()
      .then((data) => {
        setMovies(data.results);
        let Images = []
        data.results.forEach(movie => {
          Images.push({image: getImageMovie(movie.backdrop_path),title: movie.title,id: movie.id,overview: movie.overview})
        });  
        setImagesMovies(Images)
      })
      .catch((error) => {
        new Error(error);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading && <Loading />}
      {error && <div>Error</div>}

      {((movies.length > 0 && !loading) || !!valueInput) && (
        <>
          <Header
            setOpenModal={setOpenModal}
            setMovieId={setMovieId}
            setMovies={setMovies}
            imagesMovies = {imagesMovies}
          />
          <Filters />
          <CardList>
            {movies
              .filter(
                (movies) =>
                  movies.vote_average >= filter.min &&
                  movies.vote_average <= filter.max
              )
              .map((movie) => (
                <Card
                  key={movie.id}
                  id={movie.id}
                  title={movie.original_title}
                  image={movie.poster_path}
                  setOpenModal={setOpenModal}
                  setMovieId={setMovieId}
                />
              ))}
          </CardList>

          
          {openModal && (
            <Modal>
              <MovieDetail setOpenModal={setOpenModal} movieId={movieId} setMovieId ={setMovieId}/>
            </Modal>
          )}
        </>
      )}
    </>
  );
}

export default App;
