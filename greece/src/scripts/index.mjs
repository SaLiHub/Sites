import createCards from './createCards.mjs';
import domElements from './domElements.mjs';
import './Slider.jsx';

(function innit() {
  createCards(domElements);
  setAutocompleteOffToInputs();
  setCardTitles();
  // setScrollToTop();
  addEventListeners();
  setFontSize();
  preserveFocusOnCard();
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

// Set font size according to size of user viewport
function setFontSize() {
  const {
    wrapperTitles, placesCardTitles, placesCardButtons, placesCards,
  } = domElements;
  placesCards.forEach((card, i) => {
    setTimeout(() => {
      placesCardButtons[i].style.fontSize = `${
        placesCards[i].offsetHeight / 50 + 10
      }px`;
      placesCardTitles[i].style.fontSize = `${
        placesCards[i].offsetWidth / 10 - 8
      }px`;
      wrapperTitles[i].style.fontSize = `${
        placesCards[i].offsetWidth / 10 - 12
      }px`;
    }, 0);
  });
}

function preserveFocusOnCard() {
  const {
    placesCards, placesCardTitles, wrapperTitles, placesCardButtons, wrappers,
  } = domElements;
  placesCards.forEach((button, i) => {
    button.addEventListener('focusin', () => {
      addStyles(i);
    });

    button.addEventListener('focusout', () => {
      clearStyles(i);
    });
  });

  function clearStyles(i) {
    placesCardTitles[i].style.removeProperty('opacity');
    wrapperTitles[i].style.removeProperty('top');
    wrapperTitles[i].style.removeProperty('letter-spacing');
    placesCardButtons[i].style.removeProperty('bottom');
    wrappers[i].style.removeProperty('opacity');
  }

  function addStyles(i) {
    placesCardTitles[i].style.opacity = '0';
    wrapperTitles[i].style.top = '45%';
    wrapperTitles[i].style.letterSpacing = 'normal';
    placesCardButtons[i].style.bottom = '50%';
    wrappers[i].style.opacity = '1';
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

  // To keep focus when tabbing.

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

function showSmallForm() {
  const { smallScreenFormWrapper, submit } = domElements;
  const config = {
    duration: 200,
  };
  slideDown(smallScreenFormWrapper, config);
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
  const config = {
    initialDisplay: 'flex',
  };
  ham.classList.toggle('active');
  if (ham.classList.contains('active')) {
    slideDown(smallMenu, config);
  } else {
    slideUp(smallMenu);
  }
}

function slideDown(target, { duration = 300, initialDisplay = 'block' }) {
  target.style.removeProperty('display');
  let { display } = window.getComputedStyle(target);
  if (display === 'none') {
    display = initialDisplay;
  }
  target.style.display = display;
  const height = target.offsetHeight;
  target.style.height = 0;
  // eslint-disable-next-line no-unused-expressions
  target.offsetHeight;
  target.style.transition = `height ${duration}ms ease`;
  target.style.height = `${height}px`;
  window.setTimeout(() => {
    target.style.removeProperty('height');
    target.style.removeProperty('transition');
    document.body.style.overflow = 'hidden';
  }, duration);
}

function slideUp(target, duration = 300) {
  target.style.height = 0;
  target.style.transition = `height ${duration}ms ease`;
  document.body.style.overflow = 'visible';
  window.setTimeout(() => {
    target.style.display = 'none';
    target.style.removeProperty('height');
    target.style.removeProperty('transition');
  }, duration);
}
