import * as $ from 'jquery';
import 'ion-rangeslider';

$('.js-field-range').each(function () {
  const $container = $(this);
  const $valuesContainer = $container.find('.js-field-range__values');
  const $slider = $(this).find('.js-range-slider');
  const currencySymbol = '₽';
  const from = 5000;
  const to = 10000;

  $slider.ionRangeSlider({
    type: 'double',
    min: 500,
    max: 15000,
    from,
    to,
    step: 100,
    hide_min_max: true,
    hide_from_to: true,
    onChange(data) {
      $valuesContainer.text(`${data.from_pretty + currencySymbol} - ${data.to_pretty}${currencySymbol}`);
    },
    onStart(data) {
      $valuesContainer.text(`${data.from_pretty + currencySymbol} - ${data.to_pretty}${currencySymbol}`);
    },
  });
});
