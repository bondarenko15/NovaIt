
AOS.init({
    once: true,
    offset: 200,
});

if (document.querySelector('[data-fancybox]')) {
    Fancybox.bind('[data-fancybox]', {});
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
/* const lang = document.querySelector('.header-lang');
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
}); */




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









/* var swiper = new Swiper(".mySwiper", {
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
 */

// Forms

document.addEventListener('DOMContentLoaded', () => {
    const modals = {
        main: {
            form: document.getElementById('formModal'),
            thanks: document.getElementById('thanksModal'),
            btns: document.querySelectorAll('.open-modal'),
            formId: 'custom-contact-form-modal'
        },
        demo: {
            form: document.getElementById('modalFormDemo'),
            thanks: document.getElementById('thanksModalDemo'),
            btns: document.querySelectorAll('.open-modalDemo'),
            formId: 'custom-contact-form-demo'
        }
    };

    function openModal(modal) {
        if (!modal) return;
        modal.classList.add('active');
        document.body.classList.add('no-scroll');
        disableScroll();
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.classList.remove('no-scroll');
        enableScroll();
    }
    function disableScroll() {
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.paddingRight = scrollBarWidth + 'px';
        document.body.classList.add('no-scroll');
    }

    function enableScroll() {
        document.body.style.paddingRight = '';
        document.body.classList.remove('no-scroll');
    }
    Object.values(modals).forEach(item => {
        item.btns.forEach(btn => {
            btn.addEventListener('click', () => openModal(item.form));
        });
    });

    document.querySelectorAll('.modal').forEach(modal => {
        modal.querySelector('.modal__close')?.addEventListener('click', () => closeModal(modal));
        modal.querySelector('.modal__overlay')?.addEventListener('click', () => closeModal(modal));
        modal.querySelector('.modal__ok')?.addEventListener('click', () => closeModal(modal));
    });

    document.addEventListener('wpcf7mailsent', (event) => {
        const form = event.target;

        Object.values(modals).forEach(item => {
            if (form.id === item.formId) {
                closeModal(item.form);

                setTimeout(() => {
                    openModal(item.thanks);
                }, 300);

                setTimeout(() => {
                    closeModal(item.thanks);
                }, 4000);
            }
        });
    });
});
const items = document.querySelectorAll('.faq-list .list-item');

items.forEach(item => {
    item.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        items.forEach(el => el.classList.remove('active'));

        if (!isActive) {
            item.classList.add('active');
        }
    });
});

const tabsService = document.querySelectorAll('.block-tabs .block-tab');

tabsService.forEach(item => {
    item.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        tabsService.forEach(el => el.classList.remove('active'));

        if (!isActive) {
            item.classList.add('active');
        }
    });
});

const canvas = document.getElementById('webgl-canvas');
const scene = new THREE.Scene();

// Настройка камеры (угол обзора, соотношение сторон, ближняя/дальняя плоскость отсечения)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// Отдаляем камеру и смотрим более горизонтально (прямо на объект)
camera.position.z = 8;
camera.position.y = 0;
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Оптимизация для Retina экранов
renderer.setClearColor(0x000000, 1);
// Создаем геометрию - делаем ее ЗНАЧИТЕЛЬНО шире (80 вместо 40) и выше, чтобы края точно уходили за экран
const geometry = new THREE.PlaneGeometry(80, 30, 400, 150);

// Шейдеры - это программы, работающие на видеокарте. Они создают форму волны и цвета.

