import { state } from './state.js';
import { homeWrapper, footerSpan, fetchAndDisplayMovies, fetchData } from './index.js';
export const current_popular = document.querySelector('.current_popular');
export const summer_horror = document.querySelector('.summer_horror');
export const summer_action = document.querySelector('.summer_action');
export const home_container = document.querySelector('.home-container');
const languageSelectButtons = document.querySelectorAll('.language-selector input[type="radio"]');

// 언어 변경( 한국어 - 일본어 - 영어 )
export const changeLanguage = (selectedLanguage) => {
    state.scrollPage = 1;
    state.selectedLanguage = selectedLanguage;
    current_popular.innerHTML = '';
    summer_horror.innerHTML = '';
    summer_action.innerHTML = '';
    home_container.innerHTML = '';
    footerSpan.style.visibility = 'visible';
    state.ifSearching === false
        ? fetchData(
              `https://api.themoviedb.org/3/movie/${state.category}?language=${state.selectedLanguage}&page=${state.scrollPage}`
          )
        : fetchData(
              `https://api.themoviedb.org/3/search/movie?query=${state.prevSearchTitle}&include_adult=true&language=${state.selectedLanguage}&page=${state.scrollPage}`
          );
};

languageSelectButtons.forEach((button) => {
    button.addEventListener('change', (e) => {
        const chosenLanguage = e.target.value;
        changeLanguage(chosenLanguage);
    });
});
