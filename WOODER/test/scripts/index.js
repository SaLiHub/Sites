'use strict';
import createHorizontalSlider from '/scripts/horizontalSlider.js';
import createVerticalSlider from '/scripts/verticalSlider.js';

// header
const hamburger = document.querySelector('.header__hamburger'),
  hamburgerMenuText = document.querySelector('.header__hamburger-text'),
  hamburgerMenu = document.querySelector('.header__hamburger-menu'),
  headerCloseSign = document.querySelector('.header__toggle-menu-cross-sign'),
  pageBody = document.querySelector('.wooder'),
  headerToggleMenuLink = document.querySelectorAll('.header__toggle-menu-link');

// hamburger
function hamburgerToggle() {
  pageBody.classList.add('opacity_off');
  hamburgerMenu.style.cursor = 'auto';
  setTimeout(() => {
    hamburgerMenu.classList.add('active');
    pageBody.style.overflow = 'hidden';
    pageBody.classList.remove('opacity_off');
  }, 500);
}

hamburger.addEventListener('click', hamburgerToggle);
hamburgerMenuText.addEventListener('click', hamburgerToggle);
// closeMenu function

function closeMenu() {
  pageBody.classList.add('opacity_off');

  setTimeout(() => {
    hamburgerMenu.classList.remove('active');
    pageBody.classList.remove('opacity_off');
    pageBody.style.overflow = 'visible';
  }, 500);
  hamburgerMenu.style.cursor = 'pointer';
}

// header cross sign
headerCloseSign.addEventListener('click', () => {
  closeMenu();
});

// header toggle menu links
headerToggleMenuLink.forEach((el) => {
  el.addEventListener('click', () => {
    closeMenu();
  });
});

// header end ///////////////////////////////////

// banner

const bannerBtn = document.querySelector('.banner__button');

// banner end /////////////////////////////

// swiper slide
const firebaseConfig = {
  apiKey: 'AIzaSyA4apyHWSRjMvYyvrzegqNv5weVktk-XMs',
  authDomain: 'wooder-1fb11.firebaseapp.com',
  projectId: 'wooder-1fb11',
  storageBucket: 'wooder-1fb11.appspot.com',
  messagingSenderId: '852775924188',
  appId: '1:852775924188:web:5107a8944b53cc1a705f19',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
function databaseInit() {
  return firebase.database().ref('/').once('value');
}

(async function sliderInit() {
  let jsonBanner;
  // get data of banner content from db and assign it to jsonBanner
  await databaseInit().then((answer) => (jsonBanner = answer.val()));
  // call function wich creates sliders filling each with data
  createSlides(jsonBanner.sliderContent);
  // call function wich sets horizontal or vertical direction
  // according to the size of user viewport and returns the direction
  const dir = setDirForSlider();
  // create slider according to the dirrection
  dir === 'horizontal' ? createHorizontalSlider() : createVerticalSlider();
})();

function createSlides(sliderContent) {
  // iterate through each slide that came from db
  for (let i = 0; i < sliderContent.length; i++) {
    // each iteration create slider(banner) and fill it with content from db
    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('slider-slide');
    const bannerContent = document.createElement('div');
    bannerContent.classList.add('banner__content');
    bannerContent.innerHTML = `
          <div class="banner__title-container">
              <h2 class="banner__title">${sliderContent[i].title}</h2>
          </div>
          <div class="banner__text-container">
              <p class="banner__text">${sliderContent[i].text}</p>
          </div>
          `;
    swiperSlide.appendChild(bannerContent);
    sliderWrapper.appendChild(swiperSlide);
  }
}

function setDirForSlider() {
  let sliderDirection = 'vertical',
    smallWindow = false;
  if (window.innerWidth < 1010) {
    sliderDirection = 'horizontal';
    smallWindow = true;
  }

  // add resize listener and dirrection of slider
  // in accordance with the size of user viewport
  window.addEventListener('resize', () => {
    if (window.innerWidth < 1010) {
      if (smallWindow === false) {
        smallWindow = true;
        location.reload();
      }
    } else {
      if (smallWindow === true) {
        smallWindow = false;
        location.reload();
      }
    }
  });

  return sliderDirection;
}

function triggerVideo(e) {
  // show wrapper when button or img was clicked
  if (e.target.classList.contains('video__button') || e.target.classList.contains('about-wooder__photo')) {
    e.target.parentElement.querySelector('.video__container').style.display = 'flex';
  }
  // hide wrapper if click was on it
  if (e.target.classList.contains('video__wrapper')) {
    e.target.parentElement.style.display = 'none';
  }
}

function allGlobalEventCallbacks(e) {
  triggerVideo(e);
}

pageBody.addEventListener('click', allGlobalEventCallbacks);
