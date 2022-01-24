import * as $ from 'jquery';
import Counter from './Counter';

export default class DropdownWithCounters {
  counters;

  props;

  showList = false;

  initialHeight;

  resultInput;

  fieldContainerElement;

  maskElement;

  contentBlock;

  acceptButton;

  clearButton;

  outputElement;

  activityClass = 'dropdown_expanded';

  constructor(container, outputElement) {
    this.counters = Array.from(container.find('[data-counter]')).map((counter) => {
      const item = new Counter($(counter), this).render();
      return item;
    });
    this.props = container.data('dropdown-with-counters');

    this.fieldContainerElement = container.find('.js-field-dropdown');
    this.resultInput = container.find('.js-field-dropdown__input');
    this.maskElement = container.find('.js-field-dropdown__mask');
    this.contentBlock = container.find('.js-field-dropdown__content');
    this.acceptButton = container.find('.js-dropdown-button_accept');
    this.clearButton = container.find('.js-dropdown-button_clear');
    this.outputElement = outputElement;
  }

  show() {
    this.fieldContainerElement.addClass(this.activityClass);
    this.contentBlock.height(this.initialHeight);
  }

  hide() {
    this.fieldContainerElement.removeClass(this.activityClass);
    this.contentBlock.height(0);
  }

  toggleState() {
    if (this.showList) this.hide();
    else this.show();
    this.showList = !this.showList;
  }

  clearButtonClickHandler() {
    this.counters.forEach((counter) => {
      counter.clearCountValue();
    });
    this.setJoinedResultsString();
  }

  setJoinedResultsString() {
    let result = '';

    if (this.props.result) {
      result = 0;
      this.counters.forEach((counter) => {
        result += counter.getCount();
      });
      const ending = this.props.result.endings.filter((val) => val[0].includes(result) || val[0] === 'default')[0][1];
      result = `${result} ${ending}`;
    } else {
      this.counters.forEach((counter) => {
        if (result.length > 0) result += ', ';
        result += counter.getResultString();
      });
    }
    this.resultInput.val(result);
    this.maskElement.attr('title', result);
  }

  bindEvents() {
    this.acceptButton.on('click', () => {
      this.toggleState();
    });

    this.clearButton.on('click', () => {
      this.clearButtonClickHandler();
    });

    this.maskElement.on('click', () => {
      this.toggleState();
    });
  }

  render() {
    this.bindEvents();
    this.setJoinedResultsString();

    this.initialHeight = this.contentBlock.height() + 1;
    this.hide();
  }
}
