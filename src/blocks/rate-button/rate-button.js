import * as $ from 'jquery';

const $rateButtons = $('.js-rate-btn[data-selectable]');
const hoverRangeClassName = 'star_in-hover-range';
const selectedRangeClassName = 'star_in-selected-range';
const selectedStarClassName = 'star_selected';

const rateStarEnterHandler = function () {
  const $star = $(this);
  $star
    .addClass(hoverRangeClassName)
    .prevAll()
    .addClass(hoverRangeClassName);
};

const rateStarLeaveHandler = function () {
  const $star = $(this);
  $star
    .removeClass(hoverRangeClassName)
    .prevAll()
    .removeClass(hoverRangeClassName);
};

const rateStarClickHandler = function () {
  const $star = $(this);

  if ($star.hasClass(selectedStarClassName)) {
    $star.removeClass([selectedStarClassName, selectedRangeClassName]);
    $star
      .siblings()
      .removeClass(selectedRangeClassName);
  } else {
    $star
      .siblings()
      .removeClass([selectedStarClassName, selectedRangeClassName]);
    $star.addClass(selectedStarClassName);
    $star
      .prevAll()
      .addClass(selectedRangeClassName);
  }
};

$rateButtons.each(function () {
  const $stars = $(this).find('.js-rate-btn__star');
  $stars
    .on('mouseenter', rateStarEnterHandler)
    .on('mouseleave', rateStarLeaveHandler)
    .on('click', rateStarClickHandler);
});
