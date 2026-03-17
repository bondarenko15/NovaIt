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

const select = document.querySelector('select') || null;
if (select) {
    select.addEventListener('change', () => {
        select.blur();
    });
};



//Header lang 
const lang = document.querySelector('.header-lang');
const current = document.querySelector('.current-lang');

current.addEventListener('click', (e) => {
    e.stopPropagation();
    if (window.innerWidth <= 1366) {
        lang.classList.toggle('active');
    }
});

document.addEventListener('click', (e) => {
    if (window.innerWidth <= 1366) {
        if (!lang.contains(e.target)) {
            lang.classList.remove('active');
        }
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 1366) {
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


//Slider review

const sliderReview = new Swiper('.slider-review', {
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    spaceBetween: 30,
    initialSlide: 1,
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
    }
});


//Tabs

const tabs = document.querySelectorAll('.tab-item');
const contents = document.querySelectorAll('.block-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabId = tab.dataset.tab;
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        contents.forEach(c => c.classList.remove('active'));
        document.querySelector(`.block-content[data-tab="${tabId}"]`).classList.add('active');
    });
});



//mobile menu

const burger = document.querySelector('.header-burger');
const close = document.querySelector('.close-menu');
const mobileMenu = document.querySelector('.mobile-menu');
const arrows = document.querySelectorAll('.nav-arrow');
const nav = document.querySelector('nav');

burger.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.classList.add('no-scroll');
});

close.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.classList.remove('no-scroll');
});


arrows.forEach(arrow => {
    arrow.addEventListener('click', (e) => {
        e.preventDefault();

        const parent = arrow.closest('li');
        const list = parent.querySelector('.nav-list');
        const isOpen = parent.classList.contains('open');


        document.querySelectorAll('li.open').forEach(el => el.classList.remove('open'));
        document.querySelectorAll('.nav-list').forEach(el => el.classList.remove('open'));


        if (!isOpen) {
            parent.classList.add('open');
            list.classList.add('open');
        }
    });
});

document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
        document.querySelectorAll('li.open').forEach(el => el.classList.remove('open'));
        document.querySelectorAll('.nav-list').forEach(el => el.classList.remove('open'));
    }
});