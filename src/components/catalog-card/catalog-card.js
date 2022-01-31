import $ from 'jquery';
import 'slick-carousel';

const cardsWithSlider = $('.js-catalog-card__images[data-slick]');

cardsWithSlider.each(function () {
  const $card = $(this);
  const $cardSlider = $card.find('.js-catalog-card__slider');
  const $cardPrevButton = $card.find('.js-catalog-card__arrow_prev');
  const $cardNextButton = $card.find('.js-catalog-card__arrow_next');
  const $cardControlsContainer = $card.find('.js-catalog-card__slider-controls');

  $cardSlider.slick({
    infinite: true,
    arrows: false,
    dots: true,
    dotsClass: 'catalog-card__dots',
    appendDots: $cardControlsContainer,
  });

  $cardPrevButton.on('click', () => {
    $cardSlider.slick('slickPrev');
  });

  $cardNextButton.on('click', () => {
    $cardSlider.slick('slickNext');
  });
});
