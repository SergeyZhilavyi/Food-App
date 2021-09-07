function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

    const slides = document.querySelectorAll(slide),
              slider = document.querySelector(container), //Для навигации
              leftSlide = document.querySelector(prevArrow),
              nextSlide = document.querySelector(nextArrow),
              current = document.querySelector(currentCounter),
              total = document.querySelector(totalCounter),
              sliderWrapper = document.querySelector(wrapper),
              sliderInner = document.querySelector(field),
              width = window.getComputedStyle(sliderWrapper).width;

        let slideIndex = 1;
        let offset = 0;
        

        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
            current.textContent = `0${slideIndex}`;
        } else {
            total.textContent = slides.length;
            current.textContent = slideIndex;
        }

        sliderInner.style.width = 100 * slides.length + '%';
        

        
        sliderInner.style.display = 'flex';
        sliderInner.style.transition = '0.5s all';

        //Теперь скрываем элементы, которые не попадают в область видимости 
        sliderWrapper.style.overflow = 'hidden';

         
        slides.forEach(slide => {
            slide.style.width = width;
        }); // Задаём слайдам одинаковую ширину

        //Навигация
        slider.style.position = 'relative';

        const indicators = document.createElement('ol'), 
              dots = []; // сюда будем помещать наши точки, для более удобной манипуляции ими 
        indicators.classList.add('carousel-indicators');
        indicators.style.cssText = `
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 15;
            display: flex;
            justify-content: center;
            margin-right: 15%;
            margin-left: 15%;
            list-style: none;
        `;
        slider.append(indicators);

        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('li');
            dot.setAttribute('data-slide-to', i + 1); 

            dot.style.cssText = `
                box-sizing: content-box;
                flex: 0 1 auto;
                width: 30px;
                height: 6px;
                margin-right: 3px;
                margin-left: 3px;
                cursor: pointer;
                background-color: #fff;
                background-clip: padding-box;
                border-top: 10px solid transparent;
                border-bottom: 10px solid transparent;
                opacity: .5;
                transition: opacity .6s ease;
            `;

            if (i == 0) {
                dot.style.opacity = 1; //Класс активности для первой точки 
            }
            indicators.append(dot);
            dots.push(dot); 
        }
        //Конец навигации 

        function CurrentGetZero() {

            if ( slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

        } 

        function dotsDefaultValue() {

            dots.forEach(dot => dot.style.opacity = '.5'); // Стили по - умолчанию
            dots[slideIndex - 1].style.opacity = 1; 

        } 

        function sliderInnerTransform() {

            sliderInner.style.transform = `translateX(-${offset}px)`;
        } 

        function deleteNotDigits(str) {
            return +str.replace(/\D/g, '');
        }

        nextSlide.addEventListener('click', () => {

            if (offset == deleteNotDigits(width) * (slides.length -1)) {
                offset = 0; //Когда долистали до самого конца - возвращаемся вначало
            } else { //Если у нас это не последний слайд то добавляем смещение
                offset += deleteNotDigits(width);
            }
            
    // Мы воспользуемся обратным символьным  классом \D, чтобы выбрать все "не числа" и преобразовать их в пустое место

            sliderInnerTransform();

            if (slideIndex == slides.length) {
                slideIndex = 1;
            } else {
                slideIndex++; 
            }

            CurrentGetZero();

            dotsDefaultValue();
        });


        leftSlide.addEventListener('click', () => {

            if (offset == 0) {
                offset = deleteNotDigits(width) * (slides.length - 1);
            } else { 
                offset -= deleteNotDigits(width);
            }
            

            sliderInnerTransform();

            if (slideIndex == 1) { 
                slideIndex = slides.length;//При клике на кнопку предыдущего слайда  смещаемся в самый конец 
            } else {
                slideIndex--; 
            }

            CurrentGetZero();

            dotsDefaultValue();
        });

            //Добавим функционал нашим точкам. Чтобы при клике они тоже перемещали слайды
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideTo = e.target.getAttribute('data-slide-to');

                slideIndex = slideTo; 
                offset = deleteNotDigits(width) * (slideTo - 1);

                sliderInnerTransform();

                CurrentGetZero();

                dotsDefaultValue();
            });
        });
}

export default slider;