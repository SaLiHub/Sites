(() => {
    const sliderContainer = document.querySelector('#sliderContainer'),
          sliderWrapper = document.querySelector('#sliderWrapper'),
          slides = document.querySelectorAll('.slider-slide'),
          sliderPagination = document.querySelector('#sliderPagination'),
          counter = document.querySelector('#countNumber');
    

    let pressed = false,
        slidePosition = 0,
        numberOfSlide = 0,
        startX,
        x,
        slideHeight = sliderContainer.offsetHeight,
        slideWidth = sliderContainer.offsetWidth,
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
        let el = document.createElement('span');
        el.classList.add('slider-pagination-bullet');
        sliderPagination.appendChild(el);
    }
    // creating pagination bullets
    const bullets = document.querySelectorAll('.slider-pagination-bullet');
    bullets[numberOfSlide].classList.add('active-bullet');


    // adding eventListeners for pagination bullets

    for (let i = 0; i < bullets.length; i++) {
        bullets[i].addEventListener('click', () => {
            
            slidePosition = slideWidth*i;
            sliderWrapper.style.transform = `translate3d(${-slidePosition}px, 0, 0)`;
             
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
        slidePosition = slideWidth*numberOfSlide;
        sliderWrapper.style.transform = `translate3d(${-slidePosition}px, 0, 0)`;
    })();



    

    const start = (e) => {
        if(e.buttons === 2) return;
        startOfHolding = new Date().getTime();
        interception = false;
        pressed = true;
        
    
        if(sliderWrapper.style.transitionDuration  === '300ms') {
            console.log(numberOFInterceptions)
            numberOFInterceptions += 1;
                if(numberOFInterceptions >= 2 
                    && !slides[0].classList.contains('active-slide') 
                    && !slides[slides.length - 1].classList.contains('active-slide')
                ) {
                    pressed = false;
                    return
                }
                console.log('unluck')
            transition = true;
            
        } else {
        
            transition = false;
            if(slidePosition === slideWidth*numberOfSlide 
            || slidePosition === slideHeight*numberOfSlide)
            {
                numberOFInterceptions = 0; 
                nextActiveSlide = false;
                prevActiveSlide = false;
            }
        }
    
    
     
         
         startX = e.pageX;
         const timeStop = startOfHolding - endOfHolding;
         if(transition) {
            
             interception = true;
             const speed = (slideWidth - Math.abs(x)) / 300;
             const distance = timeStop * speed;
            if(nextSlideExecution) {

                if(slides[slides.length - 1].classList.contains('active-slide') && !nextActiveSlide) {
                    
                     slidePosition = slidePosition + (Math.abs(x) - (Math.abs(x) / 300) * timeStop);
                    
                 } else {
                     
                    slidePosition = slidePosition + (distance + Math.abs(x)) - slideWidth;
                 }
                
            } else if(prevSlideExecution){
               
                if(slides[0].classList.contains('active-slide') && !prevActiveSlide) {
                 
                    slidePosition =  (Math.abs(x) / 300) * timeStop - Math.abs(x) ;
                    
                } else {
                    slidePosition = slidePosition - (distance + Math.abs(x)) + slideWidth;
                }
                
            }
            
             sliderWrapper.style.transform = `translate3d(${-(slidePosition)}px, 0, 0)`;
         }

     
        sliderWrapper.style.transitionDuration  = '0ms';
    }


    const move = (e) => {
        if(!pressed) return;
        e.preventDefault();
  
    
        const dist = e.pageX - startX;
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
            sliderWrapper.style.transform = `translate3d(${-(slidePosition - dist / decrement)}px, 0, 0)`
            x = dist / decrement;
        } else {
            x = dist;
            
            sliderWrapper.style.transform = `translate3d(${-(slidePosition - dist)}px, 0, 0)`
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
  
    
    
        if(Math.abs(x) < (slideWidth / 2) && timeDiff > 200 && !interception) {
            
            if(slides[0].classList.contains('active-slide') && x > 0 || slides[slides.length - 1].classList.contains('active-slide') && x < 0) {
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

        if(interception && prevSlideExecuted && x > 0 ) {
                prevActiveSlide = false;
                currentSlide()
                return
        } else if(interception && nextSlideExecuted && x < 0) {
                nextActiveSlide = false;
                currentSlide()
                return
        }
            

        if(x > 0 && !slides[0].classList.contains('active-slide')){
            prevActiveSlide = true;
            prevSlide();
             
        } else if(x > 0 && slides[0].classList.contains('active-slide')) {

            currentSlide()
            
        } else if(x < 0 && !slides[slides.length - 1].classList.contains('active-slide')) {
            nextActiveSlide = true;
            nextSlide()
           
        } else if(x < 0 && slides[slides.length - 1].classList.contains('active-slide')) {
            currentSlide()
            
        }

    }


    window.addEventListener('resize', () => {
            slideWidth = slides[0].offsetWidth;
            slidePosition = slideWidth*numberOfSlide;
            sliderWrapper.style.transform = `translate3d(${-slidePosition}px, 0, 0)`;
    })

    const currentSlide = () => {
        slidePosition = slideWidth*numberOfSlide;
        sliderWrapper.style.transform = `translate3d(${-slidePosition}px, 0, 0)`;
        sliderWrapper.style.transitionDuration  = '300ms';
    }

    const prevSlide = () => {
        numberOfSlide--
       
        slidePosition = slideWidth*numberOfSlide;
        sliderWrapper.style.transform = `translate3d(${-slidePosition}px, 0, 0)`;
        
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
        
        slidePosition = slideWidth*numberOfSlide;
        sliderWrapper.style.transform = `translate3d(${-slidePosition}px, 0, 0)`;
       
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