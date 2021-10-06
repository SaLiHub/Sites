export default function createVerticalSlider() {
  const sliderContainer = document.querySelector('#sliderContainer');
  const sliderWrapper = document.querySelector('#sliderWrapper');
  const slides = document.querySelectorAll('.slider-slide');
  const sliderPagination = document.querySelector('#sliderPagination');
  const counter = document.querySelector('#countNumber');

  let wasPressed = false;
  let slidePosition = 0;
  let indexOfActiveSlide = 0;
  let startPointOfDragging;
  let slideHeight;
  let bullets;
  let timeOfStartDragging;
  let draggingStopped;

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
    slideHeight = sliderContainer.offsetHeight;
  }

  function initBullets() {
    for (let i = 0; i < slides.length; i++) {
      console.log('2');
      createBullet(i);
    }

    bullets = document.querySelectorAll('.slider-pagination-bullet');
  }

  function triggerBullets(e) {
    if (e.target.classList.contains('slider-pagination-bullet')) {
      const numberBulletIndex = Number(e.target.dataset.bulletIndex);
      bulletClickTrigger(numberBulletIndex);
    }
  }
  function createBullet(index) {
    const el = document.createElement('span');
    el.classList.add('slider-pagination-bullet');
    el.dataset.bulletIndex = index;
    sliderPagination.appendChild(el);
  }

  function changeSliderPosition(indexOfNewActiveSlide) {
    setSliderPosition(indexOfNewActiveSlide);
    // Add transition duration during changing slides.
    startSliding();
  }

  function startSliding() {
    sliderWrapper.style.transitionDuration = '300ms';
    addSlidingStatus();
  }

  function endSliding() {
    sliderWrapper.style.transitionDuration = '0ms';
    removeSlidingStatus();
  }

  function bulletClickTrigger(indexOfNewActiveSlide) {
    changeSliderPosition(indexOfNewActiveSlide);
    setNewActiveSlideAndBullet(indexOfNewActiveSlide);
    setCurrentSlideNumber();
  }

  function setSliderPosition(
    indexOfSlide,
    draggedDistance = 0,
    slowingCoeff = 1,
  ) {
    slidePosition = slideHeight * indexOfSlide + draggedDistance / slowingCoeff;
    sliderWrapper.style.transform = `translate3d(0, ${-slidePosition}px, 0)`;
  }

  function removePrevActiveSlideAndBullet(i) {
    slides[i].classList.remove('active-slide');
    bullets[i].classList.remove('active-bullet');
  }

  function addActiveSlideAndBullet(i) {
    slides[i].classList.add('active-slide');
    bullets[i].classList.add('active-bullet');
  }

  function setNewActiveSlideAndBullet(
    newIndex,
    prevIndex = indexOfActiveSlide,
  ) {
    removePrevActiveSlideAndBullet(prevIndex);
    addActiveSlideAndBullet(newIndex);
    setNewIndexOfActiveSlide(newIndex);
  }

  function setNewIndexOfActiveSlide(newIndex) {
    indexOfActiveSlide = newIndex;
  }

  function isSliding() {
    return sliderWrapper.classList.contains('sliding');
  }

  function startOfDragging(e) {
    // If click was on pagination bar or right click was used
    // then slider-dragging is not getting triggered.
    const elementsClickedId = [e.target.id, e.target.parentElement.id];
    if (
      elementsClickedId.includes('sliderPagination')
      || e.buttons === 2
      || isSliding()
    ) return;

    wasPressed = true;
    startPointOfDragging = e.pageY;
    timeOfStartDragging = new Date().getTime();
    endSliding();
    e.preventDefault();
  }

  function dragging(e) {
    // If user move mouse without wasPressed slider won't get triggered.
    if (!wasPressed) return;

    const currentPointOfDragging = e.pageY;
    const draggedDistance = startPointOfDragging - currentPointOfDragging;
    const slowingCoeff = 2;
    if (draggedDistance < 0) {
      draggingUp(draggedDistance, slowingCoeff);
    } else if (draggedDistance > 0) {
      draggingDown(draggedDistance, slowingCoeff);
    }
  }

  function draggingUp(draggedDistance, slowingCoeff) {
    if (isFirstSlide()) {
      setSliderPosition(indexOfActiveSlide, draggedDistance, slowingCoeff);
    } else {
      setSliderPosition(indexOfActiveSlide, draggedDistance);
    }
  }
  function draggingDown(draggedDistance, slowingCoeff) {
    if (isLastSlide()) {
      setSliderPosition(indexOfActiveSlide, draggedDistance, slowingCoeff);
    } else {
      setSliderPosition(indexOfActiveSlide, draggedDistance);
    }
  }

  function endOfDragging(e) {
    if (!wasPressed) return;
    wasPressed = false;

    const endPointOfDragging = e.pageY;
    const draggedDistance = startPointOfDragging - endPointOfDragging;

    draggingStopped = new Date().getTime();

    chooseNextSlide(draggedDistance, timeOfDragging());
  }

  function timeOfDragging() {
    return draggingStopped - timeOfStartDragging;
  }

  function chooseNextSlide(draggedDistance, dragTime) {
    if (draggedDistance === 0) {
      // Nothing happens.
    } else if (timeLimitBreached(dragTime)) {
      goToCurrentSlide();
      startSliding();
    } else if (directionOfDragging(draggedDistance) === 'down') {
      isFirstSlide() ? goToCurrentSlide() : goToPrevSlide();
      startSliding();
    } else if (directionOfDragging(draggedDistance) === 'up') {
      isLastSlide() ? goToCurrentSlide() : goToNextSlide();
      startSliding();
    }
  }

  function directionOfDragging(draggedDistance) {
    return draggedDistance > 0 ? 'up' : 'down';
  }

  function timeLimitBreached(dragTime) {
    return dragTime > 250;
  }

  function addSlidingStatus() {
    sliderWrapper.classList.add('sliding');
  }

  function removeSlidingStatus() {
    sliderWrapper.classList.remove('sliding');
  }

  function isFirstSlide() {
    return indexOfActiveSlide === 0;
  }

  function isLastSlide() {
    return indexOfActiveSlide === slides.length - 1;
  }

  function goToCurrentSlide() {
    setSliderPosition(indexOfActiveSlide);
  }

  function goToPrevSlide() {
    const newActiveSlide = indexOfActiveSlide - 1;
    const prevActiveSlide = indexOfActiveSlide;
    setSliderPosition(newActiveSlide);
    setNewActiveSlideAndBullet(newActiveSlide, prevActiveSlide);

    setCurrentSlideNumber();
  }

  function goToNextSlide() {
    const newActiveSlide = indexOfActiveSlide + 1;
    const prevActiveSlide = indexOfActiveSlide;
    setSliderPosition(newActiveSlide);
    setNewActiveSlideAndBullet(newActiveSlide, prevActiveSlide);

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
    // Set transitionDuration as 0ms when sliding transition ended
    // so we can drag without any transition.
    sliderWrapper.addEventListener('transitionend', endSliding);
    // Change size of slide according to the size of viewport.
    window.addEventListener('resize', () => {
      setSizeOfSlide();
      setSliderPosition(indexOfActiveSlide);
    });
    // Listen click on each bullet.
    sliderPagination.addEventListener('click', triggerBullets);
  }
}
