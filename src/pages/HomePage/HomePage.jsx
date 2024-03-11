import { useEffect } from "react";
import { getImagePath, trendingMovie } from "../../rest-api";
import { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [urlPath, setUrlPath] = useState("");

  useEffect(() => {
    const onTrend = async () => {
      try {
        const trendList = await trendingMovie();
        const imagePath = await getImagePath();
        const { base_url, backdrop_sizes } = imagePath;
        const imageUrl = `${base_url}${backdrop_sizes[1]}`;
        setMovies(trendList);
        setUrlPath(imageUrl);
      } catch (error) {
        setError(true);
      }
    };
    onTrend();
  }, []);
  return (
    <div>
      <h2>Trending today</h2>
      <MovieList movies={movies} urlPath={urlPath} />
      {error && <ErrorMessage />}
    </div>
  );
};
export default HomePage;
