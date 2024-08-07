
import { state } from "./state.js";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjgzMmI4ODY5ZTE4MWViZTkyMTJmMmI4ZTlmYThkYiIsIm5iZiI6MTcyMjkwNzU5NS41MDUzMDYsInN1YiI6IjY2YTMzOTY2MzFkNTM0ZWU0YjYxNDA5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HyylzlMpU0I2wK9FtrDUtlidoGFQjajUDM-uropsmjA'
  }
};

function getUrlId() {
  return new URLSearchParams(window.location.search).get('id');
}

const movieId = getUrlId()

const getDetailMovie = (movieId) => {
  // const detailWrapper = document.querySelector(".modal");
  // const detailLoading = `
  //      <div class="detail-loading"><span>Loading....</span></div>
  // `;
  // detailWrapper.innerHTML = detailLoading;


fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=${state.selectedLanguage}`, options)

  .then((response) => response.json()) 
  .then((response) => {
    const detailMovieData = response;
    console.log(detailMovieData);
    const backMoviePoster = `https://image.tmdb.org/t/p/w500/${detailMovieData.backdrop_path}`; 
    const detailMoviePoster = `https://image.tmdb.org/t/p/w500/${detailMovieData.poster_path}`;
    const detailMovieInfo = `
    
  <div class="back-poster-container">
    <img class="back-poster-img" src=${backMoviePoster} alt=${detailMovieData.title}>
 </div>

    
  <div class="movie-info-container"> 
    <div class="inner">

      
      <div class="info-container"> 
        
       <div class="movie-poster-container">
        <img class="movie-poster-img" src=${detailMoviePoster} alt=${detailMovieData.title}>
               </div>
       
       <div class="movie-info"> 
       <div class="title-container">
        <p class="detail-title">${detailMovieData.title}</p>
       </div>

       <div class="genres-container">
        <h3>장르</h3>
        <p>${detailMovieData.genres.map((genre) => `<span>${genre.name}</span>`)}</p>
       </div>

        <div class="date-container">
          <h3>개봉일</h3>
           <p>${detailMovieData.release_date}</p>
        </div>

        <div class="grade-container">
          <h3>평점</h3>
          <p>${detailMovieData.vote_average}</p>
        </div>

      </div> 
    </div>
  
      
      <div class="moovie-summary">
        <div>
          <h2>${detailMovieData.tagline}</h2>
          <p>${detailMovieData.overview}</p>
        </div>
      </div>  
    </div>
  </div>
</div>

    `;
    document.querySelector('#main-containers').innerHTML = detailMovieInfo;
    
  });
};
getDetailMovie(movieId);

////////////////////////////////////출연진////////////////////////////////////////////////////////




fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`, options)
  .then(response => response.json())
  .then((response) => {
    const actorData = response.cast;
    

    actorData.forEach((data) => {
      const actorImage = `https://image.tmdb.org/t/p/w200/${data.profile_path}`;
      const actorList = `
        <div class="actor-container">
        <a>
          <img class="actor-poster" src=${actorImage} alt=${data.name}>
        </a>
        <p class="actor-name">${data.name}</p>
          `;
        document.querySelector('.actor-main-container').innerHTML += actorList;
    })
 });





// const reviewSubmitBtn = document.getElementById('review-submit-btn');
// const reviewInput = document.getElementById('review-input');
// const reviewerNameInput = document.getElementById('reviewer-name-input');
// const reviewerPassInput = document.getElementById('reviewer-password-input');
// const reviewRatingSelect = document.getElementById('rating-star');
// let ratingValue = '';

// // 이전 페이지에서 ID 값 가져오기
// // function getUrlId() {
// //     return new URLSearchParams(window.location.search).get('id');
// // }

// // const movieId = getUrlId(); // URL에서 가져온 아이디

// reviewRatingSelect.addEventListener('change', () => {
//     ratingValue = reviewRatingSelect.value.trim();
// });

// reviewSubmitBtn.addEventListener('click', () => {
//     if (reviewInput.value.trim() === '') {
//         alert("리뷰를 입력해주세요!");
//     } else if (reviewerNameInput.value.trim() === '' || reviewerPassInput.value.trim() === '') {
//         alert("이름과 비밀번호를 입력해주세요!");
//     } else if (ratingValue === '') {
//         alert("별점을 매겨주세요!");
//     } else {
//         saveReview();
//     }
// });

// function saveReview() {
//     let reviewArray = JSON.parse(localStorage.getItem('reviewInfoAll')) || [];

//     let review = {
//         name: reviewerNameInput.value,
//         password: reviewerPassInput.value,
//         content: reviewInput.value,
//         rating: ratingValue,
//         date: new Date().toISOString().split('T')[0],
//         movieId: movieId, // 아이디 포함
//         reviewUniqueId: Math.random().toString()
//     };

//     // 배열에 새로운 리뷰 추가
//     reviewArray.push(review);
//     localStorage.setItem('reviewInfoAll', JSON.stringify(reviewArray));
//     alert("작성완료!");

//     displayReview(); // 화면에 뿌리기
//     document.querySelectorAll('input, textarea, select').forEach(allInput => allInput.value = ''); // 입력값 리셋
// }

// function displayReview() {
//     let reviewArray = JSON.parse(localStorage.getItem('reviewInfoAll')) || []; // 로컬에 저장된 값 가져오기
//     let filteredReviews = reviewArray.filter(function (review) {
//         return review.movieId === movieId;
//     }); // 아이디 값 같은지 확인

