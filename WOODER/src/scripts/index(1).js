function sliderWooder() {
    let slider = "horizontal",
        sliderContainer = document.querySelector('#sliderContainer'),
        sliderWrapper = document.querySelector('#sliderWrapper'),
        slides = document.querySelectorAll('#slide'),
        sliderPagination = document.querySelector('#sliderPagination'),
        pressed = false,
        slidePosition = 0,
        numberOfSlide = 0,
        prevSliderButton = document.querySelector('#prev'),
        nextSliderButton = document.querySelector('#next')
    
        
    // pagination

    for (let i = 0; i < slides.length; i++) {
        let el = document.createElement('span')
        el.classList.add('slider-pagination-bullet')
        sliderPagination.appendChild(el)
    }
     // creating pagination bullets
     const bullets = document.querySelectorAll('.slider-pagination-bullet');
     bullets[numberOfSlide].classList.add('active-bullet');
    if(slider === "vertical") {
        
        let startY,
            y,
            slideHeight = slides[0].offsetHeight

        const settingActiveSlide = (() => {
            slides[numberOfSlide].classList.add('active-slide');
            slidePosition = slideHeight*numberOfSlide;
            sliderWrapper.style.transform = `translateY(-${slidePosition}px)`;
        })();
        
        slides[numberOfSlide].classList.add('active-slide');
    

            for (let i = 0; i < bullets.length; i++) {

                bullets[i].addEventListener('click', () => {
                    slidePosition = slideHeight*i;
                    sliderWrapper.style.transform = `translate3d(0, -${slidePosition}px, 0)`;
                    sliderWrapper.style.transitionDuration  = '300ms';
                    document.querySelector('.active-slide').classList.remove('active-slide');
                    document.querySelector('.active-bullet').classList.remove('active-bullet');
                    slides[i].classList.add('active-slide');
                    bullets[i].classList.add('active-bullet');
                    numberOfSlide = i;
                  
                })
                
            }
    
        
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
            
            const dist = e.pageY - startY;
            
            if(dist > 0 && slides[0].classList.contains('active-slide')) return;
            if(dist < 0 && slides[slides.length - 1].classList.contains('active-slide')) return;
            y = dist;
            
            sliderWrapper.style.transform = `translate3d(0, -${slidePosition - dist}px, 0)`
           
        }

        const prevSlider = () => {
            numberOfSlide--
            slidePosition = slideHeight*numberOfSlide;
            sliderWrapper.style.transform = `translate3d(0, -${slidePosition}px, 0)`;
            slides[numberOfSlide+1].classList.remove('active-slide');
            slides[numberOfSlide].classList.add('active-slide');
            bullets[numberOfSlide+1].classList.remove('active-bullet');
            bullets[numberOfSlide].classList.add('active-bullet');
            sliderWrapper.style.transitionDuration  = '300ms';
        }

        const nextSlider = () => {
            numberOfSlide++
            slidePosition = slideHeight*numberOfSlide;
            sliderWrapper.style.transform = `translate3d(0, -${slidePosition}px, 0)`;
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
    } else if(slider === "horizontal") {
        
        let startX,
            x,
            slideWidth = slides[0].offsetWidth

                 // setting active slide
  
        const settingActiveSlide = (() => {
            slides[numberOfSlide].classList.add('active-slide');
            slidePosition = slideWidth*numberOfSlide;
            sliderWrapper.style.transform = `translate3d(-${slidePosition}px, 0, 0)`;
        })();
        
        slides[numberOfSlide].classList.add('active-slide');
    

            for (let i = 0; i < bullets.length; i++) {
                bullets[i].addEventListener('click', () => {
                    slidePosition = slideWidth*i;
                    sliderWrapper.style.transform = `translate3d(-${slidePosition}px, 0, 0)`;
                    sliderWrapper.style.transitionDuration  = '300ms';
                    document.querySelector('.active-slide').classList.remove('active-slide');
                    document.querySelector('.active-bullet').classList.remove('active-bullet');
                    slides[i].classList.add('active-slide');
                    bullets[i].classList.add('active-bullet');
                    numberOfSlide = i;
                })
            }
    
       

        const end = (e) => {

        if(pressed && x < 0 && numberOfSlide < slides.length -1) {
            nextSlider()
        } else if(pressed && x > 0 && numberOfSlide > 0) {
            prevSlider()
        }
        pressed = false;
        sliderContainer.style.cursor = 'pointer';
        }

        const start = (e) => {
            pressed = true;
            startX = e.pageX;
            sliderContainer.style.cursor = 'grab'
        
        }

        const move = (e) => {
            if(!pressed) return;
            e.preventDefault();
            
            const dist = e.pageX - startX;
            if(dist > 0 && slides[0].classList.contains('active-slide')) return;
            if(dist < 0 && slides[slides.length - 1].classList.contains('active-slide')) return;
            x = dist;
            console.log(x)
            sliderWrapper.style.transform = `translate3d(-${slidePosition - dist}px, 0, 0)`
        }

        const prevSlider = () => {
            numberOfSlide--
            slidePosition = slideWidth*numberOfSlide;
            sliderWrapper.style.transform = `translate3d(-${slidePosition}px, 0, 0)`;
            slides[numberOfSlide+1].classList.remove('active-slide');
            slides[numberOfSlide].classList.add('active-slide');
            bullets[numberOfSlide+1].classList.remove('active-bullet');
            bullets[numberOfSlide].classList.add('active-bullet');
            sliderWrapper.style.transitionDuration  = '300ms';
        }

        const nextSlider = () => {
            numberOfSlide++
            slidePosition = slideWidth*numberOfSlide;
            sliderWrapper.style.transform = `translate3d(-${slidePosition}px, 0, 0)`;
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

        //   arrows

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

    }
}