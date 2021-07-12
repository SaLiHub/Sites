'use strict';

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
  // call function that creates slider by virtue of slides
  // that were created earlier in code by function createSlides
  createSlider(dir);
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

function createSlider(sliderDirection) {
  const sliderContainer = document.querySelector('#sliderContainer'),
    sliderWrapper = document.querySelector('#sliderWrapper'),
    slides = document.querySelectorAll('.slider-slide'),
    sliderPagination = document.querySelector('#sliderPagination'),
    counter = document.querySelector('#countNumber');

  let holding = false,
    slidePosition = 0,
    indexOfActiveSlide = 0,
    startY,
    y,
    startX,
    x,
    slideHeight,
    slideWidth,
    startOfHolding,
    endOfHolding,
    moved = false,
    intercepted = false,
    nextSlideExecution,
    prevSlideExecution,
    nextSlideExecuted = false,
    prevSlideExecuted = false,
    prevActiveSlide,
    nextActiveSlide,
    bullets,
    numberOfInterceptions = 0;

  (function init() {
    initBullets();
    setCurrentSlideNumber();
    addActiveSlideAndBullet(indexOfActiveSlide);
    initEventListeners();
    setSizeOfSlide();
    addTransparentHighlight();
  })();

  function addTransparentHighlight() {
    sliderContainer.classList.add('highlight-transparent');
  }

  function setCurrentSlideNumber() {
    if (indexOfActiveSlide + 1 >= 10) {
      counter.innerText = `${indexOfActiveSlide + 1}`;
    } else {
      counter.innerText = `0${indexOfActiveSlide + 1}`;
    }
  }

  function setSizeOfSlide() {
    slideHeight = sliderContainer.offsetHeight;
    slideWidth = sliderContainer.offsetWidth;
  }

  function initBullets() {
    for (let i = 0; i < slides.length; i++) {
      createBullet(i);
    }

    bullets = document.querySelectorAll('.slider-pagination-bullet');
  }

  function triggerBullets(e) {
    if (e.target.classList.contains('slider-pagination-bullet')) {
      bulletClickTriger(Number(e.target.dataset.bulletIndex));
    }
  }

  function createBullet(index) {
    let el = document.createElement('span');
    el.classList.add('slider-pagination-bullet');
    el.dataset.bulletIndex = index;
    sliderPagination.appendChild(el);
  }

  function changeSliderPosition(indexOfNewActiveSlide) {
    setSliderPosition(indexOfNewActiveSlide);
    // add transition durration durring changing slides
    addTransitionDuration();
  }

  function addTransitionDuration() {
    sliderWrapper.style.transitionDuration = '300ms';
  }

  function removeTransitionDuration() {
    sliderWrapper.style.transitionDuration = '0ms';
  }

  function bulletClickTriger(indexOfNewActiveSlide) {
    changeSliderPosition(indexOfNewActiveSlide);
    setNewActiveSlideAndBullet(indexOfNewActiveSlide);
    setCurrentSlideNumber();
  }

  function setSliderPosition(indexOfSlide) {
    if (sliderDirection === 'horizontal') {
      slidePosition = slideWidth * indexOfSlide;
      sliderWrapper.style.transform = `translate3d(${-slidePosition}px, 0, 0)`;
    } else if (sliderDirection === 'vertical') {
      slidePosition = slideHeight * indexOfSlide;
      sliderWrapper.style.transform = `translate3d(0, ${-slidePosition}px, 0)`;
    }
  }

  function removePrevActiveSlideAndBullet(i) {
    slides[i].classList.remove('active-slide');
    bullets[i].classList.remove('active-bullet');
  }

  function addActiveSlideAndBullet(i) {
    slides[i].classList.add('active-slide');
    bullets[i].classList.add('active-bullet');
  }

  function setNewActiveSlideAndBullet(newIndex, prevIndex = indexOfActiveSlide) {
    removePrevActiveSlideAndBullet(prevIndex);
    addActiveSlideAndBullet(newIndex);
    setNewIndexOfActiveSlide(newIndex);
  }

  function setNewIndexOfActiveSlide(newIndex) {
    indexOfActiveSlide = newIndex;
  }

  function startOfDragging(e) {
    // if click was on pagination bar or right click was used
    // then slider-dragging is not getting triggered
    const elementsClickedId = [e.target.id, e.target.parentElement.id];
    if (elementsClickedId.includes('sliderPagination') || e.buttons === 2) return;

    startOfHolding = new Date().getTime();
    intercepted = false;
    holding = true;

    if (sliderWrapper.style.transitionDuration === '300ms') {
      numberOfInterceptions += 1;
      if (
        numberOfInterceptions >= 2 &&
        !slides[0].classList.contains('active-slide') &&
        !slides[slides.length - 1].classList.contains('active-slide')
      )
        return;

      intercepted = true;
    } else {
      intercepted = false;
      if (slidePosition === slideWidth * indexOfActiveSlide || slidePosition === slideHeight * indexOfActiveSlide) {
        numberOfInterceptions = 0;
        nextActiveSlide = false;
        prevActiveSlide = false;
      }
    }

    if (sliderDirection === 'horizontal') {
      startX = e.pageX;
      startY = e.pageY;
      const timeStop = startOfHolding - endOfHolding;
      if (intercepted) {
        const speed = (slideWidth - Math.abs(x)) / 300;
        const distance = timeStop * speed;
        if (nextSlideExecution) {
          if (slides[slides.length - 1].classList.contains('active-slide') && !nextActiveSlide) {
            slidePosition = slidePosition + (Math.abs(x) - (Math.abs(x) / 300) * timeStop);
          } else {
            slidePosition = slidePosition + (distance + Math.abs(x)) - slideWidth;
          }
        } else if (prevSlideExecution) {
          if (slides[0].classList.contains('active-slide') && !prevActiveSlide) {
            slidePosition = (Math.abs(x) / 300) * timeStop - Math.abs(x);
          } else {
            slidePosition = slidePosition - (distance + Math.abs(x)) + slideWidth;
          }
        }

        sliderWrapper.style.transform = `translate3d(${-slidePosition}px, 0, 0)`;
      }
    } else if (sliderDirection === 'vertical') {
      startX = e.pageX;
      startY = e.pageY;
      const timeStop = startOfHolding - endOfHolding;
      if (intercepted) {
        const speed = (slideHeight - Math.abs(y)) / 300;
        const distance = timeStop * speed;
        if (nextSlideExecution) {
          if (slides[slides.length - 1].classList.contains('active-slide') && !nextActiveSlide) {
            slidePosition = slidePosition + (Math.abs(y) - (Math.abs(y) / 300) * timeStop);
          } else {
            slidePosition = slidePosition + (distance + Math.abs(y)) - slideHeight;
          }
        } else if (prevSlideExecution) {
          if (slides[0].classList.contains('active-slide') && !prevActiveSlide) {
            slidePosition = (Math.abs(y) / 300) * timeStop - Math.abs(y);
          } else {
            slidePosition = slidePosition - (distance + Math.abs(y)) + slideHeight;
          }
        }

        sliderWrapper.style.transform = `translate3d(0, ${-slidePosition}px, 0)`;
      }
    }

    removeTransitionDuration();
    e.preventDefault();
  }

  function dragging(e) {
    // if user move mouse without holding slider won't get triggered
    if (!holding) return;
    e.preventDefault();

    if (sliderDirection === 'horizontal') {
      const dist = e.pageX - startX;

      if (dist === 0 && !moved) {
        holding = false;
        return;
      }

      if (dist > 0) {
        prevSlideExecution = true;
        nextSlideExecution = false;
      } else {
        prevSlideExecution = false;
        nextSlideExecution = true;
      }
      if (
        (dist > 0 && slides[0].classList.contains('active-slide') && !prevActiveSlide) ||
        (dist < 0 && slides[slides.length - 1].classList.contains('active-slide') && !nextActiveSlide)
      ) {
        const decrement = 2.2;
        sliderWrapper.style.transform = `translate3d(${-(slidePosition - dist / decrement)}px, 0, 0)`;
        x = dist / decrement;
      } else {
        x = dist;

        sliderWrapper.style.transform = `translate3d(${-(slidePosition - dist)}px, 0, 0)`;
      }
    } else if (sliderDirection === 'vertical') {
      const dist = e.pageY - startY;

      if (dist === 0 && !moved) {
        console.log('luck');
        holding = false;

        return;
      }

      if (dist > 0) {
        prevSlideExecution = true;
        nextSlideExecution = false;
      } else {
        prevSlideExecution = false;
        nextSlideExecution = true;
      }
      if (
        (dist > 0 && slides[0].classList.contains('active-slide') && !prevActiveSlide) ||
        (dist < 0 && slides[slides.length - 1].classList.contains('active-slide') && !nextActiveSlide)
      ) {
        const decrement = 2.2;
        sliderWrapper.style.transform = `translate3d(0, ${-(slidePosition - dist / decrement)}px, 0)`;
        y = dist / decrement;
      } else {
        y = dist;

        sliderWrapper.style.transform = `translate3d(0, ${-(slidePosition - dist)}px, 0)`;
      }
    }
    moved = true;
  }

  function endOfDragging(e) {
    if (!holding) return;
    holding = false;
    e.stopImmediatePropagation();
    if (!moved && !intercepted) {
      bannerBtn.setAttribute('href', 'learn-more.html');
      return;
    }
    bannerBtn.removeAttribute('href');
    moved = false;

    endOfHolding = new Date().getTime();
    const timeDiff = endOfHolding - startOfHolding;

    if (sliderDirection === 'horizontal') {
      if (Math.abs(x) < slideWidth / 2 && timeDiff > 200 && !intercepted) {
        if (
          (slides[0].classList.contains('active-slide') && x > 0) ||
          (slides[slides.length - 1].classList.contains('active-slide') && x < 0)
        ) {
          numberOfInterceptions = 0;
          currentSlide();
          holding = false;
          return;
        }
        numberOfInterceptions = 2;
        currentSlide();
        holding = false;
        return;
      }
      if (intercepted && prevSlideExecuted && x > 0) {
        prevActiveSlide = false;
        currentSlide();
        return;
      } else if (intercepted && nextSlideExecuted && x < 0) {
        nextActiveSlide = false;
        currentSlide();
        return;
      }

      if (x > 0 && !slides[0].classList.contains('active-slide')) {
        prevActiveSlide = true;
        prevSlide();
      } else if (x > 0 && slides[0].classList.contains('active-slide')) {
        currentSlide();
      } else if (x < 0 && !slides[slides.length - 1].classList.contains('active-slide')) {
        nextActiveSlide = true;
        nextSlide();
      } else if (x < 0 && slides[slides.length - 1].classList.contains('active-slide')) {
        currentSlide();
      }
    } else if (sliderDirection === 'vertical') {
      if (Math.abs(y) < slideHeight / 2 && timeDiff > 200 && !intercepted) {
        if (
          (slides[0].classList.contains('active-slide') && y > 0) ||
          (slides[slides.length - 1].classList.contains('active-slide') && y < 0)
        ) {
          numberOfInterceptions = 0;
          currentSlide();
          holding = false;
          return;
        }
        numberOfInterceptions = 2;
        currentSlide();
        holding = false;
        return;
      }
      if (intercepted && prevSlideExecuted && y > 0) {
        prevActiveSlide = false;
        currentSlide();
        return;
      } else if (intercepted && nextSlideExecuted && y < 0) {
        nextActiveSlide = false;
        currentSlide();
        return;
      }

      if (y > 0 && !slides[0].classList.contains('active-slide')) {
        prevActiveSlide = true;
        prevSlide();
      } else if (y > 0 && slides[0].classList.contains('active-slide')) {
        currentSlide();
      } else if (y < 0 && !slides[slides.length - 1].classList.contains('active-slide')) {
        nextActiveSlide = true;
        nextSlide();
      } else if (y < 0 && slides[slides.length - 1].classList.contains('active-slide')) {
        currentSlide();
      }
    }
  }

  function currentSlide() {
    setSliderPosition(indexOfActiveSlide);
    addTransitionDuration();
  }

  function prevSlide() {
    const newActiveSlide = indexOfActiveSlide - 1,
      prevActiveSlide = indexOfActiveSlide;
    setSliderPosition(newActiveSlide);
    setNewActiveSlideAndBullet(newActiveSlide, prevActiveSlide);
    addTransitionDuration();

    prevSlideExecution = true;
    prevSlideExecuted = true;
    nextSlideExecution = false;
    nextSlideExecuted = false;

    setCurrentSlideNumber();
  }

  function nextSlide() {
    const newActiveSlide = indexOfActiveSlide + 1,
      prevActiveSlide = indexOfActiveSlide;
    setSliderPosition(newActiveSlide);
    setNewActiveSlideAndBullet(newActiveSlide, prevActiveSlide);
    addTransitionDuration();

    prevSlideExecution = false;
    prevSlideExecuted = false;
    nextSlideExecution = true;
    nextSlideExecuted = true;

    setCurrentSlideNumber();
  }

  function initEventListeners() {
    if (window.PointerEvent) {
      sliderContainer.addEventListener('pointerdown', startOfDragging);
      sliderContainer.addEventListener('pointermove', dragging);
      sliderContainer.addEventListener('pointerup', endOfDragging);
      sliderContainer.addEventListener('pointercancel', endOfDragging);

      //

      sliderContainer.addEventListener('mouseleave', endOfDragging);
    } else {
      sliderContainer.addEventListener('mousedown', startOfDragging);
      sliderContainer.addEventListener('mousemove', dragging);
      sliderContainer.addEventListener('mouseup', endOfDragging);
      sliderContainer.addEventListener('mouseleave', endOfDragging);

      sliderContainer.addEventListener('touchstart', startOfDragging);
      sliderContainer.addEventListener('touchmove', dragging);
      sliderContainer.addEventListener('touchcancel', endOfDragging);
      sliderContainer.addEventListener('touchend', endOfDragging);
    }
    // set transitionDuration as 0ms when sliding transition ended
    // so we can drag without any transition
    sliderWrapper.addEventListener('transitionend', removeTransitionDuration);
    // change size of slide according to the size of viewport
    window.addEventListener('resize', () => {
      setSizeOfSlide();
      setSliderPosition(indexOfActiveSlide);
    });
    // listen click on each bulet
    sliderPagination.addEventListener('click', triggerBullets);
  }
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
