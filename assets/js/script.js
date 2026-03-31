
AOS.init({
    once: true,
    offset: 200,
});

const fancyBox = document.querySelector('.certificates') || null;
if (fancyBox) {
    Fancybox.bind("[data-fancybox]", {});
}
const fancyBox2 = document.querySelector('.service-banner') || null;
if (fancyBox2) {
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
const mobileMenu = document.querySelector('.mobile-menu');
const close = document.querySelector('.close-menu');
const arrows = document.querySelectorAll('.nav-arrow');
const nav = document.querySelector('nav');

if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        document.body.classList.add('no-scroll');
    });
}

if (close && mobileMenu) {
    close.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.classList.remove('no-scroll');
    });
}

arrows.forEach(arrow => {
    arrow.addEventListener('click', (e) => {
        e.preventDefault();
        const parent = arrow.closest('li');
        const list = parent?.querySelector('.nav-list');
        const isOpen = parent?.classList.contains('open');

        document.querySelectorAll('li.open').forEach(el => el.classList.remove('open'));
        document.querySelectorAll('.nav-list.open').forEach(el => el.classList.remove('open'));

        if (!isOpen && parent && list) {
            parent.classList.add('open');
            list.classList.add('open');
        }
    });
});

if (nav) {
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target)) {
            document.querySelectorAll('li.open').forEach(el => el.classList.remove('open'));
            document.querySelectorAll('.nav-list.open').forEach(el => el.classList.remove('open'));
        }
    });
}









var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 1,
    autoHeight: true,
    spaceBetween: 50,
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    breakpoints: {
        960: {
            spaceBetween: 80,
        },
        1366: {
            slidesPerView: 'auto',
            spaceBetween: 40,
        },
    },
    pagination: {
        el: ".swiper-pagination",
    },
    observer: true,
    observeParents: true,
    slideToClickedSlide: true,
});

swiper.on('slideChange', () => {
    let maxHeight = 0;
    swiper.slides.forEach(slide => {
        const h = slide.offsetHeight;
        if (h > maxHeight) maxHeight = h;
    });
    swiper.el.style.height = maxHeight + 'px';
});


// Forms

document.addEventListener('DOMContentLoaded', () => {
    const formModal = document.getElementById('formModal');
    const thanksModal = document.getElementById('thanksModal');
    const openBtn = document.querySelector('.open-modal');

    const isContactsPage = document.getElementById('custom-contact-form') !== null;

    function openModal(modal) {
        modal.classList.add('active');
        document.body.classList.add('no-scroll');
    }

    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }

    if (openBtn && !isContactsPage) {
        openBtn.addEventListener('click', () => openModal(formModal));
    }

    document.querySelectorAll('.modal').forEach(modal => {
        const closeBtn = modal.querySelector('.modal__close');
        const overlay = modal.querySelector('.modal__overlay');
        const okBtn = modal.querySelector('.modal__ok');

        if (closeBtn) closeBtn.addEventListener('click', () => closeModal(modal));
        if (overlay) overlay.addEventListener('click', () => closeModal(modal));
        if (okBtn) okBtn.addEventListener('click', () => closeModal(modal));
    });

    document.addEventListener('wpcf7mailsent', (event) => {
        const form = event.target;
        if (form.id === 'custom-contact-form-modal') {
            closeModal(formModal);
            setTimeout(() => openModal(thanksModal), 300);
        }

        if (form.classList.contains('custom-contact-form')) {
            openModal(thanksModal);
        }

        setTimeout(() => {
            closeModal(thanksModal);
        }, 4000);
    });
});