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
let info = {
    'sliderContent' : [
        {
            "title" : "lorem",
            "text" : `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste velit qui vero. Molestiae, reprehenderit. Ex beatae veniam totam tempora cupiditate ipsam mollitia illum eos. A, ipsam. Quos, ex. Saepe, quisquam.
            Enim aperiam, laborum eos iusto rem id? Sapiente blanditiis dolor vitae perspiciatis modi, natus maiores minus. Rerum molestiae magnam ducimus qui. Numquam consequuntur dolor quis assumenda itaque reiciendis nobis ipsum.
            Voluptates minima nulla, harum dolorum, delectus similique laborum sed ratione blanditiis corrupti possimus quasi officiis illo perferendis. Nihil voluptatem voluptate reprehenderit nam eaque possimus repellendus laboriosam minus, deleniti necessitatibus sint!
            Culpa quos omnis, sequi earum aliquam quidem voluptates obcaecati quaerat, odit explicabo nesciunt iste blanditiis expedita soluta at deleniti eos maiores animi! Eos excepturi tempore laboriosam molestias suscipit voluptatum dicta?
            Enim deleniti necessitatibus, explicabo voluptatibus inventore adipisci dolorum est! Temporibus commodi, optio minima minus magnam nobis animi, ducimus pariatur quidem, dicta libero? Error, aliquid atque. Deserunt dolorum a at provident?`
        },

        {
            "title" : "lorem",
            "text" : `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste velit qui vero. Molestiae, reprehenderit. Ex beatae veniam totam tempora cupiditate ipsam mollitia illum eos. A, ipsam. Quos, ex. Saepe, quisquam.
            Enim aperiam, laborum eos iusto rem id? Sapiente blanditiis dolor vitae perspiciatis modi, natus maiores minus. Rerum molestiae magnam ducimus qui. Numquam consequuntur dolor quis assumenda itaque reiciendis nobis ipsum.
            Voluptates minima nulla, harum dolorum, delectus similique laborum sed ratione blanditiis corrupti possimus quasi officiis illo perferendis. Nihil voluptatem voluptate reprehenderit nam eaque possimus repellendus laboriosam minus, deleniti necessitatibus sint!
            Culpa quos omnis, sequi earum aliquam quidem voluptates obcaecati quaerat, odit explicabo nesciunt iste blanditiis expedita soluta at deleniti eos maiores animi! Eos excepturi tempore laboriosam molestias suscipit voluptatum dicta?
            Enim deleniti necessitatibus, explicabo voluptatibus inventore adipisci dolorum est! Temporibus commodi, optio minima minus magnam nobis animi, ducimus pariatur quidem, dicta libero? Error, aliquid atque. Deserunt dolorum a at provident?`
        },
        {
            "title" : "lorem",
            "text" : `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste velit qui vero. Molestiae, reprehenderit. Ex beatae veniam totam tempora cupiditate ipsam mollitia illum eos. A, ipsam. Quos, ex. Saepe, quisquam.
            Enim aperiam, laborum eos iusto rem id? Sapiente blanditiis dolor vitae perspiciatis modi, natus maiores minus. Rerum molestiae magnam ducimus qui. Numquam consequuntur dolor quis assumenda itaque reiciendis nobis ipsum.
            Voluptates minima nulla, harum dolorum, delectus similique laborum sed ratione blanditiis corrupti possimus quasi officiis illo perferendis. Nihil voluptatem voluptate reprehenderit nam eaque possimus repellendus laboriosam minus, deleniti necessitatibus sint!
            Culpa quos omnis, sequi earum aliquam quidem voluptates obcaecati quaerat, odit explicabo nesciunt iste blanditiis expedita soluta at deleniti eos maiores animi! Eos excepturi tempore laboriosam molestias suscipit voluptatum dicta?
            Enim deleniti necessitatibus, explicabo voluptatibus inventore adipisci dolorum est! Temporibus commodi, optio minima minus magnam nobis animi, ducimus pariatur quidem, dicta libero? Error, aliquid atque. Deserunt dolorum a at provident?`
        },
        {
            "title" : "lorem",
            "text" : `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste velit qui vero. Molestiae, reprehenderit. Ex beatae veniam totam tempora cupiditate ipsam mollitia illum eos. A, ipsam. Quos, ex. Saepe, quisquam.
            Enim aperiam, laborum eos iusto rem id? Sapiente blanditiis dolor vitae perspiciatis modi, natus maiores minus. Rerum molestiae magnam ducimus qui. Numquam consequuntur dolor quis assumenda itaque reiciendis nobis ipsum.
            Voluptates minima nulla, harum dolorum, delectus similique laborum sed ratione blanditiis corrupti possimus quasi officiis illo perferendis. Nihil voluptatem voluptate reprehenderit nam eaque possimus repellendus laboriosam minus, deleniti necessitatibus sint!
            Culpa quos omnis, sequi earum aliquam quidem voluptates obcaecati quaerat, odit explicabo nesciunt iste blanditiis expedita soluta at deleniti eos maiores animi! Eos excepturi tempore laboriosam molestias suscipit voluptatum dicta?
            Enim deleniti necessitatibus, explicabo voluptatibus inventore adipisci dolorum est! Temporibus commodi, optio minima minus magnam nobis animi, ducimus pariatur quidem, dicta libero? Error, aliquid atque. Deserunt dolorum a at provident?`
        },
        {
            "title" : "lorem",
            "text" : `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste velit qui vero. Molestiae, reprehenderit. Ex beatae veniam totam tempora cupiditate ipsam mollitia illum eos. A, ipsam. Quos, ex. Saepe, quisquam.
            Enim aperiam, laborum eos iusto rem id? Sapiente blanditiis dolor vitae perspiciatis modi, natus maiores minus. Rerum molestiae magnam ducimus qui. Numquam consequuntur dolor quis assumenda itaque reiciendis nobis ipsum.
            Voluptates minima nulla, harum dolorum, delectus similique laborum sed ratione blanditiis corrupti possimus quasi officiis illo perferendis. Nihil voluptatem voluptate reprehenderit nam eaque possimus repellendus laboriosam minus, deleniti necessitatibus sint!
            Culpa quos omnis, sequi earum aliquam quidem voluptates obcaecati quaerat, odit explicabo nesciunt iste blanditiis expedita soluta at deleniti eos maiores animi! Eos excepturi tempore laboriosam molestias suscipit voluptatum dicta?
            Enim deleniti necessitatibus, explicabo voluptatibus inventore adipisci dolorum est! Temporibus commodi, optio minima minus magnam nobis animi, ducimus pariatur quidem, dicta libero? Error, aliquid atque. Deserunt dolorum a at provident?`
        },
        {
            "title" : "lorem",
            "text" : `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste velit qui vero. Molestiae, reprehenderit. Ex beatae veniam totam tempora cupiditate ipsam mollitia illum eos. A, ipsam. Quos, ex. Saepe, quisquam.
            Enim aperiam, laborum eos iusto rem id? Sapiente blanditiis dolor vitae perspiciatis modi, natus maiores minus. Rerum molestiae magnam ducimus qui. Numquam consequuntur dolor quis assumenda itaque reiciendis nobis ipsum.
            Voluptates minima nulla, harum dolorum, delectus similique laborum sed ratione blanditiis corrupti possimus quasi officiis illo perferendis. Nihil voluptatem voluptate reprehenderit nam eaque possimus repellendus laboriosam minus, deleniti necessitatibus sint!
            Culpa quos omnis, sequi earum aliquam quidem voluptates obcaecati quaerat, odit explicabo nesciunt iste blanditiis expedita soluta at deleniti eos maiores animi! Eos excepturi tempore laboriosam molestias suscipit voluptatum dicta?
            Enim deleniti necessitatibus, explicabo voluptatibus inventore adipisci dolorum est! Temporibus commodi, optio minima minus magnam nobis animi, ducimus pariatur quidem, dicta libero? Error, aliquid atque. Deserunt dolorum a at provident?`
        },

        {
            "title" : "lorem",
            "text" : `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste velit qui vero. Molestiae, reprehenderit. Ex beatae veniam totam tempora cupiditate ipsam mollitia illum eos. A, ipsam. Quos, ex. Saepe, quisquam.
            Enim aperiam, laborum eos iusto rem id? Sapiente blanditiis dolor vitae perspiciatis modi, natus maiores minus. Rerum molestiae magnam ducimus qui. Numquam consequuntur dolor quis assumenda itaque reiciendis nobis ipsum.
            Voluptates minima nulla, harum dolorum, delectus similique laborum sed ratione blanditiis corrupti possimus quasi officiis illo perferendis. Nihil voluptatem voluptate reprehenderit nam eaque possimus repellendus laboriosam minus, deleniti necessitatibus sint!
            Culpa quos omnis, sequi earum aliquam quidem voluptates obcaecati quaerat, odit explicabo nesciunt iste blanditiis expedita soluta at deleniti eos maiores animi! Eos excepturi tempore laboriosam molestias suscipit voluptatum dicta?
            Enim deleniti necessitatibus, explicabo voluptatibus inventore adipisci dolorum est! Temporibus commodi, optio minima minus magnam nobis animi, ducimus pariatur quidem, dicta libero? Error, aliquid atque. Deserunt dolorum a at provident?`
        },
        {
            "title" : "lorem",
            "text" : `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste velit qui vero. Molestiae, reprehenderit. Ex beatae veniam totam tempora cupiditate ipsam mollitia illum eos. A, ipsam. Quos, ex. Saepe, quisquam.
            Enim aperiam, laborum eos iusto rem id? Sapiente blanditiis dolor vitae perspiciatis modi, natus maiores minus. Rerum molestiae magnam ducimus qui. Numquam consequuntur dolor quis assumenda itaque reiciendis nobis ipsum.
            Voluptates minima nulla, harum dolorum, delectus similique laborum sed ratione blanditiis corrupti possimus quasi officiis illo perferendis. Nihil voluptatem voluptate reprehenderit nam eaque possimus repellendus laboriosam minus, deleniti necessitatibus sint!
            Culpa quos omnis, sequi earum aliquam quidem voluptates obcaecati quaerat, odit explicabo nesciunt iste blanditiis expedita soluta at deleniti eos maiores animi! Eos excepturi tempore laboriosam molestias suscipit voluptatum dicta?
            Enim deleniti necessitatibus, explicabo voluptatibus inventore adipisci dolorum est! Temporibus commodi, optio minima minus magnam nobis animi, ducimus pariatur quidem, dicta libero? Error, aliquid atque. Deserunt dolorum a at provident?`
        },
        {
            "title" : "lorem",
            "text" : `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste velit qui vero. Molestiae, reprehenderit. Ex beatae veniam totam tempora cupiditate ipsam mollitia illum eos. A, ipsam. Quos, ex. Saepe, quisquam.
            Enim aperiam, laborum eos iusto rem id? Sapiente blanditiis dolor vitae perspiciatis modi, natus maiores minus. Rerum molestiae magnam ducimus qui. Numquam consequuntur dolor quis assumenda itaque reiciendis nobis ipsum.
            Voluptates minima nulla, harum dolorum, delectus similique laborum sed ratione blanditiis corrupti possimus quasi officiis illo perferendis. Nihil voluptatem voluptate reprehenderit nam eaque possimus repellendus laboriosam minus, deleniti necessitatibus sint!
            Culpa quos omnis, sequi earum aliquam quidem voluptates obcaecati quaerat, odit explicabo nesciunt iste blanditiis expedita soluta at deleniti eos maiores animi! Eos excepturi tempore laboriosam molestias suscipit voluptatum dicta?
            Enim deleniti necessitatibus, explicabo voluptatibus inventore adipisci dolorum est! Temporibus commodi, optio minima minus magnam nobis animi, ducimus pariatur quidem, dicta libero? Error, aliquid atque. Deserunt dolorum a at provident?`
        },
        {
            "title" : "lorem",
            "text" : `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste velit qui vero. Molestiae, reprehenderit. Ex beatae veniam totam tempora cupiditate ipsam mollitia illum eos. A, ipsam. Quos, ex. Saepe, quisquam.
            Enim aperiam, laborum eos iusto rem id? Sapiente blanditiis dolor vitae perspiciatis modi, natus maiores minus. Rerum molestiae magnam ducimus qui. Numquam consequuntur dolor quis assumenda itaque reiciendis nobis ipsum.
            Voluptates minima nulla, harum dolorum, delectus similique laborum sed ratione blanditiis corrupti possimus quasi officiis illo perferendis. Nihil voluptatem voluptate reprehenderit nam eaque possimus repellendus laboriosam minus, deleniti necessitatibus sint!
            Culpa quos omnis, sequi earum aliquam quidem voluptates obcaecati quaerat, odit explicabo nesciunt iste blanditiis expedita soluta at deleniti eos maiores animi! Eos excepturi tempore laboriosam molestias suscipit voluptatum dicta?
            Enim deleniti necessitatibus, explicabo voluptatibus inventore adipisci dolorum est! Temporibus commodi, optio minima minus magnam nobis animi, ducimus pariatur quidem, dicta libero? Error, aliquid atque. Deserunt dolorum a at provident?`
        }
    ]
}
let bannerFirstBackgroundText = document.querySelector('.banner__first-background-text')
let swiperWrapper = document.querySelector('.swiper-wrapper')
for (let i = 0; i < info['sliderContent'].length; i++) {
    let swiperSlide = document.createElement('div')
    swiperSlide.classList.add('swiper-slide')
    let bannerContent = document.createElement('div')
    bannerContent.classList.add('banner__content')
    bannerContent.innerHTML = `
    <div class="banner__title-container">
        <h1 class="banner__title">${info['sliderContent'][i]['title']}</h1>
    </div>
    <div class="banner__text-container">
        <p class="banner__text">${info['sliderContent'][i]['text']}</p>
    </div>
    `
    swiperSlide.appendChild(bannerContent)
    swiperWrapper.appendChild(swiperSlide)
}

let swiperSliders = document.querySelectorAll('.swiper-slide')




let swiperPaginationBullets = document.querySelectorAll('swiper-pagination-bullet')
bannerFirstBackgroundText.innerHTML = '01'
// for (let i = 0; i < swiperPaginationBullet.length; i++) {
//     swiperPaginationBullet[i].addEventListener('click', () => {
//         bannerFirstBackgroundText.innerHTML = `0${i+1}`
//     })
    
// }
console.log('luck1')
swiperPaginationBullets.forEach((el,i)=> {
    el.addEventListener('click', () => {
        bannerFirstBackgroundText.innerHTML = `0${i+1}`
        console.log('luck')
    })
})
let sliderDirection = 'vertical'
window.addEventListener('resize', () => {
    if(window.innerWidth <= 1000) {
        sliderDirection = 'horizontal'
    }
})

var swiper = new Swiper('.swiper-container', {
    direction: `${sliderDirection}`,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
//   swiper.direction = "horizontal"
console.log(swiper.direction)