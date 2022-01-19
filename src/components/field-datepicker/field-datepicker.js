import * as $ from 'jquery';
import AirDatepicker from 'air-datepicker';
import addLeadZero from '../../js/libs/add-lead-zero/addLeadZero';

$('.field-datepicker-container').each(function (index) {
  let isDatepickerActive = false;
  const inputFrom = $(`#datepickerFrom${index + 1}`);
  const inputTo = $(`#datepickerTo${index + 1}`);
  const acceptButton = {
    content: 'Применить',
    className: 'air-datepicker-button button--accept',
    attrs: {type: 'button'},
    onClick: (dp) => {
      dp.hide();
    }
  }
  const clearButton = {
    content: 'Очистить',
    className: 'air-datepicker-button button--clear',
    attrs: {type: 'button'},
    onClick: (dp) => {
      dp.clear();
    }
  }

  const inputPreventationHandler = function (e) {
    e.preventDefault();
  }
  inputFrom.on('keydown', inputPreventationHandler)

  const dp = new AirDatepicker(`#datepickerFrom${index + 1}`, {
    range: true,
    minView: 'days',
    autoClose: false,
    container: $(this).find('.field-datepicker')[0],
    prevHtml: '<span class="material-icons">arrow_back</span>',
    nextHtml: '<span class="material-icons">arrow_forward</span>',
    navTitles: {
      'days' : function (obj) {
        const date = obj.viewDate;
        return obj.locale.months[date.getMonth()] + ' ' + date.getFullYear();
      }
    },
    buttons: [
      clearButton,
      acceptButton
    ],
    onSelect: function({datepicker}) {
      const isMultiple = inputTo.length > 0;

      let dateFrom;
      let monthFrom;
      let yearFrom;

      if (datepicker.rangeDateFrom) {
        dateFrom = datepicker.rangeDateFrom.getDate();
        monthFrom = isMultiple 
          ? addLeadZero(datepicker.rangeDateFrom.getMonth() + 1) 
          : datepicker.locale.months[datepicker.rangeDateFrom.getMonth()].substring(0, 3).toLowerCase()
        yearFrom = datepicker.rangeDateFrom.getFullYear();

        if (datepicker.rangeDateFrom) {
          if (isMultiple) {
            inputFrom.val(dateFrom + '.' + monthFrom + '.' + yearFrom);
          } else {
            inputFrom.val(dateFrom + ' ' + monthFrom);
          }
        }
      }

      if (datepicker.rangeDateTo) {
        const dateTo = datepicker.rangeDateTo.getDate();
        const monthTo = isMultiple 
          ? addLeadZero(datepicker.rangeDateTo.getMonth() + 1) 
          : datepicker.locale.months[datepicker.rangeDateTo.getMonth()].substring(0, 3).toLowerCase()
        const yearTo = datepicker.rangeDateTo.getFullYear();

        if (isMultiple) {
          inputTo.val(dateTo + '.' + monthTo + '.' + yearTo);
        } else {
          inputFrom.val(dateFrom + ' ' + monthFrom + ' - ' + dateTo + ' ' + monthTo);
        }
      }
    },
    onHide: () => {
      isDatepickerActive = false;
    },
    onShow: () => {
      isDatepickerActive = true;
    }
  })

  $(this).find('[class$=__mask]').on('click', () => {
    if (isDatepickerActive) dp.hide();
    else dp.show();

    isDatepickerActive = !isDatepickerActive;
  })
})
