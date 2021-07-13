export default function createHorizontalSlider() {
  const sliderContainer = document.querySelector('#sliderContainer'),
    sliderWrapper = document.querySelector('#sliderWrapper'),
    slides = document.querySelectorAll('.slider-slide'),
    sliderPagination = document.querySelector('#sliderPagination'),
    counter = document.querySelector('#countNumber');

  let holding = false,
    slidePosition = 0,
    indexOfActiveSlide = 0,
    startX,
    x,
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
    const numberOfSlide = indexOfActiveSlide + 1;
    if (numberOfSlide >= 10) {
      counter.innerText = `${numberOfSlide}`;
    } else {
      counter.innerText = `0${numberOfSlide}`;
    }
  }

  function setSizeOfSlide() {
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
      const numberBulletIndex = Number(e.target.dataset.bulletIndex);
      bulletClickTriger(numberBulletIndex);
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
    slidePosition = slideWidth * indexOfSlide;
    sliderWrapper.style.transform = `translate3d(${-slidePosition}px, 0, 0)`;
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
    // do not triger dragging with right click and pagination click
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
      if (slidePosition === slideWidth * indexOfActiveSlide) {
        numberOfInterceptions = 0;
        nextActiveSlide = false;
        prevActiveSlide = false;
      }
    }

    startX = e.pageX;

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

    removeTransitionDuration();
    e.preventDefault();
  }

  function dragging(e) {
    // if user move mouse without holding slider won't get triggered
    if (!holding) return;
    e.preventDefault();

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

    moved = true;
  }

  function endOfDragging(e) {
    if (!holding) return;
    holding = false;
    e.stopImmediatePropagation();
    if (!moved && !intercepted) {
      //   bannerBtn.setAttribute('href', 'learn-more.html');
      return;
    }
    // bannerBtn.removeAttribute('href');
    moved = false;

    endOfHolding = new Date().getTime();
    const timeDiff = endOfHolding - startOfHolding;

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
