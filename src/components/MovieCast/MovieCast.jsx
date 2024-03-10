import { useEffect, useState } from "react";
import { getMovieCast } from "../../api";
import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    async function getCast() {
      try {
        setLoading(true);
        const data = await getMovieCast(movieId);
        setCast(data.cast);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getCast();
  }, [movieId]);

  return (
    <div>
      {loading && <h3 className={css.load}>Loading...</h3>}
      <ul className={css.list}>
        {cast.map((person) => (
          <li className={css.item} key={person.cast_id}>
            {person.profile_path === null ? (
              <div className={css.noPhoto}>
                <p className={css.noPhotoText}>No photo available</p>
              </div>
            ) : (
              <img
                className={css.img}
                src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                alt={person.name}
              ></img>
            )}
            <h2 className={css.name}>{person.original_name}</h2>
            <p className={css.text}>{person.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
