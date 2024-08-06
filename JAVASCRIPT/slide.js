import { slideWrapper, options } from "./index.js";
import { state } from "./state.js";
let currentSlide = 1;
let isSliding = false; // 영화 슬라이드 중인지 확인

const moveSlide = () => {
  slideWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
};

const slideAnimation = () => {
  slideWrapper.style.transition = "0.4s";
  setTimeout(() => {
    isSliding = false;
  }, 400);
};

const passSlideTransition = () => {
  const totalSlides = document.querySelectorAll(".slide-wrapper li").length;
  slideWrapper.style.transition = "0.4s";

  if (currentSlide === 0) {
    setTimeout(() => {
      currentSlide = totalSlides - 2;
      slideWrapper.style.transition = "none";
      moveSlide();
      setTimeout(() => {
        isSliding = false;
      }, 0);
    }, 400);
  } else if (currentSlide === totalSlides - 1) {
    setTimeout(() => {
      currentSlide = 1;
      slideWrapper.style.transition = "none";
      moveSlide();
      setTimeout(() => {
        isSliding = false;
      }, 0);
    }, 400);
  } else {
    slideAnimation();
  }
};

const clickSlideBtn = (e) => {
  if (isSliding) return; // 슬라이드 중이라면 함수 실행 X
  isSliding = true; // 슬라이드 시작
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(autoSlide, 3000);
  e.target.className === "slide-prev-btn"
    ? (currentSlide -= 1)
    : (currentSlide += 1);
  moveSlide();
  passSlideTransition();
};

const autoSlide = () => {
  currentSlide += 1;
  moveSlide();
  passSlideTransition();
};

let autoSlideInterval = setInterval(autoSlide, 3000);

const slideMovies = async () => {
  try {
    const response = await fetch(
      `
      https://api.themoviedb.org/3/movie/now_playing?language=${state.selectedLanguage}&page=1`,
      options
    );
    const movies = await response.json();
    const movieData = movies.results;
    console.log(movieData);
    slideWrapper.innerHTML = "";

    movieData.forEach((movie) => {
      const movieBackdrop = `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`;
      // const movieLi = <li><img src=${movieBackdrop}></li>;
      const movieLi = `<li style="background: url(${movieBackdrop}); background-size: cover; background-position: center">
        <div class="slide-hover-container">
          <span class="slide-title">${movie.title}</span>
          <div><span class="slide-vote_average">${movie.vote_average.toFixed(
            1
          )}</span>/10</div>
          <input type="button" value="자세히 보기"></button>
        </div>
      </li>`;
      slideWrapper.innerHTML += movieLi;
    });

    const movieList = document.querySelectorAll(".slide-wrapper li");
    const firstMovie = movieList[0].cloneNode(true);
    const lastMovie = movieList[movieList.length - 1].cloneNode(true);
    slideWrapper.insertBefore(lastMovie, movieList[0]);
    slideWrapper.appendChild(firstMovie);

    slideWrapper.addEventListener("mouseover", (e) => {
      const hoverContainer = e.target
        .closest("li")
        .querySelector(".slide-hover-container");
      if (hoverContainer) {
        hoverContainer.style.display = "flex";
        clearInterval(autoSlideInterval);
      }
    });

    slideWrapper.addEventListener("mouseout", (e) => {
      const hoverContainer = e.target
        .closest("li")
        .querySelector(".slide-hover-container");
      if (hoverContainer) {
        hoverContainer.style.display = "none";
        autoSlideInterval = setInterval(autoSlide, 3000);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener("DOMContentLoaded", slideMovies());
document
  .querySelector(".slide-prev-btn")
  .addEventListener("click", (e) => clickSlideBtn(e));
document
  .querySelector(".slide-next-btn")
  .addEventListener("click", (e) => clickSlideBtn(e));
