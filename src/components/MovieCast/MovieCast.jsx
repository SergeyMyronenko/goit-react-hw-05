import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { getCredits, getImagePath } from "../../rest-api";
import css from "./MovieCast.module.css";
import Loader from "../Loader/Loader";

const MovieCast = () => {
  const { movieId } = useParams();
  const [casts, setCasts] = useState([]);
  const [error, setError] = useState(false);
  const [urlPath, setUrlPath] = useState("");
  const [loader, setLoader] = useState(false);

  const defaultImg =
    "https://gorod.dp.ua/pic/news/newsfoto/23/03/216143/1_600.jpg";

  useEffect(() => {
    const getCastsData = async () => {
      setLoader(true);
      if (!movieId) {
        return;
      }
      try {
        const response = await getCredits(movieId);
        const imagePath = await getImagePath();
        const { base_url, logo_sizes } = imagePath;
        const imageUrl = `${base_url}${logo_sizes[2]}`;
        setUrlPath(imageUrl);
        setCasts(response);
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    };
    getCastsData();
  }, [movieId]);
  return (
    <div className={css.castBox}>
      {loader && <Loader />}
      <ul className={css.castList}>
        {casts.length > 0 ? (
          casts.map((cast) => {
            return (
              <li key={cast.cast_id} className={css.item}>
                <img
                  src={
                    cast.profile_path
                      ? `${urlPath}${cast.profile_path}`
                      : defaultImg
                  }
                  alt={cast.name}
                  className={css.castImage}
                />
                <div className={css.textBox}>
                  <p>{cast.name}</p>
                  <p className={css.character}>Character:</p>
                  <p className={css.characterItem}>{cast.character}</p>
                </div>
              </li>
            );
          })
        ) : (
          <p>This movie has no casts</p>
        )}
      </ul>

      {error && <ErrorMessage />}
    </div>
  );
};
export default MovieCast;
