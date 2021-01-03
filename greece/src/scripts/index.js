
    let inputs = document.querySelectorAll('input')

    inputs.forEach(input => input.setAttribute("autocomplete","off"));

    // .wrapper__title innerHTML
    let placesCardsTitles = document.querySelectorAll(".places-card__title"),
    wraperTitles = document.querySelectorAll(".wrapper__title"),
    i;
    for(i = 0; i < placesCardsTitles.length; i++) {
      wraperTitles[i].innerHTML = placesCardsTitles[i].innerHTML
    }


  // autocomplite script

    let el = document.getElementById('city');
    el.addEventListener('click', function() {
      
    })




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


      // view-All-Offers

      // let viewAllOffers = document.querySelector(".more-cards")
      // let viewAllOffersButton = document.querySelector(".more-cards__button")

      // viewAllOffersButton.addEventListener('click', function() {

      // })