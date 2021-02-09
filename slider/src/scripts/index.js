(() => {
    let sliderSlides = document.querySelectorAll('.slider__slide'),
        sliderPagination = document.querySelector('.slider__pagination'),
        slides = document.querySelector('#slides'),
        slider = document.querySelector('.slider'),
        pressed = false,
        startX,
        scrollLeft
     



    const end = (e) => {
       pressed = false;
       slides.classList.remove('active')
    }

    const start = (e) => {
        slides.classList.add('active')
        pressed = true;
        startX = e.offsetX;
        scrollLeft = slides.scrollLeft;
    }

    const move = (e) => {
        if(!pressed) return;
        e.preventDefault();
       const  x = e.pageX;
       const dist = x - startX;
        slides.scrollLeft = scrollLeft - dist;
        
    }


    (() => {
        slider.addEventListener('mousedown', start);
        slider.addEventListener('touchstart', start);
    
        slider.addEventListener('mousemove', move);
        slider.addEventListener('touchmove', move);
    
        slider.addEventListener('mouseleave', end);
        slider.addEventListener('mouseup', end);
        slider.addEventListener('touchend', end);
    })();
    
})()