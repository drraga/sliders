let touchStartX = 0;

// singleSlider
const singleSliderLine = document.querySelector('.single-slider__line');
const singleSliderSlides = document.querySelectorAll('.single-slider__slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let sliderSingleCurrentIndex = 0;

// multipleSlider
const multipleSliderLine = document.querySelector('.multiple-slider__line');
const multipleSliderSlides = document.querySelectorAll('.multiple-slider__slide');
let multipleSliderLineIndex = 1;

// обработчик свайпа для одного слайдера
function handleSingleSliderSwipe(event) {
    const touchEndX = event.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;

    if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
            sliderSingleCurrentIndex = (sliderSingleCurrentIndex - 1 + singleSliderSlides.length) % singleSliderSlides.length;
        } else {
            sliderSingleCurrentIndex = (sliderSingleCurrentIndex + 1) % singleSliderSlides.length;
        }
        drawSingleSlider();
    } 
}

// обработчик свайпа для множественных слайдов
function handleMultipleSliderSwipe(event) {
    const touchEndX = event.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;
    
    if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
            multipleSliderLineIndex = (multipleSliderLineIndex - 1 + multipleSliderSlides.length) % multipleSliderSlides.length;
        } else {
            multipleSliderLineIndex = (multipleSliderLineIndex + 1) % multipleSliderSlides.length;
        }
        drawMultipleSlider();
    }
}

// настройка обработчиков событий для слайдера с одним салйдом
function setupSingleSlider() {    
    singleSliderLine.addEventListener('touchstart', (event) => {
        touchStartX = event.touches[0].clientX;
    });

    singleSliderLine.addEventListener('touchmove', (event) => {
        event.preventDefault();
    });

    singleSliderLine.addEventListener('touchend', handleSingleSliderSwipe);

    if (window.innerWidth <= 1024) { // отключаем свайп, включается инерционный скролл
        singleSliderLine.removeEventListener('touchstart', handleTouchStart);
        singleSliderLine.removeEventListener('touchmove', handleTouchMove);
        singleSliderLine.removeEventListener('touchend', handleTouchEnd); 
    }
}

function goNextSlide() {
    sliderSingleCurrentIndex = (sliderSingleCurrentIndex + 1) % singleSliderSlides.length;
    drawSingleSlider();
}

function goPrevSlide() {
    sliderSingleCurrentIndex = (sliderSingleCurrentIndex - 1 + singleSliderSlides.length) % singleSliderSlides.length;
    drawSingleSlider();
}


// настройка обработчиков событий для множественных слайдов
function setupMultipleSlider() {
    multipleSliderLine.addEventListener('touchstart', (event) => {
        touchStartX = event.touches[0].clientX;
    });

    multipleSliderLine.addEventListener('touchmove', (event) => {
        event.preventDefault();
    });

    multipleSliderLine.addEventListener('touchend', handleMultipleSliderSwipe);
}

// отрисовка слайдера с одним слайдом
function drawSingleSlider() {
    const newPosition = -sliderSingleCurrentIndex * singleSliderSlides[sliderSingleCurrentIndex]?.offsetWidth;
    singleSliderLine.style.transform = `translateX(${newPosition}px)`;
}

// отрисовка слайдера с множественными слайдами
function drawMultipleSlider() {
    const newPosition = -multipleSliderLineIndex * multipleSliderSlides[multipleSliderLineIndex]?.offsetWidth + multipleSliderSlides[multipleSliderLineIndex]?.offsetWidth / 2;
    multipleSliderLine.style.transform = `translateX(${newPosition}px)`;
}

// инициализация обоих слайдеров
function initializeSliders() {
    setupSingleSlider();
    setupMultipleSlider();
    drawMultipleSlider();
}

document.addEventListener('DOMContentLoaded', initializeSliders);
prevButton.addEventListener('click', goPrevSlide);
nextButton.addEventListener('click', goNextSlide);


// function handleWindowResize() {
//     if (window.innerWidth <= 1024) {
//         console.log('Ширина окна меньше или равна 1024 пикселей.');
//     } else {
//         console.log('Ширина окна больше 1024 пикселей.');
//     }
// }

// Добавляем слушатель события resize
window.addEventListener('resize', setupSingleSlider);

