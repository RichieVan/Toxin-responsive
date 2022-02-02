import * as $ from 'jquery';
import AirDatepicker from 'air-datepicker';
import addLeadZero from '../../js/libs/add-lead-zero/addLeadZero';

$('[data-datepicker]').each(function () {
  const $container = $(this);
  const props = $container.data('datepicker');

  const acceptButton = {
    content: 'Применить',
    className: 'btn btn_inline air-datepicker-button button_accept',
    attrs: { type: 'button' },
    onClick: (dp) => {
      dp.hide();
    },
  };
  const clearButton = {
    content: 'Очистить',
    className: 'btn btn_inline air-datepicker-button button_clear',
    attrs: { type: 'button' },
    onClick: (dp) => {
      dp.clear();
    },
  };

  if (props.fixed) {
    const dp = new AirDatepicker($container[0], {
      range: true,
      minView: 'days',
      autoClose: false,
      container: $container[0],
      prevHtml: '<span class="material-icons">arrow_back</span>',
      nextHtml: '<span class="material-icons">arrow_forward</span>',
      navTitles: {
        days(obj) {
          const date = obj.viewDate;
          return `${obj.locale.months[date.getMonth()]} ${date.getFullYear()}`;
        },
      },
      buttons: [
        clearButton,
        acceptButton,
      ],
    });
  } else {
    const $inputFrom = $container.find('.js-field-datepicker__input_from');
    const $inputTo = $container.find('.js-field-datepicker__input_to');

    const inputPreventationHandler = function (e) {
      e.preventDefault();
    };
    $inputFrom.on('keydown', inputPreventationHandler);

    let isDatepickerActive = false;
    const dp = new AirDatepicker($inputFrom[0], {
      range: true,
      minView: 'days',
      autoClose: false,
      container: $(this).find('.js-field-datepicker')[0],
      prevHtml: '<span class="material-icons">arrow_back</span>',
      nextHtml: '<span class="material-icons">arrow_forward</span>',
      navTitles: {
        days(obj) {
          const date = obj.viewDate;
          return `${obj.locale.months[date.getMonth()]} ${date.getFullYear()}`;
        },
      },
      buttons: [
        clearButton,
        acceptButton,
      ],
      onSelect({ datepicker }) {
        const isMultiple = $inputTo.length > 0;

        let dateFrom;
        let monthFrom;
        let yearFrom;

        if (datepicker.rangeDateFrom) {
          dateFrom = datepicker.rangeDateFrom.getDate();
          if (isMultiple) {
            monthFrom = addLeadZero(datepicker.rangeDateFrom.getMonth() + 1);
          } else {
            monthFrom = datepicker.locale.months[datepicker.rangeDateFrom.getMonth()]
              .substring(0, 3)
              .toLowerCase();
          }
          yearFrom = datepicker.rangeDateFrom.getFullYear();

          if (datepicker.rangeDateFrom) {
            if (isMultiple) {
              $inputFrom.val(`${dateFrom}.${monthFrom}.${yearFrom}`);
            } else {
              $inputFrom.val(`${dateFrom} ${monthFrom}`);
            }
          }
        }

        if (datepicker.rangeDateTo) {
          const dateTo = datepicker.rangeDateTo.getDate();
          let monthTo;
          if (isMultiple) {
            monthTo = addLeadZero(datepicker.rangeDateTo.getMonth() + 1);
          } else {
            monthTo = datepicker.locale.months[datepicker.rangeDateTo.getMonth()]
              .substring(0, 3)
              .toLowerCase();
          }
          const yearTo = datepicker.rangeDateTo.getFullYear();

          if (isMultiple) {
            $inputTo.val(`${dateTo}.${monthTo}.${yearTo}`);
          } else {
            $inputFrom.val(`${dateFrom} ${monthFrom} - ${dateTo} ${monthTo}`);
          }
        }
      },
      onHide: () => {
        isDatepickerActive = false;
      },
      onShow: () => {
        isDatepickerActive = true;
      },
    });

    $(this).find('.js-field-datepicker__mask').on('click', () => {
      if (isDatepickerActive) dp.hide();
      else dp.show();

      isDatepickerActive = !isDatepickerActive;
    });
  }
});
