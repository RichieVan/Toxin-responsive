import $ from 'jquery';
import 'slick-carousel';

const multiSlider = $('.js-multi-slider[data-slick]');

multiSlider.each(function () {
  const $container = $(this);
  const $navSlider = $container.find('.js-multi-slider__nav');
  const $forSlider = $container.find('.js-multi-slider__for');

  $navSlider.slick({
    arrows: false,
    dots: false,
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 3,
    focusOnSelect: true,
    cssEase: 'ease-out',
    infinite: true,
    asNavFor: $forSlider,
    responsive: [
      {
        breakpoint: 601,
        settings: {
          vertical: false,
          verticalSwiping: false,
        },
      },
    ],
  });

  $forSlider.slick({
    arrows: false,
    dots: false,
    slidesToShow: 1,
    swipe: false,
    fade: true,
  });
});
