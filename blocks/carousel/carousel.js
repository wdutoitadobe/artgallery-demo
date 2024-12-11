import { fetchPlaceholders } from '../../scripts/aem.js';
import { carouselWrapperHtml } from './carousel-wrapper-html.js';
import { carouselItemHtml } from './carousel-item-html.js';

function updateActiveSlide(slide) {
    const block = slide.closest('.carousel');
    const slideIndex = parseInt(slide.dataset.slideIndex, 10);
    block.dataset.activeSlide = slideIndex;

    const slides = block.querySelectorAll('.carousel-slide');

    slides.forEach((aSlide, idx) => {
        aSlide.setAttribute('aria-hidden', idx !== slideIndex);
        aSlide.querySelectorAll('a').forEach((link) => {
            if (idx !== slideIndex) {
                link.setAttribute('tabindex', '-1');
            } else {
                link.removeAttribute('tabindex');
            }
        });
    });

    const indicators = block.querySelectorAll('.carousel-slide-indicator');
    indicators.forEach((indicator, idx) => {
        if (idx !== slideIndex) {
            indicator.querySelector('button').removeAttribute('disabled');
        } else {
            indicator.querySelector('button').setAttribute('disabled', 'true');
        }
    });
}

function showSlide(block, slideIndex = 0) {
    const slides = block.querySelectorAll('.carousel-slide');
    let realSlideIndex = slideIndex < 0 ? slides.length - 1 : slideIndex;
    if (slideIndex >= slides.length) realSlideIndex = 0;
    const activeSlide = slides[realSlideIndex];

    activeSlide.querySelectorAll('a').forEach((link) => link.removeAttribute('tabindex'));
    block.querySelector('.carousel-slides').scrollTo({
        top: 0,
        left: activeSlide.offsetLeft,
        behavior: 'smooth',
    });
}

function bindEvents(block) {
    const slideIndicators = block.querySelector('.carousel-slide-indicators');
    if (!slideIndicators) return;

    slideIndicators.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', (e) => {
            const slideIndicator = e.currentTarget.parentElement;
            showSlide(block, parseInt(slideIndicator.dataset.targetSlide, 10));
        });
    });

    block.querySelector('.slide-prev').addEventListener('click', () => {
        showSlide(block, parseInt(block.dataset.activeSlide, 10) - 1);
    });
    block.querySelector('.slide-next').addEventListener('click', () => {
        showSlide(block, parseInt(block.dataset.activeSlide, 10) + 1);
    });

    const slideObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) updateActiveSlide(entry.target);
        });
    }, { threshold: 0.5 });
    block.querySelectorAll('.carousel-slide').forEach((slide) => {
        slideObserver.observe(slide);
    });
}

// function createSlide(row, slideIndex, carouselId) {
//     const slide = document.createElement('li');
//     slide.dataset.slideIndex = slideIndex;
//     slide.setAttribute('id', `carousel-${carouselId}-slide-${slideIndex}`);
//     slide.classList.add('carousel-slide');
//
//     row.querySelectorAll(':scope > div').forEach((column, colIdx) => {
//         column.classList.add(`carousel-slide-${colIdx === 0 ? 'image' : 'content'}`);
//         slide.append(column);
//     });
//
//     const labeledBy = slide.querySelector('h1, h2, h3, h4, h5, h6');
//     if (labeledBy) {
//         slide.setAttribute('aria-labelledby', labeledBy.getAttribute('id'));
//     }
//
//     return slide;
// }

