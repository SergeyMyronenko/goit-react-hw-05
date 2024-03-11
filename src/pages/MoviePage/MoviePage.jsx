import { useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviePage.module.css";
import { useSearchParams } from "react-router-dom";
import { getImagePath, searchMovie } from "../../rest-api";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import SearchForm from "../../components/SearchForm/SearchForm";
import { useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [params, setParams] = useSearchParams();
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [urlPath, setUrlPath] = useState("");
  const [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState(false);

  const filmSearch = params.get("query") ?? "";

  const handleSearch = (inputQuery) => {
    setPage(1);
    setMovies([]);
    params.set("query", inputQuery);
    setParams(params);
  };

  useEffect(() => {
    const pullRequest = async () => {
      setLoader(true);
      try {
        const response = await searchMovie(filmSearch, page);
        const imagePath = await getImagePath();
        const { base_url, backdrop_sizes } = imagePath;
        const imageUrl = `${base_url}${backdrop_sizes[1]}`;
        setUrlPath(imageUrl);
        setMovies((prevMovie) => [...prevMovie, ...response.results]);
        setShowBtn(
          response.total_pages !== page && response.results.length > 0
        );
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    };
    pullRequest();
  }, [filmSearch, page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div className={css.movieBox}>
      <SearchForm request={handleSearch} />
      {loader && <Loader />}
      {error && <ErrorMessage />}
      <MovieList movies={movies} urlPath={urlPath} />
      {showBtn && <LoadMoreBtn onClick={handleLoadMore} />}
    </div>
  );
};
export default MoviePage;
