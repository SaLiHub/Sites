// hamburger

let hamburger = document.querySelector('.header__hamburger')
let hamburgerMenuText = document.querySelector('.header__hamburger-text')
let hamburgerMenu = document.querySelector('.header__hamburger-menu')


hamburger.addEventListener('click', ()=> {
    hamburgerMenu.classList.add('active')
    hamburgerMenu.style.cursor = "auto"
})

hamburgerMenuText.addEventListener('click', ()=> {
    hamburgerMenu.classList.add('active')
    hamburgerMenu.style.cursor = "auto"
})
