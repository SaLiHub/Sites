let pageBody = document.querySelector('.page__body')


window.onbeforeunload = function () {
  window.scrollTo(0, 0);
  
}

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



      /////////////////////////////////////////// cards ////////////////////////////////////////////////////////////////////

  

      

      let cardAllInfo = {
        "cardInfo" : [
            {
                "title" : "El Grece",
                "price" : "225$",
                "star-rating" : "★★★",
                "vacation-days": "9 days",
                "button-text" : "View More",
                "background-image" : "url(images/card1.jpg)"
            },
            {
                "title" : "Zhytomyr",
                "price" : "230$",
                "star-rating" : "★★★★★",
                "vacation-days": "4 days",
                "button-text" : "View More",
                "background-image" : "url(images/card1.jpg)"
            },
            {
                "title" : "Ioannina",
                "price" : "235$",
                "star-rating" : "★★★★",
                "vacation-days": "7 days",
                "button-text" : "View More",
                "background-image" : "url(images/card1.jpg)"
            },
            {
                "title" : "Peristeri",
                "price" : "240$",
                "star-rating" : "★",
                "vacation-days": "10 days",
                "button-text" : "View More",
                "background-image" : "url(images/card1.jpg)"
            },
            {
                "title" : "Galatsi",
                "price" : "245$",
                "star-rating" : "★★",
                "vacation-days": "5 days",
                "button-text" : "View More",
                "background-image" : "url(images/card1.jpg)"
            },
            {
                "title" : "Palaio Faliro",
                "price" : "250$",
                "star-rating" : "★★★★",
                "vacation-days": "10 days",
                "button-text" : "View More",
                "background-image" : "url(images/card1.jpg)"
            },
            {
                "title" : "Lamia",
                "price" : "255$",
                "star-rating" : "★★★",
                "vacation-days": "8 days",
                "button-text" : "View More",
                "background-image" : "url(images/card1.jpg)"
            },
            {
                "title" : "Katerini",
                "price" : "260$",
                "star-rating" : "★★★",
                "vacation-days": "7 days",
                "button-text" : "View More",
                "background-image" : "url(images/card1.jpg)"
            },
            {   
                "title" : "Chania",
                "price" : "265$",
                "star-rating" : "★★★★★",
                "vacation-days": "10 days",
                "button-text" : "View More",
                "background-image" : "url(images/card1.jpg)"
            }
           
            
    
        ]
        
    }
    let viewAllOffers = document.querySelector('.more-cards__button');
    let cardsContainer = document.querySelector('.cards');
    let cardStartIndex = 0;
    let a = 0;
    let cardCreate = (count) => {
      a += count;
      for (let i = cardStartIndex; i < a; i++) {
        if(!cardAllInfo.cardInfo[i+1]) {
          let card = document.createElement('div');
          card.className = "card"
          card.style.backgroundImage = cardAllInfo.cardInfo[i]['background-image'];
          card.innerHTML = `<div class="card__content">
          <h5 class="card__title">${cardAllInfo.cardInfo[i]['title']}</h5>
          <span class="card__price">${cardAllInfo.cardInfo[i]['price']}</span>
          <div class="card__star-rating">${cardAllInfo.cardInfo[i]['star-rating']}</div>
          <span class="card__vacation-days">${cardAllInfo.cardInfo[i]['vacation-days']}</span>
          <button class="card__button button">${cardAllInfo.cardInfo[i]['button-text']}</button></div>`
          cardsContainer.appendChild(card)
          viewAllOffers.remove()
        } else {
          let card = document.createElement('div');
          card.className = "card"
          card.style.backgroundImage = cardAllInfo.cardInfo[i]['background-image'];
          card.innerHTML = `<div class="card__content">
          <h5 class="card__title">${cardAllInfo.cardInfo[i]['title']}</h5>
          <span class="card__price">${cardAllInfo.cardInfo[i]['price']}</span>
          <div class="card__star-rating">${cardAllInfo.cardInfo[i]['star-rating']}</div>
          <span class="card__vacation-days">${cardAllInfo.cardInfo[i]['vacation-days']}</span>
          <button class="card__button button">${cardAllInfo.cardInfo[i]['button-text']}</button></div>`
          cardsContainer.appendChild(card)
        }
      }
      cardStartIndex += count;
    }
  
    
    let card = document.querySelector('.card');

    let widthOfPage = document.body.clientWidth
    console.log(widthOfPage)
    placingCards()
    function placingCards() {
      if(widthOfPage >= 1700) {
        cardCreate(4)
      } else if(widthOfPage >= 1353 && widthOfPage <= 1700) {
        cardCreate(3)
      } else if(widthOfPage >= 651 && widthOfPage <= 1353) {
        cardCreate(2)
      } else if(widthOfPage <= 651){
        cardCreate(1)
      }
    }

    viewAllOffers.addEventListener('click', placingCards)
   

    

      


      // toggle menu (hamburger)
      let ham = document.querySelector('.ham')
      ham.addEventListener('click', ()=> {
        ham.classList.toggle('active')
        if(ham.classList.contains('active')) {
          pageBody.style.overflow = 'hidden'
        } else {
          pageBody.style.overflow = 'visible'
        }
      })

      let toggleMenuLinks = document.querySelectorAll('.link')
      let hamRotate = document.querySelector('.hamRotate');
      for (let i = 0; i < toggleMenuLinks.length; i++) {
        toggleMenuLinks[i].addEventListener('click', () => {
          hamRotate.classList.remove("active");
          pageBody.style.overflow = 'visible'
        })

        
        
      }

      // places cards

      let placesCardButons = document.querySelectorAll('.places-card-buttons');
      let placesCard = document.querySelectorAll('.places-card');
      function loopingPlacesCards() {
        for (let i = 0; i < placesCard.length; i++) {
          placesCardButons[i].style.fontSize = `${placesCard[i].offsetHeight / 50 + 10}px`
          placesCardTitles[i].style.fontSize = `${placesCard[i].offsetWidth / 10 - 8}px`
          wraperTitles[i].style.fontSize = `${placesCard[i].offsetWidth / 10 - 12}px`
         }
         
      }
      loopingPlacesCards()

      window.addEventListener('resize', loopingPlacesCards);
      

