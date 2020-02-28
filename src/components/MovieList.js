import React from "react";
import { fetchNewMovies } from "../utils/api";

import styled from "styled-components";
import { Link } from "react-router-dom";

const MovieListWrapper = styled.div`
  .btn-load {
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

function fetchReducer(state, action) {
  if (action.type === "fetching") {
    return {
      ...state,
      loading: true,
      fetchList: true,
      error: null
    };
  } else if (action.type === "success") {
    console.log(action.list[0].title);
    return {
      popularMovies: [...state.popularMovies, action.list],

      loading: false,
      fetchList: false,
      error: null
    };
  } else if (action.type === "error") {
    return {
      ...state,
      loading: false,
      error: action.error.message,
      fetchList: false
    };
  }
}
const initialState = {
  popularMovies: [],
  loading: true,
  error: null,
  fetchList: true
};
function MovieList() {
  const [state, dispatch] = React.useReducer(fetchReducer, initialState);

  const year = new Date().getFullYear();

  React.useEffect(() => {
    if (state.fetchList) {
      dispatch({ type: "fetching" });
      fetchNewMovies()
        .then(list => {
          dispatch({ type: "success", list });
        })
        .catch(error => {
          dispatch({ type: "error", error });
        });
    }
  }, [state.fetchList]);

  if (state.error) {
    return <h1>{state.error}</h1>;
  }
  if (!state.loading) {
    return (
      <MovieListWrapper>
        <h1 className="header">Movies {year} </h1>
        <div>
          {state.popularMovies.map((arr, index) => {
            console.log(arr, index);
            return (
              <ul key={index}>
                {arr.map(el => {
                  return (
                    <li key={el.id} className="list-item">
                      <Link to={`/movie/${el.id}`}>
                        <h2>{el.title}</h2>
                      </Link>
                      <p>released: {el.release_date}</p>
                    </li>
                  );
                })}
              </ul>
            );
          })}
          <button
            className="btn-load"
            onClick={() => dispatch({ type: "fetching" })}
          >
            Load More
          </button>
        </div>
      </MovieListWrapper>
    );
  }
  return <h1>Loading</h1>;
}

export default MovieList;
