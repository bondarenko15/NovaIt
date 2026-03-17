AOS.init();
const fancyBox = document.querySelector('.certificates') || null;
if (fancyBox) {
    Fancybox.bind("[data-fancybox]", {});
}


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
        header.classList.add('scroll');
    } else {
        header.classList.remove('scroll');
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




window.addEventListener('scroll', () => {
    if (window.scrollY >= 10) {
        header.classList.add('scroll');
    } else {
        header.classList.remove('scroll');
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


const container = document.querySelector('.scroll-blocks');
const cards = document.querySelectorAll('.scroll-block');

function updateContainerHeight() {
    let maxBottom = 0;

    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const bottom = rect.bottom - containerRect.top;

        if (bottom > maxBottom) {
            maxBottom = bottom;
        }
    });

    container.style.height = maxBottom + 'px';
}

updateContainerHeight();
window.addEventListener('resize', updateContainerHeight);






gsap.registerPlugin(ScrollTrigger);


document.addEventListener('DOMContentLoaded', () => {

    const section = document.querySelector(".scroll-blocks");
    const inner = document.querySelector(".scroll-inner"); // обертка карточек
    const cards = gsap.utils.toArray(".scroll-block");
    const cardHeight = cards[0].offsetHeight;
    const totalHeight = cardHeight * cards.length;

    // фиксируем блок по центру на время скролла карточек
    ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${totalHeight}`,
        pin: inner, // фиксируем только обертку с карточками
        pinSpacing: true, // оставляем место, чтобы страница скроллилась дальше
    });

    // анимация карточек
    cards.forEach((card, i) => {
        card.style.zIndex = cards.length - i;

        gsap.to(card, {
            y: -cardHeight,
            opacity: 0,
            scrollTrigger: {
                trigger: section,
                start: () => `top top+=${i * cardHeight}`,
                end: () => `+=${cardHeight}`,
                scrub: true,
            }
        });
    });
});