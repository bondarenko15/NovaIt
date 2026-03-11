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




//Header lang 
const lang = document.querySelector('.header-lang');
const current = document.querySelector('.current-lang');

current.addEventListener('click', (e) => {
    e.stopPropagation();
    lang.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!lang.contains(e.target)) {
        lang.classList.remove('active');
    }
});


//Slider Partners

const partnerSlider = new Swiper('.partners-slider', {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    autoplay: true,
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
    },
    breakpoints: {
        648: { slidesPerView: 4, spaceBetween: 40 },
        1366: { slidesPerView: 6, spaceBetween: 60 },
    }
});