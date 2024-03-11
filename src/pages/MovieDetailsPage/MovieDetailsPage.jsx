import { useEffect } from "react";
import { getImagePath, getMovieById } from "../../rest-api";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./MovieDetailsPage.module.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRef } from "react";
import { Suspense } from "react";
import Loader from "../../components/Loader/Loader";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState({});
  const [urlPath, setUrlPath] = useState("");
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");
  const [loader, setLoader] = useState(false);

  const defaultImg =
    "https://gorod.dp.ua/pic/news/newsfoto/23/03/216143/1_600.jpg";

  useEffect(() => {
    const movieDetails = async () => {
      setLoader(true);
      try {
        const getMovieInfo = await getMovieById(movieId);
        const imagePath = await getImagePath();
        const { base_url, backdrop_sizes } = imagePath;
        const imageUrl = `${base_url}${backdrop_sizes[0]}`;

        setUrlPath(imageUrl);
        setMovies(getMovieInfo);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    };
    movieDetails();
  }, [movieId]);
  return (
    <div>
      <Link className={css.link} to={backLinkRef.current}>
        <IoMdArrowRoundBack />
        Go back
      </Link>
      {loader && <Loader />}
      <div className={css.detailsBox}>
        <img
          className={css.image}
          src={
            movies.poster_path ? `${urlPath}${movies.poster_path}` : defaultImg
          }
          alt="movies.title"
        />
        <div className={css.info}>
          <h2>{movies.title}</h2>
          <p>
            User Score: <span>{movies.vote_count}</span>
          </p>
          <p>
            Rating: <span>{movies.vote_average}</span>
          </p>
          {movies.budget !== 0 && (
            <p>
              Film budget:
              <span>{movies.budget}$</span>
            </p>
          )}
          <h3 className={css.title}>Overview</h3>
          <p>{movies.overview}</p>
          <h3 className={css.title}>Genres</h3>
          <ul className={css.genresList}>
            {movies.genres &&
              movies.genres.map((genre) => {
                return <li key={genre.id}>{genre.name}</li>;
              })}
          </ul>
        </div>
      </div>
      <div className={css.linkBox}>
        <p className={css.text}>Additional information</p>
        <ul className={css.linkList}>
          <li>
            <Link className={css.link} to="cast">
              Casts
            </Link>
          </li>
          <li>
            <Link className={css.link} to="reviews">
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      {error && <ErrorMessage />}
    </div>
  );
};
export default MovieDetailsPage;
