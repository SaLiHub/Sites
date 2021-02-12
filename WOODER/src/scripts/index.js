// header
let hamburger = document.querySelector('.header__hamburger'),
    hamburgerMenuText = document.querySelector('.header__hamburger-text'),
    hamburgerMenu = document.querySelector('.header__hamburger-menu'),
    headerCloseSign = document.querySelector('.header__toggle-menu-cross-sign'),
    pageBody = document.querySelector('.page__body'),
    headerToggleMenuLink = document.querySelectorAll('.header__toggle-menu-link'),
    headerToggleMenu = document.querySelector('.header__toggle-menu')

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

    let jsonBanner = answer.val(),
        sliderWrapper = document.querySelector('#sliderWrapper'),
        sliderDirection = 'vertical',
        smallWindow = false;

    for (let i = 0; i < jsonBanner['sliderContent'].length; i++) {
        let swiperSlide = document.createElement('div')
        swiperSlide.classList.add('slider-slide')
        swiperSlide.id = "slide"
        let bannerContent = document.createElement('div')
        bannerContent.classList.add('banner__content')
        bannerContent.innerHTML = `
        <div class="banner__title-container">
            <h2 class="banner__title">${jsonBanner['sliderContent'][i]['title']}</h2>
        </div>
        <div class="banner__text-container">
            <p class="banner__text">${jsonBanner['sliderContent'][i]['text']}</p>
        </div>
        `
        swiperSlide.appendChild(bannerContent)
        sliderWrapper.appendChild(swiperSlide)
    }
   
    
    
    if(window.innerWidth < 1010) {
        sliderDirection = 'horizontal'
        smallWindow = true;
    }



    
