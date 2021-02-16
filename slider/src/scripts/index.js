(() => {
    const sliderDirection = "horizontal",
    sliderContainer = document.querySelector('#sliderContainer'),
    sliderWrapper = document.querySelector('#sliderWrapper'),
    slides = document.querySelectorAll('#slide'),
    sliderPagination = document.querySelector('#sliderPagination'),
    counter = document.querySelector('#countNumber'),
    prevSliderButton = document.querySelector('#prev'),
    nextSliderButton = document.querySelector('#next');

    let pressed = false,
    slidePosition = 0,
    numberOfSlide = 0,
    startY,
    y,
    startX,
    x,
    slideHeight = sliderContainer.offsetHeight,
    slideWidth = sliderContainer.offsetWidth,
    decrement = 0.2;
    
    
    
    // adding transparent highlight
   
        sliderContainer.classList.add('highlight-transparent');
    
    // counter

    (() => {
        if(numberOfSlide+1 >= 10) {
            counter.innerHTML = `${numberOfSlide+1}`
        } else {
            counter.innerHTML = `0${numberOfSlide+1}`
        }
    })()

    
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
                sliderWrapper.style.transform = `translate3d(${-slidePosition}px, 0, 0)`;
            } else if (sliderDirection === "vertical") {
                slidePosition = slideHeight*i;
                sliderWrapper.style.transform = `translate3d(0, ${-slidePosition}px, 0)`;
            }
            sliderWrapper.style.transitionDuration  = '300ms';
            document.querySelector('.active-slide').classList.remove('active-slide');
            document.querySelector('.active-bullet').classList.remove('active-bullet');
            slides[i].classList.add('active-slide');
            bullets[i].classList.add('active-bullet');
            numberOfSlide = i;
            if(numberOfSlide+1 >= 10) {
                counter.innerHTML = `${numberOfSlide+1}`
            } else {
                counter.innerHTML = `0${numberOfSlide+1}`
            }
        })
    }

// setting active slide
(() => {
    slides[numberOfSlide].classList.add('active-slide');
    if(sliderDirection === "horizontal") {
        slidePosition = slideWidth*numberOfSlide;
        sliderWrapper.style.transform = `translate3d(${-slidePosition}px, 0, 0)`;
    } else if (sliderDirection === "vertical") {
        slidePosition = slideHeight*numberOfSlide;
        sliderWrapper.style.transform = `translate3d(0, ${-slidePosition}px, 0)`;
    }
    
 })();




 const start = (e) => {
    sliderWrapper.style.transitionDuration  = '0ms';
   
    if(e.buttons === 2) return;
     pressed = true;
    
     if(sliderDirection === "horizontal") { 
         startX = e.pageX;
     } else if (sliderDirection === "vertical") {
         startY = e.pageY;
     }
     
    
    
 }


 const move = (e) => {
    if(!pressed) return;
    e.preventDefault();
   
    if(sliderDirection === "horizontal") {
        const dist = e.pageX - startX;
        if(dist > 0 && slides[0].classList.contains('active-slide')) {
            decrement += 0.576;
            // console.log(decrement)
            sliderWrapper.style.transform = `translate3d(${-(slidePosition - (dist - decrement))}px, 0, 0)`
        } else {
            x = dist;
        
            sliderWrapper.style.transform = `translate3d(${-(slidePosition - dist)}px, 0, 0)`
        }
        // if(dist < 0 && slides[slides.length - 1].classList.contains('active-slide')) return;
       
       
    } else if (sliderDirection === "vertical") {
        const dist = e.pageY - startY;
   
        if(dist < 0 && slides[slides.length - 1].classList.contains('active-slide')) {
            decrement += 0.576;
            console.log(decrement)
            sliderWrapper.style.transform = `translate3d(0,${-(slidePosition - (dist - decrement))}px, 0)`
        }else {
            y = dist;
            sliderWrapper.style.transform = `translate3d(0, ${-(slidePosition - dist)}px, 0)`
        };
        
        y = dist;
        sliderWrapper.style.transform = `translate3d(0, ${-(slidePosition - dist)}px, 0)`
    }
}

 const end = (e) => {
     if(!pressed) return;
   

    if(numberOfSlide + 1 === slides.length || numberOfSlide === 0) {
        
        currentSlide()
    }
    
    if(sliderDirection === "horizontal") {
        if(pressed && x > 0 && !slides[0].classList.contains('active-slide')){
    
            prevSlider() 
        } else if(pressed && x < 0 && !slides[slides.length - 1].classList.contains('active-slide')) {
            nextSlider()
        }
    } else if (sliderDirection === "vertical") {
        if(pressed && y > 0 && !slides[0].classList.contains('active-slide')) {
            prevSlider() 
        } else if((pressed && y < 0 && !slides[slides.length - 1].classList.contains('active-slide'))){
            nextSlider()
        }
    }
    
    pressed = false;
    decrement = 0.2;
}


