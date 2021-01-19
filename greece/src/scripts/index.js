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
    


    ////////////////////Swiper////////////////////////////////// 


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
      
      let firebaseConfig = {
        apiKey: "AIzaSyA_BlS_0vucMidOD7OzEWND9kwPw7ojg_c",
        authDomain: "greece-d2a3d.firebaseapp.com",
        databaseURL: "https://greece-d2a3d-default-rtdb.firebaseio.com",
        projectId: "greece-d2a3d",
        storageBucket: "greece-d2a3d.appspot.com",
        messagingSenderId: "769401518786",
        appId: "1:769401518786:web:eec291fd613c097c59d95b",
        measurementId: "G-C8E617QPC4"
      };
      
     
      firebase.initializeApp(firebaseConfig);
      
      // Get a reference to the database service
      function databaseInit() {
       return firebase.database().ref('/').once('value')
      } 

      databaseInit().then((answer) => {

       let jsonCards = answer.val()
        
        
      let viewAllOffers = document.querySelector('.more-cards__button');
      let cardsContainer = document.querySelector('.cards');
      let cardStartIndex = 0;
      let a = 0;
      let cardCreate = (count) => {
        a += count;
        for (let i = cardStartIndex; i < a; i++) {
          if(!jsonCards.cardInfo[i+1]) {
            let card = document.createElement('div');
            card.className = "card"
            card.style.backgroundImage = jsonCards.cardInfo[i]['background-image'];
            card.innerHTML = `<div class="card__content">
            <h5 class="card__title">${jsonCards.cardInfo[i]['title']}</h5>
            <span class="card__price">${jsonCards.cardInfo[i]['price']}</span>
            <div class="card__star-rating">${jsonCards.cardInfo[i]['star-rating']}</div>
            <span class="card__vacation-days">${jsonCards.cardInfo[i]['vacation-days']}</span>
            <button class="card__button button">${jsonCards.cardInfo[i]['button-text']}</button></div>`
            cardsContainer.appendChild(card)
            viewAllOffers.remove()
          } else {
            let card = document.createElement('div');
            card.className = "card"
            card.style.backgroundImage = jsonCards.cardInfo[i]['background-image'];
            card.innerHTML = `<div class="card__content">
            <h5 class="card__title">${jsonCards.cardInfo[i]['title']}</h5>
            <span class="card__price">${jsonCards.cardInfo[i]['price']}</span>
            <div class="card__star-rating">${jsonCards.cardInfo[i]['star-rating']}</div>
            <span class="card__vacation-days">${jsonCards.cardInfo[i]['vacation-days']}</span>
            <button class="card__button button">${jsonCards.cardInfo[i]['button-text']}</button></div>`
            cardsContainer.appendChild(card)
          }
        }
        cardStartIndex += count;
      }
      
        let widthOfPage = document.body.clientWidth
        
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
      })


  

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
let calendars = document.querySelectorAll('.form__input_calendar')

calendars.forEach(el => {
 
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

