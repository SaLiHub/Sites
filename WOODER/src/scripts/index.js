// header
let hamburger = document.querySelector('.header__hamburger'),
    hamburgerMenuText = document.querySelector('.header__hamburger-text'),
    hamburgerMenu = document.querySelector('.header__hamburger-menu'),
    headerCloseSign = document.querySelector('.header__toggle-menu-cross-sign'),
    pageBody = document.querySelector('.page__body'),
    headerToggleMenuLink = document.querySelectorAll('.header__toggle-menu-link')

// hamburger\\\\\\\\\\\\\\\\\\\\\\\\\
hamburger.addEventListener('click', ()=> {
    pageBody.style.overflow = "hidden"
    pageBody.classList.add('opacity_off')
    hamburgerMenu.style.cursor = "auto"
    setTimeout(() => {
        hamburgerMenu.classList.add('active') 
        
        pageBody.classList.remove('opacity_off')
        }, 500);
        
})

// hamburger menu\\\\\\\\\\\\\\\\\\\\\\\\\\
hamburgerMenuText.addEventListener('click', ()=> {
    pageBody.style.overflow = "hidden"
    pageBody.classList.add('opacity_off')
    hamburgerMenu.style.cursor = "auto"
    setTimeout(() => {
        hamburgerMenu.classList.add('active') 
        
        pageBody.classList.remove('opacity_off')
        }, 500);
})
// closeMenu function 

function closeMenu() {
    pageBody.style.overflow = "visible"
    pageBody.classList.add('opacity_off')
    setTimeout(() => {
        hamburgerMenu.classList.remove('active')
        pageBody.classList.remove('opacity_off')
        }, 500);
    hamburgerMenu.style.cursor = "pointer"
}

// header cross sign\\\\\\\\\\\\\\\\\\\\\\\
headerCloseSign.addEventListener('click', () => {
    closeMenu()
})

// header toggle menu links
headerToggleMenuLink.forEach((el) => {
    el.addEventListener('click', () => {
        closeMenu()
    })
})

// swiper slide

const firebaseConfig = {
    apiKey: "AIzaSyA4apyHWSRjMvYyvrzegqNv5weVktk-XMs",
    authDomain: "wooder-1fb11.firebaseapp.com",
    projectId: "wooder-1fb11",
    storageBucket: "wooder-1fb11.appspot.com",
    messagingSenderId: "852775924188",
    appId: "1:852775924188:web:5107a8944b53cc1a705f19"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
  function databaseInit() {
    return firebase.database().ref('/').once('value')
   } 

databaseInit().then((answer) => {

    let jsonBanner = answer.val()
    console.log(jsonBanner)

    let swiperWrapper = document.querySelector('.swiper-wrapper')
    for (let i = 0; i < jsonBanner['sliderContent'].length; i++) {
        let swiperSlide = document.createElement('div')
        swiperSlide.classList.add('swiper-slide')
        let bannerContent = document.createElement('div')
        bannerContent.classList.add('banner__content')
        bannerContent.innerHTML = `
        <div class="banner__title-container">
            <h1 class="banner__title">${jsonBanner['sliderContent'][i]['title']}</h1>
        </div>
        <div class="banner__text-container">
            <p class="banner__text">${jsonBanner['sliderContent'][i]['text']}</p>
        </div>
        `
        swiperSlide.appendChild(bannerContent)
        swiperWrapper.appendChild(swiperSlide)
    }
    let sliderDirection = 'vertical';
if(window.innerWidth <= 1000) {
 sliderDirection = 'horizontal'

}

let swiper = new Swiper('.swiper-container', {
    direction: `${sliderDirection}`,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

    
})






// let swiperPaginationBullets = document.querySelectorAll('swiper-pagination-bullet')
// bannerFirstBackgroundText.innerHTML = '01'



// console.log('luck1')
// swiperPaginationBullets.forEach((el,i)=> {
//     el.addEventListener('click', () => {
//         bannerFirstBackgroundText.innerHTML = `0${i+1}`
//         console.log('luck')
//     })
// })


