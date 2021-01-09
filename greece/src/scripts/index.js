
    let inputs = document.querySelectorAll('input')

    inputs.forEach(input => input.setAttribute("autocomplete","off"));

    // .wrapper__title innerHTML
    let placesCardTitles = document.querySelectorAll(".places-card__title"),
    wraperTitles = document.querySelectorAll(".places-card-wrapper__title"),
    i;
    for(i = 0; i < placesCardTitles.length; i++) {
      wraperTitles[i].innerHTML = placesCardTitles[i].innerHTML
    }
    






    // import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js'


      const swiper = new Swiper('.swiper-container', {
        cssMode: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination'
        },
        mousewheel: true,
        keyboard: true,
      });



      // cards

  

      let viewAllOffers = document.querySelector('.more-cards__button');
      let cards = document.querySelector('.cards');

      let cardAllInfo = {
        "cardInfo" : [
            {
                "title" : "El Grece",
                "price" : "225$",
                "button-text" : "View More",
                "background-image" : "url(images/card1.jpg)"
            },
            {
                "title" : "Zhytomyr",
                "price" : "230$",
                "button-text" : "View More",
                "background-image" : "url(images/card1.jpg)"
            },
            {
                "title" : "Ioannina",
                "price" : "235$",
                "button-text" : "View More",
                "background-image" : "url(images/card1.jpg)"
            },
            {
                "title" : "Peristeri",
                "price" : "240$",
                "button-text" : "View More",
                "background-image" : "url(images/card1.jpg)"
            },
            {
                "title" : "Galatsi",
                "price" : "245$",
                "button-text" : "View More",
                "background-image" : "url(images/card1.jpg)"
            },
            {
                "title" : "Palaio Faliro",
                "price" : "250$",
                "button-text" : "View More",
                "background-image" : "url(images/card1.jpg)"
            },
            {
                "title" : "Lamia",
                "price" : "255$",
                "button-text" : "View More",
                "background-image" : "url(images/card1.jpg)"
            },
            {
                "title" : "Katerini",
                "price" : "260$",
                "button-text" : "View More",
                "background-image" : "url(images/card1.jpg)"
            },
            {
                "title" : "Chania",
                "price" : "265$",
                "button-text" : "View More",
                "background-image" : "url(images/card1.jpg)"
            }
           
            
    
        ]
        
    }
    
    let cardIndex = 0;

    let cardCreate = () => {
      
      for (let i = cardIndex; i < cardIndex + 4; i++) {
        if(!cardAllInfo.cardInfo[i]) {
          viewAllOffers.remove()
        } else {
          let element = document.createElement('div');
          element.className = "card"
          element.style.backgroundImage = cardAllInfo.cardInfo[i]['background-image'];
          element.innerHTML = `<div class="card__content">
          <h5 class="card__title">${cardAllInfo.cardInfo[i]['title']}</h5>
          <span class="card__price">${cardAllInfo.cardInfo[i]['price']}</span></div>
          <button class="card__button button">${cardAllInfo.cardInfo[i]['button-text']}</button>`
          
          cards.appendChild(element)
        }
      }
      cardIndex += 4;
    }
 cardCreate(cardIndex, cardIndex + 2)

      viewAllOffers.addEventListener('click', cardCreate)


      // toggle menu

      let toggleMenuLinks = document.querySelectorAll('.link')
      let hamRotate = document.querySelector('.hamRotate');
      for (let i = 0; i < toggleMenuLinks.length; i++) {
        toggleMenuLinks[i].addEventListener('click', () => {
          hamRotate.classList.remove("active");
          
        })

        
        
      }

      // places cards

      let placesCardButons = document.querySelectorAll('.places-card-buttons');
      let placesCard = document.querySelectorAll('.places-card');
      function loopingPlacesCards() {
        for (let i = 0; i < placesCard.length; i++) {
          placesCardButons[i].style.fontSize = `${placesCard[i].offsetHeight / 50 + 6}px`
          placesCardTitles[i].style.fontSize = `${placesCard[i].offsetWidth / 10 - 5}px`
          wraperTitles[i].style.fontSize = `${placesCard[i].offsetWidth / 10 - 5}px`
         }
         console.log('luck')
      }
      loopingPlacesCards()

  
    
      window.addEventListener('resize', loopingPlacesCards);
      