//     let temp_html = '';
//     filteredReviews.reverse().forEach(review => {
//         temp_html += ` 
//             <div class="review-card" data-password="${review.password}" data-UniqueId="${review.reviewUniqueId}">
//                 <div class="review-card-header">
//                     <h3 id="reviewer-name">🪐 ${review.name} </h3>
//                     <span id="review-date">${review.date}</span>                   
//                 </div>
//                 <div class="review-card-content">
//                 ${review.content}
//                 </div>
//                 <div class="review-card-footer">
//                     <span id="review-rating">${review.rating}</span>
//                 </div>
//             </div>
//             `
//     });
//     document.getElementById('review-list').innerHTML = temp_html;
// }

// document.addEventListener('DOMContentLoaded', () => {
//     displayReview();
// });


// document.getElementById('review-list').addEventListener('click', function (event) {
//     let reviewCard = event.target.closest('.review-card');
//     let reviewDeleteBtn = event.target.closest('.review-delete-button');
//     let reviewId = reviewCard.getAttribute('data-reviewId');
//     //리뷰 삭제
//     let enteredPassword = prompt('삭제하려면 비밀번호를 입력하세요.');
//     let savedPassword = reviewCard.getAttribute('data-password');
//     let reviewUniqueId = reviewCard.getAttribute('data-UniqueId');
//     if (enteredPassword === savedPassword) {
//         reviewCard.remove(); // 화면에서 카드 지우기
//         let reviewArray = JSON.parse(localStorage.getItem('reviewInfoAll')) || []; // 로컬에 저장된 값 가져오기
//         let removeReviews = reviewArray.filter(function (review) { // 유니크 아이디 다른거 필터링
//             return review.reviewUniqueId !== reviewUniqueId;
//         });
//         localStorage.setItem('reviewInfoAll', JSON.stringify(removeReviews)); // 필터링 된 배열 새로 set
//         alert("삭제되었습니다.");
//     } else {
//         alert("비밀번호가 틀렸습니다.");
//     }
// });


document.addEventListener('DOMContentLoaded', function () {
  const reviewSubmitBtn = document.getElementById('review-submit-btn');
  const reviewInput = document.getElementById('review-input');
  const reviewerNameInput = document.getElementById('reviewer-name-input');
  const reviewerPassInput = document.getElementById('reviewer-password-input');
  const reviewRatingSelect = document.getElementById('rating-star');
  let ratingValue = '';

 
    reviewRatingSelect.addEventListener('change', () => {
      ratingValue = reviewRatingSelect.value.trim();
    });

    reviewSubmitBtn.addEventListener('click', () => {
      if (reviewInput.value.trim() === '') {
        alert("리뷰를 입력해주세요!");
      } else if (reviewerNameInput.value.trim() === '' || reviewerPassInput.value.trim() === '') {
        alert("이름과 비밀번호를 입력해주세요!");
      } else if (ratingValue === '') {
        alert("별점을 매겨주세요!");
      } else {
        saveReview();
      }
    });

    function saveReview() {
      let reviewArray = JSON.parse(localStorage.getItem('reviewInfoAll')) || [];

      let review = {
        name: reviewerNameInput.value,
        password: reviewerPassInput.value,
        content: reviewInput.value,
        rating: ratingValue,
        date: new Date().toISOString().split('T')[0],
        movieId: movieId, // 아이디 포함
        reviewUniqueId: Math.random().toString()
      };

      // 배열에 새로운 리뷰 추가
      reviewArray.push(review);
      localStorage.setItem('reviewInfoAll', JSON.stringify(reviewArray));
      alert("작성완료!");

      displayReview(); // 화면에 뿌리기
      document.querySelectorAll('input, textarea, select').forEach(allInput => allInput.value = ''); // 입력값 리셋
    }

    function displayReview() {
      let reviewArray = JSON.parse(localStorage.getItem('reviewInfoAll')) || []; // 로컬에 저장된 값 가져오기
      let filteredReviews = reviewArray.filter(function (review) {
        return review.movieId === movieId;
      }); // 아이디 값 같은지 확인

      let temp_html = '';
      filteredReviews.reverse().forEach(review => {
        temp_html += ` 
          <div class="review-card" data-password="${review.password}" data-UniqueId="${review.reviewUniqueId}">
              <div class="review-card-header">
                  <h3 id="reviewer-name">🪐 ${review.name} </h3>
                  <span id="review-date">${review.date}</span>                   
              </div>
              <div class="review-card-content">
              ${review.content}
              </div>
              <div class="review-card-footer">
                  <span id="review-rating">${review.rating}</span>
              </div>
          </div>
          `
      });
      document.getElementById('review-list').innerHTML = temp_html;
    }

    document.getElementById('review-list').addEventListener('click', function (event) {
      let reviewCard = event.target.closest('.review-card');
      if (reviewCard) {
        let enteredPassword = prompt('삭제하려면 비밀번호를 입력하세요.');
        let savedPassword = reviewCard.getAttribute('data-password');
        let reviewUniqueId = reviewCard.getAttribute('data-UniqueId');
        if (enteredPassword === savedPassword) {
          reviewCard.remove(); // 화면에서 카드 지우기
          let reviewArray = JSON.parse(localStorage.getItem('reviewInfoAll')) || []; // 로컬에 저장된 값 가져오기
          let removeReviews = reviewArray.filter(function (review) { // 유니크 아이디 다른거 필터링
            return review.reviewUniqueId !== reviewUniqueId;
          });
          localStorage.setItem('reviewInfoAll', JSON.stringify(removeReviews)); // 필터링 된 배열 새로 set
          alert("삭제되었습니다.");
        } else {
          alert("비밀번호가 틀렸습니다.");
        }
      }
    });

    displayReview();
   
});
