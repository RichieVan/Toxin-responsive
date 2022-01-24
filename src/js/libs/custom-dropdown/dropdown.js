import * as $ from 'jquery';
import DropdownWithCounters from './DropdownWithCounters';

$.fn.dropdownWithCounters = function () {
  this.each(function () {
    const $container = $(this);
    const dropdown = new DropdownWithCounters($container, $container.find('[js-dropdown-data-output]'));
    dropdown.render();
  });
};
