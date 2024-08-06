import { state } from "./state.js";
import { homeWrapper, footerSpan, fetchAndDisplayMovies } from "./index.js";

// 언어 변경( 한국어 - 일본어 - 영어 )
export const changeLanguage = (selectedLanguage) => {
  state.scrollPage = 1;
  homeWrapper.innerHTML = "";
  footerSpan.style.visibility = "visible";
  state.ifSearching === false
    ? fetchAndDisplayMovies(
        `https://api.themoviedb.org/3/movie/${state.category}?language=${selectedLanguage}&page=${state.scrollPage}`
      )
    : fetchAndDisplayMovies(
        `https://api.themoviedb.org/3/search/movie?query=${state.prevSearchTitle}&include_adult=true&language=${selectedLanguage}&page=${state.scrollPage}`
      );
};
