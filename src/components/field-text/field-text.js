import * as $ from 'jquery';
import Inputmask from 'inputmask';
import addLeadZero from '../../js/libs/add-lead-zero/addLeadZero';

const $maskedDateFields = $('[data-date-masked]');

$maskedDateFields.each(function () {
  const date = new Date();
  const currentDay = addLeadZero(date.getDate());
  const currentMonth = addLeadZero(date.getMonth() + 1);
  const currentYear = date.getFullYear();

  Inputmask('datetime', {
    placeholder: 'ДД.ММ.ГГГГ',
    inputFormat: 'dd.mm.yyyy',
    min: '01.01.1900',
    max: currentDay + '.' + currentMonth + '.' + currentYear
  }).mask($(this));
})