window.addEventListener('resize', () => {
    
    if(sliderDirection === "horizontal") {
        slideWidth = slides[0].offsetWidth;
        slidePosition = slideWidth*numberOfSlide;
        sliderWrapper.style.transform = `translate3d(${-slidePosition}px, 0, 0)`
    } else {
        slideHeight = slides[0].offsetHeight;
        slidePosition = slideHeight*numberOfSlide;
        sliderWrapper.style.transform = `translate3d(0, ${-slidePosition}px, 0)`
    }
})

const currentSlide = () => {
    if(sliderDirection === "horizontal") {
        slidePosition = slideWidth*numberOfSlide;
        sliderWrapper.style.transform = `translate3d(${-slidePosition}px, 0, 0)`;
        sliderWrapper.style.transitionDuration  = '300ms';
    } else {
        slidePosition = slideHeight*numberOfSlide;
        sliderWrapper.style.transitionDuration  = '300ms';
        sliderWrapper.style.transform = `translate3d(0, ${-slidePosition}px, 0)`
    }
    
}

const prevSlider = () => {
    
    numberOfSlide--
    if(sliderDirection === "horizontal") {
        slidePosition = slideWidth*numberOfSlide;
        sliderWrapper.style.transform = `translate3d(${-slidePosition}px, 0, 0)`;
    } else if (sliderDirection === "vertical") {
        slidePosition = slideHeight*numberOfSlide;
        sliderWrapper.style.transform = `translate3d(0, ${-slidePosition}px, 0)`;
    }
    slides[numberOfSlide+1].classList.remove('active-slide');
    slides[numberOfSlide].classList.add('active-slide');
    bullets[numberOfSlide+1].classList.remove('active-bullet');
    bullets[numberOfSlide].classList.add('active-bullet');
    sliderWrapper.style.transitionDuration  = '300ms';

    // counter
    if(numberOfSlide+1 >= 10) {
        counter.innerHTML = `${numberOfSlide+1}`
    } else {
        counter.innerHTML = `0${numberOfSlide+1}`
    }
}

const nextSlider = () => {
    
    numberOfSlide++
    if(sliderDirection === "horizontal") {
        slidePosition = slideWidth*numberOfSlide;
        sliderWrapper.style.transform = `translate3d(${-slidePosition}px, 0, 0)`;
    } else if (sliderDirection === "vertical") {
        slidePosition = slideHeight*numberOfSlide;
        sliderWrapper.style.transform = `translate3d(0, ${-slidePosition}px, 0)`;
    }
    slides[numberOfSlide-1].classList.remove('active-slide');
    slides[numberOfSlide].classList.add('active-slide');
    bullets[numberOfSlide-1].classList.remove('active-bullet');
    bullets[numberOfSlide].classList.add('active-bullet');
    sliderWrapper.style.transitionDuration  = '300ms';

    // counter
    if(numberOfSlide+1 >= 10) {
        counter.innerHTML = `${numberOfSlide+1}`
    } else {
        counter.innerHTML = `0${numberOfSlide+1}`
    }
}



sliderWrapper.addEventListener('transitionend', () => {
    sliderWrapper.style.transitionDuration  = '0ms';
});


    if(window.PointerEvent) {
        console.log('pointer')
        sliderContainer.addEventListener('pointerdown', start);
        sliderContainer.addEventListener('pointermove', move);
        sliderContainer.addEventListener('pointerup', end);
        sliderContainer.addEventListener('pointercancel', end);

        // 
        
        sliderContainer.addEventListener('mouseleave', end);
        
    } else {
        console.log('mouse')
        sliderContainer.addEventListener('mousedown', start);
        sliderContainer.addEventListener('mousemove', move);
        sliderContainer.addEventListener('mouseup', end);
        sliderContainer.addEventListener('mouseleave', end);

        sliderContainer.addEventListener('touchstart', start);
        sliderContainer.addEventListener('touchmove', move);
        sliderContainer.addEventListener('touchcancel', end);
        sliderContainer.addEventListener('touchend', end);
    }

  
   
    



 
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

    
   
})()