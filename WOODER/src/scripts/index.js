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

  let pressed = false,
    slidePosition = 0,
    numberOfSlide = 0,
    startY,
    y,
    startX,
    x,
    slideHeight = sliderContainer.offsetHeight,
    slideWidth = sliderContainer.offsetWidth,
    startOfHolding,
    endOfHolding,
    moving = false,
    interception = false,
    nextSlideExecution,
    prevSlideExecution,
    transition,
    nextSlideExecuted = false,
    prevSlideExecuted = false,
    prevActiveSlide,
    nextActiveSlide;

  // add transparent highlight

  sliderContainer.classList.add('highlight-transparent');

  // create counter

  (() => {
    if (numberOfSlide + 1 >= 10) {
      counter.innerHTML = `${numberOfSlide + 1}`;
    } else {
      counter.innerHTML = `0${numberOfSlide + 1}`;
    }
  })();

  // create pagination

  for (let i = 0; i < slides.length; i++) {
    let el = document.createElement('span');
    el.classList.add('slider-pagination-bullet');
    sliderPagination.appendChild(el);
  }
  // creating pagination bullets
  const bullets = document.querySelectorAll('.slider-pagination-bullet');
  bullets[numberOfSlide].classList.add('active-bullet');

  // adding eventListeners for pagination bullets

  for (let i = 0; i < bullets.length; i++) {
    bullets[i].addEventListener('click', () => {
      if (sliderDirection === 'horizontal') {
        slidePosition = slideWidth * i;
        sliderWrapper.style.transform = `translate3d(${-slidePosition}px, 0, 0)`;
      } else if (sliderDirection === 'vertical') {
        slidePosition = slideHeight * i;
        sliderWrapper.style.transform = `translate3d(0, ${-slidePosition}px, 0)`;
      }
      sliderWrapper.style.transitionDuration = '300ms';
      document.querySelector('.active-slide').classList.remove('active-slide');
      document.querySelector('.active-bullet').classList.remove('active-bullet');
      slides[i].classList.add('active-slide');
      bullets[i].classList.add('active-bullet');
      numberOfSlide = i;
      if (numberOfSlide + 1 >= 10) {
        counter.innerHTML = `${numberOfSlide + 1}`;
      } else {
        counter.innerHTML = `0${numberOfSlide + 1}`;
      }
    });
  }

  // setting active slide
  (() => {
    slides[numberOfSlide].classList.add('active-slide');

    if (sliderDirection === 'horizontal') {
      slidePosition = slideWidth * numberOfSlide;
      sliderWrapper.style.transform = `translate3d(${-slidePosition}px, 0, 0)`;
    } else if (sliderDirection === 'vertical') {
      slidePosition = slideHeight * numberOfSlide;
      sliderWrapper.style.transform = `translate3d(0, ${-slidePosition}px, 0)`;
    }
  })();

  let numberOFInterceptions = 0;
  const start = (e) => {
    // if click was on pagination bar or right click was used
    // then slider-dragging is not getting triggered
    const elementsClickedId = [e.target.id, e.target.parentElement.id];

    if (elementsClickedId.includes('sliderPagination') || e.buttons === 2) return;

    startOfHolding = new Date().getTime();
    interception = false;
    pressed = true;

    if (sliderWrapper.style.transitionDuration === '300ms') {
      numberOFInterceptions += 1;
      if (
        numberOFInterceptions >= 2 &&
        !slides[0].classList.contains('active-slide') &&
        !slides[slides.length - 1].classList.contains('active-slide')
      )
        return;

      transition = true;
    } else {
      transition = false;
      if (slidePosition === slideWidth * numberOfSlide || slidePosition === slideHeight * numberOfSlide) {
        numberOFInterceptions = 0;
        nextActiveSlide = false;
        prevActiveSlide = false;
      }
    }

    if (sliderDirection === 'horizontal') {
      startX = e.pageX;
      const timeStop = startOfHolding - endOfHolding;
      if (transition) {
        interception = true;
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
      startY = e.pageY;
      const timeStop = startOfHolding - endOfHolding;
      if (transition) {
        interception = true;
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

    sliderWrapper.style.transitionDuration = '0ms';
    e.preventDefault();
  };

  const move = (e) => {
    if (!pressed) return;
    e.preventDefault();
    moving = true;
    if (sliderDirection === 'horizontal') {
      const dist = e.pageX - startX;
      if (dist === 0) return;

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

      if (dist === 0) return;

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
  };

  const end = (e) => {
    if (!pressed) return;
    pressed = false;
    e.stopImmediatePropagation();
    if (!moving && !interception) {
      bannerBtn.setAttribute('href', 'learn-more.html');
      return;
    }
    bannerBtn.removeAttribute('href');
    moving = false;
    transition = true;

    endOfHolding = new Date().getTime();
    const timeDiff = endOfHolding - startOfHolding;

    if (sliderDirection === 'horizontal') {
      if (Math.abs(x) < slideWidth / 2 && timeDiff > 200 && !interception) {
        if (
          (slides[0].classList.contains('active-slide') && x > 0) ||
          (slides[slides.length - 1].classList.contains('active-slide') && x < 0)
        ) {
          numberOFInterceptions = 0;
          currentSlide();
          pressed = false;
          return;
        }
        numberOFInterceptions = 2;
        currentSlide();
        pressed = false;
        return;
      }
      if (interception && prevSlideExecuted && x > 0) {
        prevActiveSlide = false;
        currentSlide();
        return;
      } else if (interception && nextSlideExecuted && x < 0) {
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
      if (Math.abs(y) < slideHeight / 2 && timeDiff > 200 && !interception) {
        if (
          (slides[0].classList.contains('active-slide') && y > 0) ||
          (slides[slides.length - 1].classList.contains('active-slide') && y < 0)
        ) {
          numberOFInterceptions = 0;
          currentSlide();
          pressed = false;
          return;
        }
        numberOFInterceptions = 2;
        currentSlide();
        pressed = false;
        return;
      }
      if (interception && prevSlideExecuted && y > 0) {
        prevActiveSlide = false;
        currentSlide();
        return;
      } else if (interception && nextSlideExecuted && y < 0) {
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
  };

  window.addEventListener('resize', () => {
    if (sliderDirection === 'horizontal') {
      slideWidth = slides[0].offsetWidth;
      slidePosition = slideWidth * numberOfSlide;
      sliderWrapper.style.transform = `translate3d(${-slidePosition}px, 0, 0)`;
    } else {
      slideHeight = slides[0].offsetHeight;
      slidePosition = slideHeight * numberOfSlide;
      sliderWrapper.style.transform = `translate3d(0, ${-slidePosition}px, 0)`;
    }
  });

  const currentSlide = () => {
    if (sliderDirection === 'horizontal') {
      slidePosition = slideWidth * numberOfSlide;
      sliderWrapper.style.transform = `translate3d(${-slidePosition}px, 0, 0)`;
      sliderWrapper.style.transitionDuration = '300ms';
    } else {
      slidePosition = slideHeight * numberOfSlide;
      sliderWrapper.style.transitionDuration = '300ms';
      sliderWrapper.style.transform = `translate3d(0, ${-slidePosition}px, 0)`;
    }
  };

  const prevSlide = () => {
    numberOfSlide--;
    if (sliderDirection === 'horizontal') {
      slidePosition = slideWidth * numberOfSlide;
      sliderWrapper.style.transform = `translate3d(${-slidePosition}px, 0, 0)`;
    } else if (sliderDirection === 'vertical') {
      slidePosition = slideHeight * numberOfSlide;
      sliderWrapper.style.transform = `translate3d(0, ${-slidePosition}px, 0)`;
    }
    slides[numberOfSlide + 1].classList.remove('active-slide');
    slides[numberOfSlide].classList.add('active-slide');
    bullets[numberOfSlide + 1].classList.remove('active-bullet');
    bullets[numberOfSlide].classList.add('active-bullet');
    sliderWrapper.style.transitionDuration = '300ms';
    endOfHolding = new Date().getTime();
    prevSlideExecution = true;
    prevSlideExecuted = true;
    nextSlideExecution = false;
    nextSlideExecuted = false;
    // counter
    if (numberOfSlide + 1 >= 10) {
      counter.innerHTML = `${numberOfSlide + 1}`;
    } else {
      counter.innerHTML = `0${numberOfSlide + 1}`;
    }
  };

  const nextSlide = () => {
    numberOfSlide++;
    if (sliderDirection === 'horizontal') {
      slidePosition = slideWidth * numberOfSlide;
      sliderWrapper.style.transform = `translate3d(${-slidePosition}px, 0, 0)`;
    } else if (sliderDirection === 'vertical') {
      slidePosition = slideHeight * numberOfSlide;
      sliderWrapper.style.transform = `translate3d(0, ${-slidePosition}px, 0)`;
    }
    slides[numberOfSlide - 1].classList.remove('active-slide');
    slides[numberOfSlide].classList.add('active-slide');
    bullets[numberOfSlide - 1].classList.remove('active-bullet');
    bullets[numberOfSlide].classList.add('active-bullet');
    sliderWrapper.style.transitionDuration = '300ms';
    endOfHolding = new Date().getTime();
    prevSlideExecution = false;
    prevSlideExecuted = false;
    nextSlideExecution = true;
    nextSlideExecuted = true;

    // counter
    if (numberOfSlide + 1 >= 10) {
      counter.innerHTML = `${numberOfSlide + 1}`;
    } else {
      counter.innerHTML = `0${numberOfSlide + 1}`;
    }
  };

  sliderWrapper.addEventListener('transitionend', () => {
    sliderWrapper.style.transitionDuration = '0ms';
  });

  if (window.PointerEvent) {
    sliderContainer.addEventListener('pointerdown', start);
    sliderContainer.addEventListener('pointermove', move);
    sliderContainer.addEventListener('pointerup', end);
    sliderContainer.addEventListener('pointercancel', end);

    //

    sliderContainer.addEventListener('mouseleave', end);
  } else {
    sliderContainer.addEventListener('mousedown', start);
    sliderContainer.addEventListener('mousemove', move);
    sliderContainer.addEventListener('mouseup', end);
    sliderContainer.addEventListener('mouseleave', end);

    sliderContainer.addEventListener('touchstart', start);
    sliderContainer.addEventListener('touchmove', move);
    sliderContainer.addEventListener('touchcancel', end);
    sliderContainer.addEventListener('touchend', end);
  }

  // arrows

  // prevSlideButton.addEventListener('click', () => {
  //     if(!slides[0].classList.contains('active-slide')) {
  //         prevSlide()
  //     }
  // })
  // nextSlideButton.addEventListener('click', () => {
  //     if(!slides[slides.length-1].classList.contains('active-slide')) {
  //         nextSlide()
  //     }
  // })
}

// //////////////////
function triggerVideo(e) {
  // show wrapper when button or img was clicked
  if (e.target.classList.contains('video__button') || e.target.classList.contains('about-wooder__photo')) {
    e.target.parentElement.querySelector('.video__wrapper').style.display = 'flex';
  }
  // hide wrapper if click was on it
  if (e.target.classList.contains('video__wrapper')) {
    e.target.style.display = 'none';
  }
}

pageBody.addEventListener('click', triggerVideo);
