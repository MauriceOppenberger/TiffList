import React from "react";
import { fetchMovies } from "../utils/api";

import styled from "styled-components";
import { Link } from "react-router-dom";

const MovieListWrapper = styled.div`
  .list {
    display: flex;
    flex-flow: row wrap;
    margin: auto;
  }
  .list-item {
    flex: 1;
    width: max-content;
    min-width: 100%;
    margin-bottom: 1rem;
  }
`;

function fetchReducer(state, action) {
  if (action.type === "fetching") {
    return {
      ...state,
      loading: true,
      error: null
    };
  } else if (action.type === "success") {
    return {
      movieList: state.movieList.concat(action.movies),
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
const initialState = {
  movieList: [],
  loading: true,
  error: null
};
function MovieList() {
  const [state, dispatch] = React.useReducer(fetchReducer, initialState);
  const year = new Date().getFullYear();

  React.useEffect(() => {
    console.log("in effect");
    dispatch({ type: "fetching" });
    for (let i = 1; i <= 500; i++) {
      fetchMovies(i, year)
        .then(movies => {
          dispatch({ type: "success", movies });
        })
        .catch(error => {
          dispatch({ type: "error", error });
        });
    }
  }, []);
  if (state.error) {
    return <h1>{state.error}</h1>;
  }
  if (state.loading === false && state.movieList.length === 9999) {
    const popularMovies = state.movieList.filter(
      movie => movie.popularity > 10
    );
    console.log(state.movieList);
    return (
      <MovieListWrapper>
        <h1>TIFF Movies in {year} </h1>
        <ul className="list">
          {popularMovies.map(el => (
            <li key={el.id} className="list-item">
              <Link to={`/movie/${el.id}`}>
                <h2>{el.title}</h2>
              </Link>
              <smaller>released: {el.release_date}</smaller>
            </li>
          ))}
        </ul>
      </MovieListWrapper>
    );
  }
  return <h1>Loading</h1>;
}
export default MovieList;
