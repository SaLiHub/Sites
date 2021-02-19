(() => {
    const sliderDirection = "horizontal",
    sliderContainer = document.querySelector('#sliderContainer'),
    sliderWrapper = document.querySelector('#sliderWrapper'),
    slides = document.querySelectorAll('#slide'),
    sliderPagination = document.querySelector('#sliderPagination'),
    counter = document.querySelector('#countNumber'),
    prevSlideButton = document.querySelector('#prev'),
    nextSlideButton = document.querySelector('#next');
    

    let pressed = false,
    slideDuplicate,
    slidePosition = 0,
    numberOfSlide = 0,
    startY,
    y,
    startX,
    x,
    slideHeight = sliderContainer.offsetHeight,
    slideWidth = sliderContainer.offsetWidth,
    startOfHolding,
    endOfHolding,
    moved = false,
    interception = false,
    interceptionCount = 0,
    nextSlideExecution,
    prevSlideExecution,
    transition,
    nextSlideExecuted = false,
    prevSlideExecuted = false;
    
    
    
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
            sliderWrapper.style.transitionDuration  = '301ms';
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



let numberOFInterceptions = 0;
 const start = (e) => {
    if(e.buttons === 2) return;
//     console.log(numberOFInterceptions)
//     console.log(slidePosition," slidePosition")
// console.log(slideWidth,numberOfSlide ," slidePosition*numberOfSlide")
    
    if(sliderWrapper.style.transitionDuration  === '300ms') {
        
        numberOFInterceptions += 1;
            
            if(numberOFInterceptions === 2) {
                return
            } 
        transition = true;
        
    } else {
        transition = false;
        if(slidePosition === slideWidth*numberOfSlide) {
            // console.log("bad luck")
            numberOFInterceptions = 0;
        }
        

    }
    startOfHolding = new Date().getTime();
    
    interception = false;
    pressed = true;
    
     if(sliderDirection === "horizontal") { 
         startX = e.pageX;
         const timeStop = startOfHolding - endOfHolding;
         if(transition) {
             interception = true;
             const speed = (slideWidth - Math.abs(x)) / 300;
             const distance = timeStop * speed;
            if(nextSlideExecution && !slides[slides.length - 1].classList.contains('active-slide')) {
                console.log('right')
                slidePosition = slidePosition + (distance + Math.abs(x)) - slideWidth;
            } else if(prevSlideExecution && !slides[0].classList.contains('active-slide')){
                console.log('left')
                slidePosition = slidePosition - (distance + Math.abs(x)) + slideWidth;
            }
            
             sliderWrapper.style.transform = `translate3d(${-(slidePosition)}px, 0, 0)`;
         }

         
     } else if (sliderDirection === "vertical") {
         startY = e.pageY;
     }
     
     sliderWrapper.style.transitionDuration  = '0ms';
    
 }


 const move = (e) => {
    if(!pressed) return;
    e.preventDefault();
    
    if(sliderDirection === "horizontal") {
        const dist = e.pageX - startX;

        
        if(dist > 0 && slides[0].classList.contains('active-slide') || dist < 0 && slides[slides.length - 1].classList.contains('active-slide')) {
            const decrement = 2.2;
            sliderWrapper.style.transform = `translate3d(${-(slidePosition - dist / decrement)}px, 0, 0)`
            x = dist;
        } else {
            x = dist;
            
            sliderWrapper.style.transform = `translate3d(${-(slidePosition - dist)}px, 0, 0)`
        }
       
       
    } else if (sliderDirection === "vertical") {
        const dist = e.pageY - startY;
   
        if(dist > 0 && slides[0].classList.contains('active-slide') || dist < 0 && slides[slides.length - 1].classList.contains('active-slide')) {

            const decrement = 2.2;
            sliderWrapper.style.transform = `translate3d(0,${-(slidePosition - dist / decrement)}px, 0)`
            y = dist;
        }else {
            y = dist;
            sliderWrapper.style.transform = `translate3d(0, ${-(slidePosition - dist)}px, 0)`
        };
    }
    moved = true;
}

 const end = (e) => {
   
   
    if(!pressed) return;
    pressed = false;
    endOfHolding = new Date().getTime();
    
    if(!moved && !interception) return;
    moved = false;
    transition = true;
    
   
   const timeDiff = endOfHolding - startOfHolding;
  
    
    if(sliderDirection === "horizontal") {
        if(Math.abs(x) < (slideWidth / 2) && timeDiff > 200 && !interception) {
            
            currentSlide()
            pressed = false;
            return
       }
       if(interception && prevSlideExecuted && x > 0 ) {
            currentSlide()
            return
       } else if(interception && nextSlideExecuted && x < 0) {
            currentSlide()
            return
       }
            

        if(x > 0 && !slides[0].classList.contains('active-slide')){
           
           
            prevSlide();
             
        } else if(x > 0 && slides[0].classList.contains('active-slide')) {

            currentSlide()
            
        } else if(x < 0 && !slides[slides.length - 1].classList.contains('active-slide')) {
           
           
            nextSlide()
           
        } else if(x < 0 && slides[slides.length - 1].classList.contains('active-slide')) {
            currentSlide()
            
        }

    } else if (sliderDirection === "vertical") {
        if(Math.abs(y) < (slideHeight / 2) && timeDiff > 200) {
            currentSlide()
            pressed = false;
            return
       }

        if(y > 0 && !slides[0].classList.contains('active-slide')){
            prevSlide();
            
             
        } else if(y > 0 && slides[0].classList.contains('active-slide')) {
            currentSlide()
            
           
        } else if(y < 0 && !slides[slides.length - 1].classList.contains('active-slide')) {
            nextSlide()
            
           
        } else if(y < 0 && slides[slides.length - 1].classList.contains('active-slide')) {
            currentSlide()
    
        }
    }
    
    
    
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

const prevSlide = () => {
    
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
    endOfHolding = new Date().getTime();
    prevSlideExecution = true;
    prevSlideExecuted = true;
    nextSlideExecution = false;
    nextSlideExecuted = false;
    // counter
    if(numberOfSlide+1 >= 10) {
        counter.innerHTML = `${numberOfSlide+1}`
    } else {
        counter.innerHTML = `0${numberOfSlide+1}`
    }
}

const nextSlide = () => {
    
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
    endOfHolding = new Date().getTime();
    prevSlideExecution = false;
    prevSlideExecuted = false;
    nextSlideExecution = true;
    nextSlideExecuted = true;
  
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
        ('pointer')
        sliderContainer.addEventListener('pointerdown', start);
        sliderContainer.addEventListener('pointermove', move);
        sliderContainer.addEventListener('pointerup', end);
        sliderContainer.addEventListener('pointercancel', end);

        // 
        
        sliderContainer.addEventListener('mouseleave', end);
        
    } else {
        ('mouse')
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

// prevSlideButton.addEventListener('click', () => {
//     if(!slides[0].classList.contains('active-slide')) {
//         prevSlide()
//     }
// })
// nextSlideButton.addEventListener('click', () => {
//     if(!slides[slides.length-1].classList.contains('active-slide')) {
//         nextSlide()
//     }
// })

    
   
})()