// search toggle-form  \\\\\\\\\\\\\\\\\\\\\\\\\\


let buttonToToggleForm = document.querySelector('.button-to-toggle-form')
let searchToggleForm = document.querySelector('.search__toggle-form')
let toggleFormCrossSign = document.querySelector('.toggle-form__cross-sign')
let submit = document.querySelector('.submit')
buttonToToggleForm.addEventListener('click', () => {
  searchToggleForm.classList.add('active')
  submit.classList.add('submit_animation_up')
  pageBody.style.overflow = "hidden"
  
})

toggleFormCrossSign.addEventListener('click', () => {
  searchToggleForm.classList.remove('active')
  submit.classList.remove('submit_animation_up')
  pageBody.style.overflow = "visible"
})



// calendar (type=date) toggable
let calendars = document.querySelectorAll('input[type=date]')

calendars.forEach(el => {
  el.attributes.type.value = 'text' 
  el.addEventListener('focus', () => {
    el.attributes.type.value = 'date'
  })
  el.addEventListener('blur', () => {
    el.attributes.type.value = 'text'
  })
});

// //////////////////////////////////////


// form input 

let formInput = document.querySelectorAll(".form__input")
let formField = document.querySelectorAll(".form__field")

formInput.forEach((el,i) => {
  el.addEventListener("focus", ()=> {
    formField[i].classList.add('form__field_stretch')
  })
  el.addEventListener("blur", ()=> {
    formField[i].classList.remove('form__field_stretch')
  })
})



// //////////////////////////////////////