// Вершинный шейдер (Vertex Shader) - отвечает за форму (искривление плоскости)
const vertexShader = `
            uniform float uTime;
            varying vec2 vUv;
            varying float vElevation;
            varying vec3 vWorldPos;

            void main() {
                vUv = uv;
                vec4 modelPosition = modelMatrix * vec4(position, 1.0);
                // Делаем шаг волны больше и саму волну сильнее
                float elevation = sin(modelPosition.x * 0.08 - uTime * 0.2) * 2.5;
                
                // Увеличиваем шаг и силу для искривления дальнего края
                elevation += sin(modelPosition.x * 0.3 - uTime * 0.3) * (vUv.y * 1.5);
                
                // Увеличиваем шаг между волнами по оси Y (в глубину) и делаем перепады более выраженными
                elevation += sin(modelPosition.y * 0.25 + uTime * 0.1) * 1.2;
                
                // Микро-волны для легкой детализации
                elevation += sin(modelPosition.x * 0.2 - uTime * 0.4) * 0.3;
                
                // Применяем высоту к Z координате
                modelPosition.z += elevation;
                
                // Передаем данные во фрагментный шейдер
                vElevation = elevation;
                vWorldPos = modelPosition.xyz;

                gl_Position = projectionMatrix * viewMatrix * modelPosition;
            }
        `;

// Фрагментный шейдер (Fragment Shader) - отвечает за цвет, линии и "стеклянность"
const fragmentShader = `
            uniform float uTime;
            uniform vec3 uColor1;
            uniform vec3 uColor2;
            uniform vec3 uColor3;
            uniform vec3 uColorDark;
            
            varying vec2 vUv;
            varying float vElevation;
            varying vec3 vWorldPos;

            void main() {
                // Искажаем координаты для легкой ряби на нитях (привязываем к мировым координатам)
                vec2 distortedUv = vUv;
                distortedUv.y += sin(vWorldPos.x * 0.2 - uTime * 0.2) * 0.05; 
                
                // Создаем горизонтальные тонкие "стеклянные" полосы
                // Увеличили плотность до 200, так как сама плоскость стала больше
                float lines = sin(distortedUv.y * 200.0);
                lines = smoothstep(0.75, 1.0, lines); 
                
                // Привязываем градиент к мировым координатам (от -20 до +20), 
                // чтобы при расширении плоскости градиент не растягивался за пределы экрана
                float gradX = clamp((vWorldPos.x + 20.0) / 40.0, 0.0, 1.0);
                
                // Создаем красивый градиент по горизонтали
                vec3 gradientColor;
                if (gradX < 0.46) {
                    gradientColor = mix(uColor1, uColor2, gradX / 0.46);
                } else {
                    gradientColor = mix(uColor2, uColor3, (gradX - 0.46) / 0.54);
                }
                
                // Вычисляем затенение
                float depthMix = smoothstep(-2.5, 3.5, vElevation);
                vec3 baseColor = mix(uColorDark, gradientColor, depthMix * 0.5);
                
                // Накладываем цвет на результат
                vec3 finalColor = baseColor;
                
                // Линии
                finalColor += gradientColor * lines * 0.15;
                
                // Легкая цветокоррекция для глубины черного
                finalColor = pow(finalColor, vec3(1.1));

                gl_FragColor = vec4(finalColor, 1.0);
            }
        `;

const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color('#63D9C5') },     // 0% (Бирюзовый)
        uColor2: { value: new THREE.Color('#67B7F8') },     // 46% (Голубой)
        uColor3: { value: new THREE.Color('#9F8DF0') },     // 100% (Фиолетовый)
        uColorDark: { value: new THREE.Color('#010205') }   // Очень темный, почти черный
    },
    transparent: true,
    side: THREE.DoubleSide
});

const mesh = new THREE.Mesh(geometry, material);

mesh.rotation.x = -Math.PI / 3.5;
mesh.rotation.z = -Math.PI / 24; // Легкий наклон по диагонали для динамики
mesh.position.y = -1.2;

scene.add(mesh);

// Функция анимации
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Обновляем время в шейдере для движения волн
    material.uniforms.uTime.value = elapsedTime;

    renderer.render(scene, camera);
}

animate();

// Обработка изменения размера окна браузера
window.addEventListener('resize', () => {
    // Обновляем размеры
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});