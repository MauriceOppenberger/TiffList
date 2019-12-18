import React from "react";
import MovieList from "./components/MovieList";
import Movie from "./components/Movie";
import Cast from "./components/Cast";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import "./App.css";

function Layout({ children }) {
  return (
    <div className="layout">
      <div className="sidebar">
        <nav className="main-nav">
          <ul className="nav-list">
            <li className="nav-item">
              {" "}
              <NavLink activeClassName="isActive" to="/">
                <p>TIFF's List</p>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {children}
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Route exact path="/" component={MovieList} />
          <Route path="/movie/:movieId" component={Movie} />
          <Route path="/cast/:creditId" component={Cast} />
        </Layout>
      </div>
    </Router>
  );
}

export default App;
