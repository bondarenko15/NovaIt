AOS.init();


const searchToggle = document.querySelector('.search-active');
const headerSearch = document.querySelector('.header-search');
const searchInput = headerSearch.querySelector('input');

searchToggle.addEventListener('click', () => {
    const isOpen = headerSearch.classList.toggle('open');

    if (!isOpen) {
        searchInput.value = '';
    }
});

//Header scroll 

let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScroll) {
        header.classList.add('hide');
    } else {
        header.classList.remove('hide');
    }

    lastScroll = currentScroll;
});