import React from "react";
import { fetchCredits } from "../utils/api";
import { Link } from "react-router-dom";

function creditReducer(state, action) {
  if (action.type === "fetching") {
    return {
      ...state,
      loading: true,
      error: null
    };
  } else if (action.type === "success") {
    return {
      credit: action.data.credit,
      movieCredits: action.data.movieCredits,
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
  credit: null,
  movieCredits: null,
  loading: true,
  error: null
};
export default function Cast(props) {
  const [state, dispatch] = React.useReducer(creditReducer, initalState);
  const id = props.match.params.creditId;

  React.useEffect(() => {
    fetchCredits(id)
      .then(data => {
        dispatch({ type: "success", data });
      })
      .catch(error => {
        dispatch({ type: "error", error });
      });
  }, [id]);
  if (state.error) {
    return (
      <div>
        <h1>{state.error}</h1>
      </div>
    );
  }
  if (!state.loading && !state.error) {
    console.log(state);
    return (
      <div>
        <h1 className="header">{state.credit.person.name}</h1>

        <ul>
          {state.movieCredits
            ? state.movieCredits.cast.map(el => (
                <li key={el.id}>
                  <Link to={`/movie/${el.id}`}>
                    <h2>{el.title}</h2>{" "}
                  </Link>
                  <p>as: {el.character}</p>
                </li>
              ))
            : null}
        </ul>
      </div>
    );
  }
  return (
    <div>
      {" "}
      <h1>Loading</h1>
    </div>
  );
}
