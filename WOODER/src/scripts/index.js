// hamburger

let hamburger = document.querySelector('.header__hamburger')
let hamburgerMenuText = document.querySelector('.header__hamburger-text')
let hamburgerMenu = document.querySelector('.header__hamburger-menu')
let headerCloseSign = document.querySelector('.header__toggle-menu-cross-sign')
let pageBody = document.querySelector('.page__body')
hamburger.addEventListener('click', ()=> {
    pageBody.classList.add('opacity_off')
    hamburgerMenu.style.cursor = "auto"
    setTimeout(() => {
        hamburgerMenu.classList.add('active') 
        
        pageBody.classList.remove('opacity_off')
        }, 500);
        
})

hamburgerMenuText.addEventListener('click', ()=> {
    pageBody.classList.add('opacity_off')
    hamburgerMenu.style.cursor = "auto"
    setTimeout(() => {
        hamburgerMenu.classList.add('active') 
        
        pageBody.classList.remove('opacity_off')
        }, 500);
})

headerCloseSign.addEventListener('click', () => {
    pageBody.classList.add('opacity_off')
    setTimeout(() => {
        hamburgerMenu.classList.remove('active')
        pageBody.classList.remove('opacity_off')
        }, 500);
    hamburgerMenu.style.cursor = "pointer"
})