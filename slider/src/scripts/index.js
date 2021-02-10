(() => {
    let slider = document.querySelector('.slider'),
        sliderContainer = document.querySelector('.slider-container'),
        sliderWrapper = document.querySelector('#slider-wrapper'),
        slides = document.querySelectorAll('#slide'),
        pressed = false,
        startX,
        x,
        slidePosition = 0,
        numberOfSlide = 0,
        prevSliderButton = document.querySelector('#prev'),
        nextSliderButton = document.querySelector('#next')
     
    // setting active slide
        slides[0].classList.add('active-slide')

    const slideWidth = slides[0].offsetWidth

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
        
        sliderWrapper.style.transform = `translate(-${slidePosition - dist}px)`
    }

    const prevSlider = () => {
        numberOfSlide--
        slides[numberOfSlide+1].classList.remove('active-slide');
        slides[numberOfSlide].classList.add('active-slide');
        slidePosition -= slideWidth;
        sliderWrapper.style.transform = `translate(-${slidePosition}px)`;
        sliderWrapper.style.transitionDuration  = '300ms';
    }

    const nextSlider = () => {
        numberOfSlide++
        slidePosition += slideWidth;
        sliderWrapper.style.transform = `translate(-${slidePosition}px)`;
        sliderWrapper.style.transitionDuration  = '300ms';
        slides[numberOfSlide-1].classList.remove('active-slide');
        slides[numberOfSlide].classList.add('active-slide');
    }

    (() => {
        sliderWrapper.addEventListener('transitionend', () => {
            sliderWrapper.style.transitionDuration  = '0ms';
          });
        sliderContainer.addEventListener('mousedown', start);
     
        sliderContainer.addEventListener('mousemove', move);

        sliderContainer.addEventListener('mouseleave', end);
        sliderContainer.addEventListener('mouseup', end);


        prevSliderButton.addEventListener('click', () => {
            if(!slides[0].classList.contains('active-slide')) {
                prevSlider()
            }
        })
        nextSliderButton.addEventListener('click', () => {
            if(!slides[slides.length-1].classList.contains('active-slide')) {
                nextSlider()
            }
        })
    })();
    
})()