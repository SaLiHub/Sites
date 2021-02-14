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
    slideHeight = slides[0].offsetHeight,
    slideWidth = slides[0].offsetWidth;
    

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
        sliderWrapper.style.transform = `translate3d(-${slidePosition}px, 0, 0)`;
    } else if (sliderDirection === "vertical") {
        slidePosition = slideHeight*numberOfSlide;
        sliderWrapper.style.transform = `translate3d(0, -${slidePosition}px, 0)`;
    }
    
 })();

 const end = (e) => {
    console.log('scroll')
    if(sliderDirection === "horizontal") {
        if(pressed && x < 0) {
            console.log(pressed)
            nextSlider()
        } else if((pressed && x > 0)){
            console.log(pressed)
            prevSlider() 
        }
    } else if (sliderDirection === "vertical") {
        if(pressed && y < 0) {
            nextSlider()
        } else if((pressed && y > 0)){
            prevSlider() 
        }
    }





pressed = false;
sliderContainer.style.cursor = 'pointer';
}

const start = (e) => {
   if(e.buttons === 2) return;
    pressed = true;
    if(sliderDirection === "horizontal") { 
        startX = e.pageX;
    } else if (sliderDirection === "vertical") {
        startY = e.pageY;
    }
    
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
    if(slides[0].classList.contains('active-slide')) return;
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

    if(numberOfSlide+1 >= 10) {
        counter.innerHTML = `${numberOfSlide+1}`
    } else {
        counter.innerHTML = `0${numberOfSlide+1}`
    }
}

const nextSlider = () => {
    if(slides[slides.length - 1].classList.contains('active-slide')) return;
    
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

    if(numberOfSlide+1 >= 10) {
        counter.innerHTML = `${numberOfSlide+1}`
    } else {
        counter.innerHTML = `0${numberOfSlide+1}`
    }
}

sliderWrapper.addEventListener('transitionend', () => {
    sliderWrapper.style.transitionDuration  = '0ms';
});
sliderContainer.addEventListener('mousedown', start);
sliderContainer.addEventListener('touchstart', start);

sliderContainer.addEventListener('mousemove', move);
sliderContainer.addEventListener('touchmove', move);

sliderContainer.addEventListener('mouseleave', end);
sliderContainer.addEventListener('touchend', end);

sliderContainer.addEventListener('mouseup', end);
sliderContainer.addEventListener('touchcancel', end);


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

    window.addEventListener('resize', () => {
        slideHeight = slides[0].offsetHeight,
        slideWidth = slides[0].offsetWidth;
    })
   
})()