(() => {
    const sliderDirection = "vertical",
    sliderContainer = document.querySelector('#sliderContainer'),
    sliderWrapper = document.querySelector('#sliderWrapper'),
    slides = document.querySelectorAll('.slider-slide'),
    sliderPagination = document.querySelector('#sliderPagination'),
    counter = document.querySelector('#countNumber'),
    prevSlideButton = document.querySelector('#prev'),
    nextSlideButton = document.querySelector('#next');
    

    let pressed = false,
    slidePosition = 0,
    numberOfSlide = 0,
    startY,
    y,
    slideHeight = sliderContainer.offsetHeight,
    startOfHolding,
    endOfHolding,
    moved = false,
    interception = false,
    numberOFInterceptions = 0,
    nextSlideExecution,
    prevSlideExecution,
    transition,
    nextSlideExecuted = false,
    prevSlideExecuted = false,
    prevActiveSlide,
    nextActiveSlide;
    
    
    
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
            
            
            slidePosition = slideHeight*i;
            sliderWrapper.style.transform = `translate3d(0, ${-slidePosition}px, 0)`;
            
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
    
        slidePosition = slideHeight*numberOfSlide;
        sliderWrapper.style.transform = `translate3d(0, ${-slidePosition}px, 0)`;

        
    })();



    const start = (e) => {
        if(e.buttons === 2) return;
        startOfHolding = new Date().getTime();
        interception = false;
        pressed = true;
        
        
        if(sliderWrapper.style.transitionDuration  === '300ms') {
            numberOFInterceptions += 1;
                if(numberOFInterceptions >= 2 
                    && !slides[0].classList.contains('active-slide') 
                    && !slides[slides.length - 1].classList.contains('active-slide')
                ) {
                    pressed = false;
                    return
                }
            transition = true;
            
        } else {
        
            transition = false;
            if(slidePosition === slideHeight*numberOfSlide)
            {
                numberOFInterceptions = 0; 
                nextActiveSlide = false;
                prevActiveSlide = false;
            }
            
            
            

        }
    
    
        startY = e.pageY;
        const timeStop = startOfHolding - endOfHolding;
        if(transition) {
        
            interception = true;
            const speed = (slideHeight - Math.abs(y)) / 300;
            const distance = timeStop * speed;
        if(nextSlideExecution) {

            if(slides[slides.length - 1].classList.contains('active-slide') && !nextActiveSlide) {
                
                    slidePosition = slidePosition + (Math.abs(y) - (Math.abs(y) / 300) * timeStop);
                
                } else {
                    
                slidePosition = slidePosition + (distance + Math.abs(y)) - slideHeight;
                }
            
        } else if(prevSlideExecution){
            
            if(slides[0].classList.contains('active-slide') && !prevActiveSlide) {
                
                slidePosition =  (Math.abs(y) / 300) * timeStop - Math.abs(y) ;
                
            } else {
                slidePosition = slidePosition - (distance + Math.abs(y)) + slideHeight;
            }
            
        }
        console.log("end")
            sliderWrapper.style.transform = `translate3d(0, ${-(slidePosition)}px, 0)`;
        }
    
     
        sliderWrapper.style.transitionDuration  = '0ms';
    }


    const move = (e) => {
        if(!pressed) return;
        e.preventDefault();

        const dist = e.pageY - startY;

        if(dist === 0) return
    
        if(dist > 0) {
            prevSlideExecution  = true;
            nextSlideExecution = false;
        } else {
            prevSlideExecution  = false;
            nextSlideExecution = true;
        }
        if(dist > 0 && slides[0].classList.contains('active-slide') && !prevActiveSlide 
        || dist < 0 && slides[slides.length - 1].classList.contains('active-slide') && !nextActiveSlide ) {
            const decrement = 2.2;
            sliderWrapper.style.transform = `translate3d(0, ${-(slidePosition - dist / decrement)}px, 0)`
            y = dist / decrement;
        } else {
            y = dist;
            
            sliderWrapper.style.transform = `translate3d(0, ${-(slidePosition - dist)}px, 0)`
        }
        
        moved = true;
    }

    const end = (e) => {
   
   
        if(!pressed) return;
        pressed = false;
    
        
        if(!moved && !interception) return;
        moved = false;
        transition = true;
    
        endOfHolding = new Date().getTime();
        const timeDiff = endOfHolding - startOfHolding;
    

        if(Math.abs(y) < (slideHeight / 2) && timeDiff > 200 && !interception) {
            
            if(slides[0].classList.contains('active-slide') && y > 0 
            || slides[slides.length - 1].classList.contains('active-slide') && y < 0) {
                numberOFInterceptions = 0;
                currentSlide()
                pressed = false;
                return
            }
            numberOFInterceptions = 2;
            currentSlide()
            pressed = false;
            return
        }
        if(interception && prevSlideExecuted && y > 0 ) {
                prevActiveSlide = false;
                currentSlide()
                return
        } else if(interception && nextSlideExecuted && y < 0) {
                nextActiveSlide = false;
                currentSlide()
                return
        }
            

        if(y > 0 && !slides[0].classList.contains('active-slide')){
            prevActiveSlide = true;
            prevSlide();
             
        } else if(y > 0 && slides[0].classList.contains('active-slide')) {

            currentSlide()
            
        } else if(y < 0 && !slides[slides.length - 1].classList.contains('active-slide')) {
            nextActiveSlide = true;
            nextSlide()
           
        } else if(y < 0 && slides[slides.length - 1].classList.contains('active-slide')) {
            currentSlide()
            
        }
    
    }


    window.addEventListener('resize', () => {
            slideHeight = slides[0].offsetHeight;
            slidePosition = slideHeight*numberOfSlide;
            sliderWrapper.style.transform = `translate3d(0, ${-slidePosition}px, 0)`;
    })

    const currentSlide = () => {
            slidePosition = slideHeight*numberOfSlide;
            sliderWrapper.style.transitionDuration  = '300ms';
            sliderWrapper.style.transform = `translate3d(0, ${-slidePosition}px, 0)`;
    }

    const prevSlide = () => {
        
        numberOfSlide--
     
        slidePosition = slideHeight*numberOfSlide;
        sliderWrapper.style.transform = `translate3d(0, ${-slidePosition}px, 0)`;
    
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
        
        slidePosition = slideHeight*numberOfSlide;
        sliderWrapper.style.transform = `translate3d(0, ${-slidePosition}px, 0)`;
    
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
        
        sliderContainer.addEventListener('pointerdown', start);
        sliderContainer.addEventListener('pointermove', move);
        sliderContainer.addEventListener('pointerup', end);
        sliderContainer.addEventListener('pointercancel', end);

        // 
        
        sliderContainer.addEventListener('mouseleave', end);
        
    } else {
        
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