const sliderWooder = (() => {
    let sliderContainer = document.querySelector('#sliderContainer'),
    sliderWrapper = document.querySelector('#sliderWrapper'),
    slides = document.querySelectorAll('#slide'),
    sliderPagination = document.querySelector('#sliderPagination'),
    pressed = false,
    slidePosition = 0,
    numberOfSlide = 0,
    prevSliderButton = document.querySelector('#prev'),
    nextSliderButton = document.querySelector('#next'),
    startY,
    y,
    slideHeight = slides[0].offsetHeight,
    startX,
    x,
    slideWidth = slides[0].offsetWidth;

    
    

    
    // setting active slide
    (() => {
        slides[numberOfSlide].classList.add('active-slide');
        if(sliderDirection === "horizontal") {
            slidePosition = slideWidth*numberOfSlide;
            sliderWrapper.style.transform = `translate3d(-${slidePosition}px, 0, 0)`;
        } else if (sliderDirection === "vertical") {
            slidePosition = slideHeight*numberOfSlide;
            sliderWrapper.style.transform = `translate3d(0, -${slidePosition}px, 0)`;
        }
        
    })();


    const end = (e) => {

    if(pressed && y < 0 && numberOfSlide < slides.length -1) {
        nextSlider()
    } else if(pressed && y > 0 && numberOfSlide > 0) {
        prevSlider()
    }
    pressed = false;
    sliderContainer.style.cursor = 'pointer';
    }

    const start = (e) => {
        pressed = true;
        startY = e.pageY;
        sliderContainer.style.cursor = 'grab'
    
    }

    const move = (e) => {
        if(!pressed) return;
        e.preventDefault();

        if(sliderDirection === "horizontal") {
            const dist = e.pageX - startX;
            if(dist > 0 && slides[0].classList.contains('active-slide')) return;
            if(dist < 0 && slides[slides.length - 1].classList.contains('active-slide')) return;
            x = dist;
            sliderWrapper.style.transform = `translate3d(-${slidePosition - dist}px, 0, 0)`
        } else if (sliderDirection === "vertical") {
            const dist = e.pageY - startY;
            if(dist > 0 && slides[0].classList.contains('active-slide')) return;
            if(dist < 0 && slides[slides.length - 1].classList.contains('active-slide')) return;
            y = dist;
            sliderWrapper.style.transform = `translate3d(0, -${slidePosition - dist}px, 0)`
        }
    }

    const prevSlider = () => {
        numberOfSlide--
        if(sliderDirection === "horizontal") {
            slidePosition = slideWidth*numberOfSlide;
            sliderWrapper.style.transform = `translate3d(-${slidePosition}px, 0, 0)`;
        } else if (sliderDirection === "vertical") {
            slidePosition = slideHeight*numberOfSlide;
            sliderWrapper.style.transform = `translate3d(0, -${slidePosition}px, 0)`;
        }
        slides[numberOfSlide+1].classList.remove('active-slide');
        slides[numberOfSlide].classList.add('active-slide');
        bullets[numberOfSlide+1].classList.remove('active-bullet');
        bullets[numberOfSlide].classList.add('active-bullet');
        sliderWrapper.style.transitionDuration  = '300ms';
    }

    const nextSlider = () => {
        numberOfSlide++
        if(sliderDirection === "horizontal") {
            slidePosition = slideWidth*numberOfSlide;
            sliderWrapper.style.transform = `translate3d(-${slidePosition}px, 0, 0)`;
        } else if (sliderDirection === "vertical") {
            slidePosition = slideHeight*numberOfSlide;
            sliderWrapper.style.transform = `translate3d(0, -${slidePosition}px, 0)`;
        }
        slides[numberOfSlide-1].classList.remove('active-slide');
        slides[numberOfSlide].classList.add('active-slide');
        bullets[numberOfSlide-1].classList.remove('active-bullet');
        bullets[numberOfSlide].classList.add('active-bullet');
        sliderWrapper.style.transitionDuration  = '300ms';
    }

    sliderWrapper.addEventListener('transitionend', () => {
        sliderWrapper.style.transitionDuration  = '0ms';
    });
    sliderContainer.addEventListener('mousedown', start);

    sliderContainer.addEventListener('mousemove', move);

    sliderContainer.addEventListener('mouseleave', end);
    sliderContainer.addEventListener('mouseup', end);

    // arrows

    // prevSliderButton.addEventListener('click', () => {
    //     if(!slides[0].classList.contains('active-slide')) {
    //         prevSlider()
    //     }
    // })
    // nextSliderButton.addEventListener('click', () => {
    //     if(!slides[slides.length-1].classList.contains('active-slide')) {
    //         nextSlider()
    //     }
    // })

    

    // pagination 

    for (let i = 0; i < slides.length; i++) {
        let el = document.createElement('span')
        el.classList.add('slider-pagination-bullet')
        sliderPagination.appendChild(el)
    }

    // creating pagination bullets
    const bullets = document.querySelectorAll('.slider-pagination-bullet');
    bullets[numberOfSlide].classList.add('active-bullet');

    // adding eventListeners for pagination bullets
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].addEventListener('click', () => {
            
            if(sliderDirection === "horizontal") {
                slidePosition = slideWidth*i;
                sliderWrapper.style.transform = `translate3d(-${slidePosition}px, 0, 0)`;
            } else if (sliderDirection === "vertical") {
                slidePosition = slideHeight*i;
                sliderWrapper.style.transform = `translate3d(0, -${slidePosition}px, 0)`;
            }
            sliderWrapper.style.transitionDuration  = '300ms';
            document.querySelector('.active-slide').classList.remove('active-slide');
            document.querySelector('.active-bullet').classList.remove('active-bullet');
            slides[i].classList.add('active-slide');
            bullets[i].classList.add('active-bullet');
            numberOfSlide = i;
        })
    }

})()

    // function changingNumberBullet() {
    //     swiperPaginationBullets.forEach((el,i)=> {
    //         if(el.classList.contains('swiper-pagination-bullet-active')) {
    //             if((i+1 +'').length === 2) {
    //                 swiperPaginationNumber.innerHTML = `${i+1}`
    //             } else {
    //                 swiperPaginationNumber.innerHTML = `0${i+1}`
    //             }
                
    //         }
    //     })
    // }
    // changingNumberBullet()

    // function callback(mutationsList) {
       
    //     mutationsList.forEach(mutation => {
    //         if (mutation.attributeName === 'class') {
                
    //             changingNumberBullet()
    //         }
    //     })
    // }
    
    
    // const mutationObserver = new MutationObserver(callback) 
   
    // mutationObserver.observe(
    //     swiperPagination,
    //     { attributes: true }
    // )
    

    
    window.addEventListener('resize' , () => {
          
        if(window.innerWidth < 1010) {
            
            if(smallWindow == false) {
              
                smallWindow = true
                location = location
            }

            

        } else {
            
            if(smallWindow == true) {
               
                smallWindow = false
                location = location
            }
        }
    })




})





























      
      

    // let swiperPaginationBullets = document.querySelectorAll('.swiper-pagination-bullet')
    // let swiperPaginationNumber = document.querySelector('.swiper-container__count-number')
    // let swiperPagination = document.querySelector('.swiper-pagination')
   


    // swiperPaginationBullets.forEach((el) => {
    //     el.addEventListener('click', () => {
    //         swiperPagination.classList.add('changed')
    //     })
    // })
    // function changingNumberBullet() {
    //     swiperPaginationBullets.forEach((el,i)=> {
    //         if(el.classList.contains('swiper-pagination-bullet-active')) {
    //             if((i+1 +'').length === 2) {
    //                 swiperPaginationNumber.innerHTML = `${i+1}`
    //             } else {
    //                 swiperPaginationNumber.innerHTML = `0${i+1}`
    //             }
                
    //         }
    //     })
    // }
    // changingNumberBullet()

    // function callback(mutationsList) {
    //    
    //     mutationsList.forEach(mutation => {
    //         if (mutation.attributeName === 'class') {
                
    //             changingNumberBullet()
    //         }
    //     })
    // }
    
    
    // const mutationObserver = new MutationObserver(callback) 
   
    // mutationObserver.observe(
    //     swiperPagination,
    //     { attributes: true }
    // )
