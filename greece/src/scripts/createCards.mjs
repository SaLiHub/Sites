import connectBD from './connectBD.mjs';
import domElements from './domElements.mjs';

let data;

function createCards() {
  connectBD()
    .then((content) => {
      data = content;
      createRowOfCards();
    });
  const { viewAllOffers } = domElements;
  viewAllOffers.addEventListener('click', addCards);
}

function createOneCard(content) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.style.backgroundImage = content['background-image'];
  card.innerHTML = `<div class="card__content">
          <h5 class="card__title">${content.title}</h5>
          <span class="card__price">${content.price}</span>
          <div class="card__star-rating">${content['star-rating']}</div>
          <span class="card__vacation-days">${content['vacation-days']}</span>
          <button class="card__button button">${content['button-text']}</button></div>`;
  return card;
}

function createRowOfCards() {
  const { viewAllOffers, cardsContainer } = domElements;
  for (let i = 0; i < 4; i++) {
    if (!data.cardInfo[i + 1]) {
      const card = createOneCard(data.cardInfo[i]);
      cardsContainer.appendChild(card);
      viewAllOffers.remove();
    } else {
      const card = createOneCard(data.cardInfo[i]);
      cardsContainer.appendChild(card);
    }
  }
}

function addCards() {
  const widthOfPage = document.body.clientWidth;
  if (widthOfPage >= 1700) {
    createRowOfCards(4);
  } else if (widthOfPage >= 1353 && widthOfPage <= 1700) {
    createRowOfCards(3);
  } else if (widthOfPage >= 651 && widthOfPage <= 1353) {
    createRowOfCards(2);
  } else if (widthOfPage <= 651) {
    createRowOfCards(1);
  }
}

export default createCards;