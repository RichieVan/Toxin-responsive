import $ from 'jquery';

const $filterShowButton = $('.js-catalog__show-filter');
const $filterHideButton = $('.js-smartfilter__close');
const filterActiveClass = 'smartfilter_active';

$filterShowButton.on('click', function () {
  const filterId = $(this).data('for');
  const $filter = $(`#${filterId}`);
  $filter.addClass(filterActiveClass);
  $('body').addClass('body__fixed');
});

$filterHideButton.on('click', function () {
  const filterId = $(this).data('for');
  const $filter = $(`#${filterId}`);
  $filter.removeClass(filterActiveClass);
  $('body').removeClass('body__fixed');
});
