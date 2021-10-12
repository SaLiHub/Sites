import createCards from './createCards.mjs';
import domElements from './domElements.mjs';

(function innit() {
  createCards(domElements);
  setAutocompleteOffToInputs();
  setCardTitles();
  // setScrollToTop();
  addEventListeners();
  setFontSize();
})();

// Uncomment line (8, 15-19), if you want viewport be at top of the page after reloading.

// function setScrollToTop() {
//   window.onbeforeunload = function scrollToTop() {
//     window.scrollTo(0, 0);
//   };
// }

function setAutocompleteOffToInputs() {
  const { inputs } = domElements;
  inputs.forEach((input) => input.setAttribute('autocomplete', 'off'));
}

function setCardTitles() {
  const { wrapperTitles, placesCardTitles } = domElements;
  for (let i = 0; i < placesCardTitles.length; i++) {
    wrapperTitles[i].innerHTML = placesCardTitles[i].innerHTML;
  }
}

// Enable Swiper-slider.
// eslint-disable-next-line no-unused-vars
const swiper = new Swiper('.swiper-container', {
  cssMode: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
  },
  mousewheel: true,
  keyboard: true,
});

// Set font size according to size of user viewport
function setFontSize() {
  const {
    wrapperTitles, placesCardTitles, placesCardButtons, placesCard,
  } = domElements;
  for (let i = 0; i < placesCard.length; i++) {
    placesCardButtons[i].style.fontSize = `${
      placesCard[i].offsetHeight / 50 + 10
    }px`;
    placesCardTitles[i].style.fontSize = `${
      placesCard[i].offsetWidth / 10 - 8
    }px`;
    wrapperTitles[i].style.fontSize = `${
      placesCard[i].offsetWidth / 10 - 12
    }px`;
  }
}

function addEventListeners() {
  const {
    smallFormButton,
    smallFormCrossSign,
    smallMenuLinks,
    ham,
    formField,
    formInputs,
    calendars,
  } = domElements;

  smallFormButton.addEventListener('click', showSmallForm);

  smallFormCrossSign.addEventListener('click', hideSmallForm);

  smallMenuLinks.forEach((link) => {
    link.addEventListener('click', handleSmallMenu);
  });

  ham.addEventListener('click', handleSmallMenu);

  formInputs.forEach((input, i) => {
    input.addEventListener('focus', () => {
      formField[i].classList.add('form__field_stretch');
    });
    input.addEventListener('blur', () => {
      formField[i].classList.remove('form__field_stretch');
    });
  });

  calendars.forEach((calendar) => handleCalendars(calendar));

  window.addEventListener('resize', setFontSize);
}

function handleCalendars(calendar) {
  calendar.addEventListener('focus', () => {
    calendar.attributes.type.value = 'date';
  });
  calendar.addEventListener('blur', () => {
    calendar.attributes.type.value = 'text';
  });
}

// function hideSmallMenu() {
//   const { ham } = domElements;
//   ham.classList.remove('active');
//   document.body.style.overflow = 'visible';
// }

// function showSmallMenu() {
//   const { ham } = domElements;
//   ham.classList.add('active');
//   document.body.style.overflow = 'visible';
// }

function showSmallForm() {
  const { smallScreenFormWrapper, submit } = domElements;
  slideDown(smallScreenFormWrapper);
  smallScreenFormWrapper.classList.add('active');
  submit.classList.add('submit_animation_up');
}

function hideSmallForm() {
  const { smallScreenFormWrapper, submit } = domElements;
  slideUp(smallScreenFormWrapper);
  smallScreenFormWrapper.classList.remove('active');
  submit.classList.remove('submit_animation_up');
}

function handleSmallMenu() {
  const { ham, smallMenu } = domElements;
  ham.classList.toggle('active');
  if (ham.classList.contains('active')) {
    slideDown(smallMenu);
  } else {
    slideUp(smallMenu);
    document.body.style.overflow = 'visible';
  }
}

function slideDown(target, duration = 300) {
  target.style.removeProperty('display');
  let { display } = window.getComputedStyle(target);
  if (display === 'none') {
    display = 'flex';
  }
  target.style.display = display;
  const height = target.offsetHeight;
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.style.overflow = 'hidden';
  // eslint-disable-next-line no-unused-expressions
  target.offsetHeight;
  target.style.boxSizing = 'border-box';
  target.style.transitionProperty = 'height, margin, padding';
  target.style.transitionDuration = `${duration}ms`;
  target.style.height = `${height}px`;
  target.style.removeProperty('padding-top');
  target.style.removeProperty('padding-bottom');
  target.style.removeProperty('margin-top');
  target.style.removeProperty('margin-bottom');
  window.setTimeout(() => {
    target.style.removeProperty('height');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
    document.body.style.overflow = 'hidden';
  }, duration);
}

function slideUp(target, duration = 300) {
  target.style.transitionProperty = 'height, margin, padding';
  target.style.transitionDuration = `${duration}ms`;
  target.style.boxSizing = 'border-box';
  target.style.height = `${target.offsetHeight}px`;
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.style.overflow = 'hidden';
  window.setTimeout(() => {
    target.style.display = 'none';
    target.style.removeProperty('height');
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
  }, duration);
}
