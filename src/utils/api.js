const api_key = "795756d67b445e119c356024ef01d633";

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

const year = new Date().getFullYear();

async function fetchList(page) {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=primary_release_date.asc&include_adult=false&page=${page}&primary_release_year=${year}`
  );
  const movies = await res.json();
  return movies;
}

let list = [];
let page = 0;

export async function fetchNewMovies() {
  // Set movie list to 0 if it is full
  if (list.length > 19) {
    list = [];
  }
  page += 1;

  console.log(list, page);
  const popularMovies = await fetchList(page);

  const results = popularMovies.results.filter(result =>
    result ? result.popularity > 10 : null
  );

  if (results.length > 0) {
    page = popularMovies.page;
    results.map(el => list.push(el));
  }
  if (list.length < 20) {
    await fetchNewMovies();
  }

  return list;
}
