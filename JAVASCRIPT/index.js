import { getModalMovie } from './modal.js';
import { state } from './state.js';
import { changeLanguage } from './language.js';
import { changeCategory } from './category.js';
import { searchMovie } from './search.js';
import { current_popular, summer_horror, summer_action, home_container } from './genre.js';
export const categorySpan = document.getElementById('category-span');
export const categoryList = document.getElementById('category-list');
export const homeWrapper = document.querySelector('.home-wrapper');
export let inputValue = document.getElementById('title-input');
export const languageToggle = document.getElementById('chk1');
export const modal = document.querySelector('dialog');
export const footerSpan = document.querySelector('footer span');
export const logo = document.querySelector('header .logo');
export const slideWrapper = document.querySelector('.slide-wrapper ul');
export const slidePrevBtn = document.querySelector('.slide-prev-btn');
export const slideNextBtn = document.querySelector('.slide-next-btn');

export const incrementScrollPage = () => {
    state.scrollPage++;
};

if (state.prevCategory === '') {
    categorySpan.innerHTML = '카테고리';
}
const options2 = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzcxNjA2ZDhjZjFhNzExMGM3NDA4NDgyMzRkYTI5OCIsIm5iZiI6MTcyMjQwOTA0OS4yMTkxNDksInN1YiI6IjY2OWRhNDQxZjE3YTkxMjZkMjRjMzE2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.irIRry7DTrV5CvuN3cTBzck3de9c2n5deQwiPzm3hbw',
    },
};
// export const trendingMovies = (url) => {
//     fetch(url, options2)
//         .then((response) => response.json())
//         .then((response) => {
//             console.log(response);
//             const trendingmovieLists = response['results'];
//             console.log(trendingmovieLists);
//             current_popular(trendingmovieLists);
//             summer_horror(trendingmovieLists);
//             summer_action(trendingmovieLists);
//             home_container(trendingmovieLists);
//             footerSpan.style.visibility = 'hidden';
//         })
//         .catch((err) => console.error(err));
// };

let trendingmovieLists = [];
export async function fetchData(url) {
    const result = await fetch(url, options2);
    const trendingmovies = await result.json();
    const trendingmovieLists = trendingmovies.results;
    current_popular(trendingmovieLists);
    summer_horror(trendingmovieLists);
    summer_action(trendingmovieLists);
    home_container(trendingmovieLists);
}

export { trendingmovieLists };
export default { trendingmovieLists };

export const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDQxY2NmMGE4YmNiYmVjYTE3ZWY4OTk4OGM5ZTQxZiIsIm5iZiI6MTcyMTgwNTUxNy44NDgzMywic3ViIjoiNjZhMDlmZWIzMmQ0ZTYxZTZmMGJlODQ5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.McCnuBIhgFLuzaTHkJbG1nR5CgByY76zlj9HV4QAoBQ',
    },
};

export const fetchAndDisplayMovies = (url) => {
    fetch(url, options)
        .then((response) => response.json())
        .then((response) => {
            state.moviedata = [...response.results];
            console.log(state.moviedata);
            displayMovies(state.moviedata);
            footerSpan.style.visibility = 'hidden';
        })
        .catch((err) => console.error(err));
};

const displayMovies = (movies) => {
    movies.forEach((movie) => {
        //    const moviePoster = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
        //     const movieList = `
        //   <div class="movie-box" id=${movie.id}>
        //     <div class="movie-box-wrapper" id=${movie.id}>
        //       <div class="movie_img">
        //         <img src="${moviePoster}" alt="${movie.title}" id=${movie.id}/>
        //       </div>
        //       <div class="movie_sub">
        //         <p id=${movie.id}>${movie.title}</p><br/>
        //         <p>${movie.vote_average}</p>
        //       </div>
        //     </div>
        //   </div>`;
        //     homeWrapper.innerHTML += movieList;
    });

    // 영화 포스터 클릭하면 모달창 띄우는 이벤트를 movie-box에 forEach로 붙임
    document.querySelectorAll('.movie-box').forEach((box) => {
        box.addEventListener('click', (e) => {
            // getModalMovie(e.target.id);
            // modal.showModal();
            // document.body.style.overflow = "hidden";

            // 디테일 페이지로 이동
            const movieCard = e.target.closest('.movie-box');
            const movieId = movieCard.getAttribute('data-movieIdData');
            const detailPageUrl = `detail.html?id=${movieId}`; // 영화 아이디값을 다음 페이지로 넘기기
            window.open(detailPageUrl, '_blank');
        });
    });
};

// 처음 화면에 불러오는 데이터
window.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayMovies(
        `https://api.themoviedb.org/3/movie/popular?language=${state.isLanguageKorean ? 'ko-KR' : 'en-UN'}&page=1`
    );
});
window.addEventListener('DOMContentLoaded', () => {
    fetchData(
        `https://api.themoviedb.org/3/trending/movie/day?language=${state.isLanguageKorean ? 'ko-KR' : 'en-UN'}&page=1`
    );
});

// 모달창 바깥쪽 클릭하면 모달창 닫기
modal.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) modal.close();
    document.body.style.overflow = 'auto';
});

// STM 로고 누르면 페이지 새로고침
logo.addEventListener('click', () => {
    window.location.href = 'index.html';
});

//document.addEventListener('scroll', handleScroll());