function createSlide(row, slideIndex, itemTemplate){
    const tempNavItem = document.createElement('div');
    tempNavItem.innerHTML = itemTemplate;
    const slideIndexElement = tempNavItem.querySelector('.slick-slide.slick-cloned');
    slideIndexElement.setAttribute('data-index', --slideIndex);

    const imgElement = tempNavItem.querySelector('img');
    const contentPictureElement = row.querySelector('picture');
    // const pictureImg = contentPictureElement.querySelector('img');
    // pictureImg.removeAttribute('width');
    // pictureImg.removeAttribute('height');
    imgElement.parentNode.insertBefore(contentPictureElement, imgElement);
    imgElement.remove();

    const slideTextElements = row.querySelectorAll('div p');
    slideTextElements.forEach((text, index) => {
        let textElement;
        if (index === 0) {
            textElement = tempNavItem.querySelector('h2.title');
        } else {
            textElement = tempNavItem.querySelector('p.subtitle');
        }

        textElement.textContent = text.textContent; // Transfer the text content from <p> to <h1>
    });

    return tempNavItem.firstElementChild;
}

let carouselId = 0;
export default async function decorate(block) {
    // const carouselSection = document.createElement('section');
    // carouselSection.classList.add('section', 'carousel-block');
    const carouselWrapper = document.createElement('div');
    carouselWrapper.classList.add('carousel-block-inner');
    carouselWrapper.innerHTML = carouselWrapperHtml;

    // const contentCarouselSection = block.querySelector('.section .carousel-container');
    const slideContainer = carouselWrapper.querySelector('div .slick-track');

    const rows = block.querySelectorAll(':scope > div');
    rows.forEach((row, itNum) => {
        const slideItem = createSlide(row, itNum, carouselItemHtml);
        slideContainer.appendChild(slideItem);
    });

    //contentCarouselSection.appendChild()



    // carouselId += 1;
    // block.setAttribute('id', `carousel-${carouselId}`);
    // const rows = block.querySelectorAll(':scope > div');
    // const isSingleSlide = rows.length < 2;
    //
    // const placeholders = await fetchPlaceholders();
    //
    // block.setAttribute('role', 'region');
    // block.setAttribute('aria-roledescription', placeholders.carousel || 'Carousel');
    //
    // const container = document.createElement('div');
    // container.classList.add('carousel-slides-container');
    //
    // const slidesWrapper = document.createElement('ul');
    // slidesWrapper.classList.add('carousel-slides');
    // block.prepend(slidesWrapper);
    //
    // let slideIndicators;
    // if (!isSingleSlide) {
    //     const slideIndicatorsNav = document.createElement('nav');
    //     slideIndicatorsNav.setAttribute('aria-label', placeholders.carouselSlideControls || 'Carousel Slide Controls');
    //     slideIndicators = document.createElement('ol');
    //     slideIndicators.classList.add('carousel-slide-indicators');
    //     slideIndicatorsNav.append(slideIndicators);
    //     block.append(slideIndicatorsNav);
    //
    //     const slideNavButtons = document.createElement('div');
    //     slideNavButtons.classList.add('carousel-navigation-buttons');
    //     slideNavButtons.innerHTML = `
    //   <button type="button" class= "slide-prev" aria-label="${placeholders.previousSlide || 'Previous Slide'}"></button>
    //   <button type="button" class="slide-next" aria-label="${placeholders.nextSlide || 'Next Slide'}"></button>
    // `;
    //
    //     container.append(slideNavButtons);
    // }
    //
    // rows.forEach((row, idx) => {
    //     const slide = createSlide(row, idx, carouselId);
    //     slidesWrapper.append(slide);
    //
    //     if (slideIndicators) {
    //         const indicator = document.createElement('li');
    //         indicator.classList.add('carousel-slide-indicator');
    //         indicator.dataset.targetSlide = idx;
    //         indicator.innerHTML = `<button type="button" aria-label="${placeholders.showSlide || 'Show Slide'} ${idx + 1} ${placeholders.of || 'of'} ${rows.length}"></button>`;
    //         slideIndicators.append(indicator);
    //     }
    //     row.remove();
    // });
    //
    // container.append(carouselWrapper);
    block.textContent = '';
    // carouselSection.appendChild(carouselWrapper);
    block.prepend(carouselWrapper);
    //
    // if (!isSingleSlide) {
    //     bindEvents(block);
    // }
}
