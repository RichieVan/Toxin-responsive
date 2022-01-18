import * as $ from 'jquery';
import '../../js/libs/custom-dropdown/dropdown';

$('[data-dropdown-with-counters]').dropdownWithCounters(
  {
    counters: [
      {
        name: 'Спальни',
        defaultValue: 10,
        max: 10,
        min: 1,
        nameEndings: [
          [[1], 'спальня'],
          [[2,3,4], 'спальни'],
          ['default', 'спален']
        ],
      },
      {
        name: 'Кровати',
        defaultValue: 1,
        max: 6,
        min: 1,
        nameEndings: [
          [[1], 'кровать'],
          [[2,3,4], 'кровати'],
          ['default', 'кроватей'] 
        ],
      },
      {
        name: 'Ванные комнаты',
        defaultValue: 1,
        max: 3,
        min: 1,
        nameEndings: [
          [[1], 'ванная комната'],
          [[2,3,4], 'ванные комнаты'],
          ['default', 'ванных комнат']
        ],
      },
    ],
    buttons: {
      accept: {
        text: 'Применить',
        show: true
      },
      clear: {
        text: 'Очистить',
        show: true
      }
    }
  }
);