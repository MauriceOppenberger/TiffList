import React from "react";
import { fetchCast } from "../utils/api";
import { Link } from "react-router-dom";

function castReducer(state, action) {
  if (action.type === "fetching") {
    return {
      ...state,
      loading: true,
      error: null
    };
  } else if (action.type === "success") {
    return {
      cast: action.cast,
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
  cast: null,
  loading: true,
  error: null
};
export default function CastList({ id }) {
  const [state, dispatch] = React.useReducer(castReducer, initalState);

  React.useEffect(() => {
    if (state.cast === null) {
      dispatch({ type: "fetching" });
      fetchCast(id)
        .then(cast => {
          dispatch({ type: "success", cast });
        })
        .catch(error => {
          dispatch({ type: "error", error });
        });
    }
  }, [state.cast, id]);

  if (!state.loading && !state.error) {
    console.log(state);
    return (
      <div>
        <ul>
          {state.cast.cast.map(el => {
            return (
              <li key={el.cast_id}>
                <Link to={`/cast/${el.credit_id}`}>
                  <h2>{el.name}</h2>
                </Link>
                <smaller>as: {el.character ? el.character : "unknown"}</smaller>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  if (state.loading) {
    return <h1>Loading</h1>;
  }
}
