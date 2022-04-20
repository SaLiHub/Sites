import connectDB from './connectDB.mjs';
import domElements from './domElements.mjs';

function createCards() {
  // Connect to database and get data
  connectDB()
    .then((data) => {
      // Assign newly created function, for creating cards using closure,
      // to createRowOfCards variable
      const createRowOfCards = renderedCards(data);
      // Render cards
      addCards(createRowOfCards);
      // Add click event for further adding cards using viewAllOffers button
      const { viewAllOffers } = domElements;
      viewAllOffers.addEventListener('click', () => addCards(createRowOfCards));
    });
}

// Add cards according to user viewport
function addCards(createRowOfCards) {
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

function createOneCard(content) {
  const card = document.createElement('div');
  card.classList.add('card');
  // Uncomment code below if you have background-image in db
  // card.style.backgroundImage = content['background-image']
  card.innerHTML = `<div class="card__content">
          <h5 class="card__title">${content.title}</h5>
          <span class="card__price">${content.price}</span>
          <div class="card__star-rating">${content['star-rating']}</div>
          <span class="card__vacation-days">${content['vacation-days']}</span>
          <button class="card__button button">${content['button-text']}</button></div>`;
  return card;
}

function renderedCards(data) {
  // Save quantity of added cards
  let addedCards = 0;
  const { viewAllOffers, cardsContainer } = domElements;
  return function createRowOfCards(quantity) {
    const cardsToCreate = addedCards + quantity;
    for (let i = addedCards; i < cardsToCreate; i++) {
      if (!data.cardInfo[i + 1]) {
        const card = createOneCard(data.cardInfo[i]);
        cardsContainer.appendChild(card);
        viewAllOffers.remove();
        break;
      } else {
        const card = createOneCard(data.cardInfo[i]);
        cardsContainer.appendChild(card);
      }
    }
    console.log(addedCards);

    // Refresh quantity of added cards
    addedCards += quantity;
    console.log(addedCards);
  };
}

export default createCards;