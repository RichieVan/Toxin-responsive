import * as $ from 'jquery';
import 'ion-rangeslider';

$('.field-range').each(function () {
  const $container = $(this);
  const $valuesContainer = $container.find('[class$="__values"]')
  const $slider = $(this).find('.js-range-slider');
  console.log($valuesContainer);

  $slider.ionRangeSlider({
    type: 'double',
    min: 500,
    max: 15000,
    from: 5000,
    to: 10000,
    step: 100,
    hide_min_max: true,
    hide_from_to: true,
    onChange : function (data) {
      console.log(data);
      $valuesContainer.text(data.from_pretty + ' - ' + data.to_pretty)
    }
  });
})


