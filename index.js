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
  
// слайдер с одним слайдом. Ф-ия отрисовки слайда
const handleSingleSliderSwipe = (event) => {
    if(window.innerWidth >= 768) {
        return // не обрабатываем свайп на  экранах с разрешением больше 768px
    } else {
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
}

// слайдер с одним слайдом. Обработчиков событий swipe
const setupSingleSlider = () => {    
        singleSliderLine.addEventListener('touchstart', (event) => {
            touchStartX = event.touches[0].clientX;
        });
    
        singleSliderLine.addEventListener('touchmove', (event) => {
            event.preventDefault();
        });
    
        singleSliderLine.addEventListener('touchend', handleSingleSliderSwipe);
}

// слайдер с одним слайдом. Отрисовка для TranslateX при клике
const updateSliderTranslate = () => {
    const sigleSlideWidthOfElement = document.getElementsByClassName('single-slider__slide')[0].offsetWidth
    const newPosition = - sliderSingleCurrentIndex * sigleSlideWidthOfElement;
    singleSliderLine.style.transform = `translateX(${newPosition}px)`
}

// слайдер с одним слайдом. отрисовка при свайпе
const updateSliderPosition = () => {
    const sigleSlideWidthOfElement = document.getElementsByClassName('single-slider__slide')[0].offsetWidth // лайв коллекция элементов
    console.log('отработала ф-ия свайпа', sigleSlideWidthOfElement);
    const newPosition = sliderSingleCurrentIndex * sigleSlideWidthOfElement; // 
    wrapper.scrollTo({
        left: newPosition,
        behavior: 'smooth'
    });
}

// слайдер с одним слайдом, обработчик событий для кнопки следующего слайда с использованием translate
nextButton.addEventListener('click', function() { 
    sliderSingleCurrentIndex = (sliderSingleCurrentIndex + 1) % totalSlides;
    updateSliderTranslate();
});

// слайдер с одним слайдом, обработчик для кнопки предыдущего слайда с использованием translate
prevButton.addEventListener('click', function() {
    sliderSingleCurrentIndex = (sliderSingleCurrentIndex - 1 + totalSlides) % totalSlides;
    updateSliderTranslate();
});

// слайдер с множественными слайдами. Ф-ия отрисовки свайпа
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

// слайдер с множественными слайдами. отрисовка c использованием translate
const drawMultipleSlider = () => {
    const newPosition = -multipleSliderLineIndex * multipleSliderSlides[multipleSliderLineIndex]?.offsetWidth + multipleSliderSlides[multipleSliderLineIndex]?.offsetWidth / 2;
    multipleSliderLine.style.transform = `translateX(${newPosition}px)`;
}

// слайдер с множественными слайдами. Настройка обработчиков событий для множественных слайдов
const setupMultipleSlider = () => {
    multipleSliderLine.addEventListener('touchstart', (event) => {
        touchStartX = event.touches[0].clientX;
    });

    multipleSliderLine.addEventListener('touchmove', (event) => {
        event.preventDefault();
    });

    multipleSliderLine.addEventListener('touchend', handleMultipleSliderSwipe);
}

// инициализация обоих слайдеров
const initializeSliders = () => {
    setupSingleSlider();
    setupMultipleSlider();
    drawMultipleSlider();
}
// установим слушатель на событие загрузки для инициализации слайдеров
document.addEventListener('DOMContentLoaded', initializeSliders); // инициализируем

// слушатель для resize window
window.addEventListener('resize', () => {
    sliderSingleCurrentIndex = 0; // сбрасываем индекс
    setTimeout(()=> { // используем, чтобы отрисовка произошла после окончания resize
        updateSliderPosition(); // возвращаем в изначальное положение скролл
        updateSliderTranslate(); // возвращаем в изначальное положение translate
    }, 1500) // 1,5  секунды на выполнение resize
});
