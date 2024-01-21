let touchStartX = 0; // начало свайпа

// singleSlider
const singleSliderLine = document.querySelector('.single-slider__line');
const singleSliderSlides = document.querySelectorAll('.single-slider__slide');
const wrapper = document.querySelector('.single-slider__wrapper');
const totalSlides = document.querySelectorAll('.single-slider__slide').length; // кол-во слайдов
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const slideWidth = singleSliderSlides[0].clientWidth; // ширина слайда
let sliderSingleCurrentIndex = 0; // индекс текущего слайда

// multipleSlider
const multipleSliderLine = document.querySelector('.multiple-slider__line');
const multipleSliderSlides = document.querySelectorAll('.multiple-slider__slide');
let multipleSliderLineIndex = 1;
  
// обработчик свайпа для одного слайдера
const handleSingleSliderSwipe = (event) => {
    const touchEndX = event.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;

    if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
            sliderSingleCurrentIndex = (sliderSingleCurrentIndex - 1 + singleSliderSlides.length) % singleSliderSlides.length;
        } else {
            sliderSingleCurrentIndex = (sliderSingleCurrentIndex + 1) % singleSliderSlides.length;
        }
        updateSliderPosition();
    } 
}

// обработчик свайпа для множественных слайдов
const handleMultipleSliderSwipe = (event) => {
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
const setupSingleSlider = () => {    
    const screenWidth = window.innerWidth;

    if(screenWidth >= 800 && screenWidth <= 1440) { // задаем диапазон в котором будет работать свайп
        singleSliderLine.addEventListener('touchstart', (event) => {
            touchStartX = event.touches[0].clientX;
        });
    
        singleSliderLine.addEventListener('touchmove', (event) => {
            event.preventDefault();
        });
    
        singleSliderLine.addEventListener('touchend', handleSingleSliderSwipe);
    }
}

// настройка обработчиков событий для множественных слайдов
const setupMultipleSlider = () => {
    multipleSliderLine.addEventListener('touchstart', (event) => {
        touchStartX = event.touches[0].clientX;
    });

    multipleSliderLine.addEventListener('touchmove', (event) => {
        event.preventDefault();
    });

    multipleSliderLine.addEventListener('touchend', handleMultipleSliderSwipe);
}

// отрисовка слайдера с множественными слайдами
const drawMultipleSlider = () => {
    const newPosition = -multipleSliderLineIndex * multipleSliderSlides[multipleSliderLineIndex]?.offsetWidth + multipleSliderSlides[multipleSliderLineIndex]?.offsetWidth / 2;
    multipleSliderLine.style.transform = `translateX(${newPosition}px)`;
}

// инициализация обоих слайдеров
const initializeSliders = () => {
    setupSingleSlider();
    setupMultipleSlider();
    drawMultipleSlider();
}

nextButton.addEventListener('click', function() { // обработчик на кнопку вперед
    sliderSingleCurrentIndex = (sliderSingleCurrentIndex + 1) % totalSlides; // расчет текущего индекса
    updateSliderPosition();
});

prevButton.addEventListener('click', function() { // обработчик на кнопку назад
    sliderSingleCurrentIndex = (sliderSingleCurrentIndex - 1 + totalSlides) % totalSlides; // расчет текущего индекса
    updateSliderPosition();
});

const updateSliderPosition = () => { // ф-ия отрисовки слайдера
    const newPosition = sliderSingleCurrentIndex * slideWidth; // 
    wrapper.scrollTo({
        left: newPosition,
        behavior: 'smooth'
    });
}

document.addEventListener('DOMContentLoaded', initializeSliders); // инициализируем

window.addEventListener('resize', setupSingleSlider);
