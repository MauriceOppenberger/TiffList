import React from "react";
import { fetchMovie } from "../utils/api";
import CastList from "./CastList";
import styled from "styled-components";

const MovieWrapper = styled.div`
  .movie-blurb {
    padding: 0.5rem 0;
    max-width: 900px;
  }
  .genre-list {
    display: flex;
    flex-flow: row wrap;
    max-width: 50%;
  }
  .genre-item {
    flex: 1;
    max-width: max-content;
    list-style: none;
    margin-right: 1rem;
  }
  .genre-item p {
    margin: 0;
  }
  .btn-cast {
    padding: 8px 16px;
    font-size: 19px;
    font-weight: 500;
    background: var(--primaryColor);
    color: var(--mainWhite);
    border-radius: 5px;
    margin: 2rem 0;
    min-width: 150px;
  }
`;

function movieReducer(state, action) {
  if (action.type === "fetching") {
    return {
      ...state,
      loading: true,
      error: null
    };
  } else if (action.type === "success") {
    return {
      movie: action.movie,

      loading: false,
      error: null
    };
  } else if (action.type === "error") {
    return {
      ...state,
      loading: false,
      error: action.error.message
    };
  }
}
const initalState = {
  movie: null,
  loading: true,
  error: null
};

function Movie(props) {
  const [cast, setCast] = React.useState("hide");
  const [state, dispatch] = React.useReducer(movieReducer, initalState);
  const { movieId } = props.match.params;
  React.useEffect(() => {
    if (!state.movie) {
      dispatch({ type: "fetching" });
      fetchMovie(movieId)
        .then(movie => {
          dispatch({ type: "success", movie });
        })
        .catch(error => {
          dispatch({ type: "error", error });
        });
    }
  }, [movieId, state.movie, cast]);

  if (state.loading) {
    return <p>Loading</p>;
  }
  if (!state.loading) {
    console.log(state);
    return (
      <MovieWrapper>
        <h1>
          {state.movie.title ? state.movie.title : state.movie.original_title}
        </h1>
        {state.movie.tagline ? <h2>{state.movie.tagline}</h2> : null}

        {state.movie.overview ? (
          <div className="movie-blurb">
            <p>Overview:</p>
            <p>{state.movie.overview}</p>
            {state.movie.runtime ? (
              <smaller>Length: {state.movie.runtime} min</smaller>
            ) : null}
          </div>
        ) : null}

        {state.movie.genres ? (
          <div>
            <h3>Genre</h3>
            <ul className="genre-list">
              {state.movie.genres.map(({ id, name }) => (
                <li className="genre-item" key={id}>
                  <p>{name}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {cast === "show" ? (
          <div>
            <button className="btn-cast" onClick={() => setCast("hide")}>
              Hide cast
            </button>
            <CastList id={state.movie.id} />
          </div>
        ) : (
          <button className="btn-cast" onClick={() => setCast("show")}>
            Show Cast
          </button>
        )}
      </MovieWrapper>
    );
  }
}
export default Movie;
