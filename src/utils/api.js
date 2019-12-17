const api_key = "795756d67b445e119c356024ef01d633";

export async function fetchMovies(page, year) {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=primary_release_date.asc&include_adult=false&page=${page}&primary_release_year=${year}`
  );
  const movies = await res.json();

  const filteredMovies = movies.results.filter(el => el !== null);
  return filteredMovies;
}

export async function fetchMovie(id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US`
  );
  const movie = await res.json();

  return movie;
}

export async function fetchCast(id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}`
  );
  const cast = await res.json();

  return cast;
}
async function fetchMovieCredit(id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${api_key}&language=en-US`
  );
  const result = await res.json();
  return result;
}
export async function fetchCredits(id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/credit/${id}?api_key=${api_key}`
  );
  const credit = await res.json();
  const movieCredits = await fetchMovieCredit(credit.person.id);
  return { credit, movieCredits };
}
