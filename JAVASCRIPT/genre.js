import { homeWrapper, footerSpan, fetchAndDisplayMovies, trendingmovieLists } from './index.js';
import { changeLanguage } from './language.js';
export const actionwrapper = document.querySelector('.summer_action');
export const horrorwrapper = document.querySelector('.summer_horror');
export const currentPopularWrapper = document.querySelector('.current_popular');
export const homeContainerWrapper = document.querySelector('.home-container');

export const current_popular = (movies) => {
    movies.forEach((movie) => {
        const moviePoster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        const movieList = `
      <div class="movie-box" id=${movie.id}>
        <div class="movie-box-wrapper" id=${movie.id}>
          <div class="movie_img">
            <img src="${moviePoster}" alt="${movie.title}" id=${movie.id}>
          </div>
          <div class="movie_sub">
            <p id=${movie.id}>${movie.title}</p>
            <p>⭐${movie.vote_average.toFixed(1)}</p>
          </div>
        </div>
      </div>`;
        currentPopularWrapper.innerHTML += movieList;
    });
};

export const summer_horror = (movies) => {
    const summer_horrorList = movies.filter((object) => {
        return object.genre_ids.includes(27);
    });
    console.log(summer_horrorList);
    summer_horrorList.forEach((movie) => {
        const moviePoster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        const movieList = `
      <div class="movie-box" id=${movie.id}>
        <div class="movie-box-wrapper" id=${movie.id}>
          <div class="movie_img">
            <img src="${moviePoster}" alt="${movie.title}" id=${movie.id}>
          </div>
          <div class="movie_sub">
            <p id=${movie.id}>${movie.title}</p>
            <p>⭐${movie.vote_average.toFixed(1)}</p>
          </div>
        </div>
      </div>`;
        horrorwrapper.innerHTML += movieList;
    });
};

export const summer_action = (movies) => {
    const summer_actionList = movies.filter((object) => {
        return object.genre_ids.includes(28);
    });
    console.log(summer_actionList);
    summer_actionList.forEach((movie) => {
        const moviePoster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        const movieList = `
      <div class="movie-box" id=${movie.id}>
        <div class="movie-box-wrapper" id=${movie.id}>
          <div class="movie_img">
            <img src="${moviePoster}" alt="${movie.title}" id=${movie.id}>
          </div>
          <div class="movie_sub">
            <p id=${movie.id}>${movie.title}</p>
            <p>⭐${movie.vote_average.toFixed(1)}</p>
          </div>
        </div>
      </div>`;
        actionwrapper.innerHTML += movieList;
    });
};

export const home_container = (movies) => {
    const home_containerList = movies.filter((object) => {
        return object.genre_ids.includes(16);
    });
    console.log(home_containerList);
    home_containerList.forEach((movie) => {
        const moviePoster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        const movieList = `
      <div class="movie-box" id=${movie.id}>
        <div class="movie-box-wrapper" id=${movie.id}>
          <div class="movie_img">
            <img src="${moviePoster}" alt="${movie.title}" id=${movie.id}>
          </div>
          <div class="movie_sub">
            <p id=${movie.id}>${movie.title}</p>
            <p>⭐${movie.vote_average.toFixed(1)}</p>
          </div>
        </div>
      </div>`;
        homeContainerWrapper.innerHTML += movieList;
    });
};
