import { state } from "./state.js";
import { homeWrapper, footerSpan, fetchAndDisplayMovies } from "./index.js";
const languageSelectButtons = document.querySelectorAll(
  '.language-selector input[type="radio"]'
);

// 언어 변경( 한국어 - 일본어 - 영어 )
export const changeLanguage = (selectedLanguage) => {
  state.scrollPage = 1;
  state.selectedLanguage = selectedLanguage;
  homeWrapper.innerHTML = "";
  footerSpan.style.visibility = "visible";
  state.ifSearching === false
    ? fetchAndDisplayMovies(
        `https://api.themoviedb.org/3/movie/${state.category}?language=${state.selectedLanguage}&page=${state.scrollPage}`
      )
    : fetchAndDisplayMovies(
        `https://api.themoviedb.org/3/search/movie?query=${state.prevSearchTitle}&include_adult=true&language=${state.selectedLanguage}&page=${state.scrollPage}`
      );
};

languageSelectButtons.forEach((button) => {
  button.addEventListener("change", (e) => {
    const chosenLanguage = e.target.value;
    changeLanguage(chosenLanguage);
  });
});
