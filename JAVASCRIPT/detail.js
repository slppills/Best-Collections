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

export const getDetailMovie = (movieId) => {
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
    console.log(actorData);

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



  
