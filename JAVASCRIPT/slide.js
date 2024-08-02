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

const clickSlideBtn = (e) => {
  if (isSliding) return; // 슬라이드 중이라면 함수 실행 X
  isSliding = true; // 슬라이드 시작
  const totalSlides = document.querySelectorAll(".slide-wrapper li").length;
  slideWrapper.style.transition = "0.4s";

  if (e.target.className === "slide-prev-btn") {
    currentSlide -= 1;
    moveSlide();

    if (currentSlide === 0) {
      setTimeout(() => {
        currentSlide = totalSlides - 2;
        slideWrapper.style.transition = "none";
        moveSlide();
        setTimeout(() => {
          isSliding = false;
        }, 0);
      }, 400);
    } else {
      slideAnimation();
    }
  } else {
    currentSlide += 1;
    moveSlide();

    if (currentSlide === totalSlides - 1) {
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
  }
};

export const slideMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?language=${state.isLanguageKorean ? "ko-KR" : "en-UN"}&page=1`,
      options
    );
    const movies = await response.json();
    const movieData = movies.results;
    console.log(movieData);
    slideWrapper.innerHTML = "";

    movieData.forEach((movie) => {
      const movieBackdrop = `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`;
      const movieLi = `<li><img src=${movieBackdrop}></li>`;
      slideWrapper.innerHTML += movieLi;
    });

    const movieList = document.querySelectorAll(".slide-wrapper li");
    const firstMovie = movieList[0].cloneNode(true);
    const lastMovie = movieList[movieList.length - 1].cloneNode(true);
    slideWrapper.insertBefore(lastMovie, movieList[0]);
    slideWrapper.appendChild(firstMovie);

    document.querySelector(".slide-prev-btn").addEventListener("click", (e) => clickSlideBtn(e));
    document.querySelector(".slide-next-btn").addEventListener("click", (e) => clickSlideBtn(e));
  } catch (error) {
    console.log(error);
  }
};
