function getDomElements() {
  return {
    pageBody: document.querySelector('.page__body'),
    inputs: document.querySelectorAll('input'),
    placesCardTitles: document.querySelectorAll('.places-card__title'),
    wrapperTitles: document.querySelectorAll('.places-card__wrapper-title'),
    wrappers: document.querySelectorAll('.places-card__wrapper'),
    viewAllOffers: document.querySelector('.more-cards__button'),
    cardsContainer: document.querySelector('.cards'),
    smallFormButton: document.querySelector('.search__show-small-form'),
    smallScreenFormWrapper: document.querySelector('.search__small-form-wrapper'),
    smallFormCrossSign: document.querySelector('.search__small-form-cross-sign'),
    submit: document.querySelector('.submit'),
    placesCardButtons: document.querySelectorAll('.places-card-buttons'),
    buttons: document.querySelectorAll('.places-card-buttons__button'),
    placesCards: document.querySelectorAll('.places-card'),
    smallMenu: document.querySelector('.small-menu'),
    smallMenuLinks: document.querySelectorAll('.small-menu__link'),
    ham: document.querySelector('.ham'),
    formInputs: document.querySelectorAll('.form__input'),
    calendars: document.querySelectorAll('.search__calendar'),

  };
}

export default getDomElements();