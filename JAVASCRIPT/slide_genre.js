import { current_popular, summer_horror, summer_action, home_container } from './genre.js';
import { homeWrapper, footerSpan, fetchAndDisplayMovies, trendingmovieLists } from './index.js';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzcxNjA2ZDhjZjFhNzExMGM3NDA4NDgyMzRkYTI5OCIsIm5iZiI6MTcyMjQwOTA0OS4yMTkxNDksInN1YiI6IjY2OWRhNDQxZjE3YTkxMjZkMjRjMzE2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.irIRry7DTrV5CvuN3cTBzck3de9c2n5deQwiPzm3hbw',
    },
};

export async function fetchData(url) {
    const result = await fetch(url, options);
    const trendingmovies = await result.json();
    const trendingmovieLists = trendingmovies.results;

    /* 첫 번째 슬라이드 */
    let slides1 = document.querySelector('.current_popular'),
        currentIdx1 = 0,
        slideCount1 = trendingmovieLists.length,
        slideWidth1 = 300,
        slideMargin1 = 30,
        prevBtn1 = document.querySelector('.prev1'),
        nextBtn1 = document.querySelector('.next1');

    slides1.style.width = (slideWidth1 + slideMargin1) * slideCount1 - slideMargin1 + 'px';

    function moveSlide(num) {
        slides1.style.left = -num * 330 + 'px';
        currentIdx1 = num;
    }
    console.log(slideCount1);
    nextBtn1.addEventListener('click', function () {
        if (currentIdx1 < slideCount1 - 3) {
            moveSlide(currentIdx1 + 1);
        } else {
            moveSlide(0);
        }
    });

    prevBtn1.addEventListener('click', function () {
        if (currentIdx1 > 0) {
            moveSlide(currentIdx1 - 1);
        } else {
            moveSlide(slideCount1 - 3);
        }
    });

    /* 두 번째 슬라이드 */
    let slides2 = document.querySelector('.summer_horror'),
        currentIdx2 = 0;
    const summer_horrorList = trendingmovieLists.filter((object) => {
        return object.genre_ids.includes(27);
    });
    let slideCount2 = summer_horrorList.length,
        slideWidth2 = 300,
        slideMargin2 = 30,
        prevBtn2 = document.querySelector('.prev2'),
        nextBtn2 = document.querySelector('.next2');

    slides2.style.width = (slideWidth2 + slideMargin2) * slideCount2 - slideMargin2 + 'px';

    function moveSlide2(num) {
        slides2.style.left = -num * 330 + 'px';
        currentIdx2 = num;
    }
    console.log(slideCount2);
    nextBtn2.addEventListener('click', function () {
        if (currentIdx2 < slideCount2 - 3) {
            moveSlide2(currentIdx2 + 1);
        } else {
            moveSlide2(0);
        }
    });

    prevBtn2.addEventListener('click', function () {
        if (currentIdx2 > 0) {
            moveSlide2(currentIdx2 - 1);
        } else {
            moveSlide2(slideCount2 - 3);
        }
    });

    /* 세 번째 슬라이드 */
    let slides3 = document.querySelector('.summer_action'),
        currentIdx3 = 0;
    const summer_actionList = trendingmovieLists.filter((object) => {
        return object.genre_ids.includes(28);
    });
    let slideCount3 = summer_actionList.length,
        slideWidth3 = 300,
        slideMargin3 = 30,
        prevBtn3 = document.querySelector('.prev3'),
        nextBtn3 = document.querySelector('.next3');

    slides3.style.width = (slideWidth3 + slideMargin3) * slideCount3 - slideMargin3 + 'px';

    function moveSlide3(num) {
        slides3.style.left = -num * 330 + 'px';
        currentIdx3 = num;
    }
    console.log(slideCount3);
    nextBtn3.addEventListener('click', function () {
        if (currentIdx3 < slideCount3 - 3) {
            moveSlide3(currentIdx3 + 1);
        } else {
            moveSlide3(0);
        }
    });

    prevBtn3.addEventListener('click', function () {
        if (currentIdx3 > 0) {
            moveSlide3(currentIdx3 - 1);
        } else {
            moveSlide3(slideCount3 - 3);
        }
    });

    /* 네 번째 슬라이드 */
    let slides4 = document.querySelector('.home-container'),
        currentIdx4 = 0;
    const home_containerList = trendingmovieLists.filter((object) => {
        return object.genre_ids.includes(16);
    });
    let slideCount4 = home_containerList.length,
        slideWidth4 = 300,
        slideMargin4 = 30,
        prevBtn4 = document.querySelector('.prev4'),
        nextBtn4 = document.querySelector('.next4');

    slides4.style.width = (slideWidth4 + slideMargin4) * slideCount4 - slideMargin4 + 'px';

    function moveSlide4(num) {
        slides4.style.left = -num * 330 + 'px';
        currentIdx4 = num;
    }
    console.log(slideCount4);
    nextBtn4.addEventListener('click', function () {
        if (currentIdx4 < slideCount4 - 3) {
            moveSlide4(currentIdx4 + 1);
        } else {
            moveSlide4(0);
        }
    });

    prevBtn4.addEventListener('click', function () {
        if (currentIdx4 > 0) {
            moveSlide4(currentIdx4 - 1);
        } else {
            moveSlide4(slideCount4 - 3);
        }
    });
}

fetchData('https://api.themoviedb.org/3/trending/movie/day?language=ko-KR&page=1');
