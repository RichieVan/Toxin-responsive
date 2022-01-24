import * as $ from 'jquery';

(function ($) {
  $.fn.dropdownWithCounters = function () {
    this.each(function () {
      const $container = $(this);
      const dropdown = new DropdownWithCounters($container, $container.find('[js-dropdown-data-output]'));
      dropdown.render();
    })

  }
})($)

class DropdownWithCounters {
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

  constructor (container, outputElement) {
    this.counters = Array.from(container.find('[data-counter]')).map((counter) => {
      console.log(new Counter($(counter), this));
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

  show () {
    this.fieldContainerElement.addClass(this.activityClass);
    this.contentBlock.height(this.initialHeight);
  }

  hide () {
    this.fieldContainerElement.removeClass(this.activityClass);
    this.contentBlock.height(0);
  }

  toggleState () {
    if (this.showList) this.hide();
    else this.show();
    this.showList = !this.showList;
  } 

  clearButtonClickHandler () {
    this.counters.forEach(counter => {
      counter.clearCountValue();
    })
    this.setJoinedResultsString();
  }

  setJoinedResultsString () {
    let result = '';

    if (this.props.result) {
      result = 0;
      this.counters.forEach(counter => {
        result = result + counter.getCount();
      })
      result = result + ' ' + this.props.result.endings.filter(val => val[0].includes(result) || val[0] === 'default')[0][1];
    } else {
      this.counters.forEach(counter => {
        if (result.length > 0) result = result + ', ';
        result = result + counter.getResultString();
      })
    }
    this.resultInput.val(result);
    this.maskElement.attr('title', result);
  }

  bindEvents () {
    this.acceptButton.on('click', () => {
      this.toggleState();
    })

    this.clearButton.on('click', () => {
      this.clearButtonClickHandler();
    })

    this.maskElement.on('click', () => {
      this.toggleState();
    })
  }

  render () {
    this.bindEvents();
    this.setJoinedResultsString();

    this.initialHeight = this.contentBlock.height() + 1;
    this.hide();
  }
}

class Counter {
  count;
  defaultValue;
  name;
  max;
  min;
  endings;
  parentClass;
  counterContainer;
  countElement;
  decreaseButton;
  increaseButton;
  element;

  constructor (element, parentClass) {
    const data = element.data('counter');
    this.element = element;
    this.name = data.name;
    this.max = data.max;
    this.min = data.min || 0;
    this.defaultValue = data.defaultValue || 0;
    this.endings = data.nameEndings;
    this.count = this.defaultValue;
    this.parentClass = parentClass;

    this.decreaseButton = this.element.find('.js-counter__button_decrease');
    this.increaseButton = this.element.find('.js-counter__button_increase');
    this.countElement = this.element.find('.js-dropdown-counter__count');
  }

  getResultString () {
    const ending = this.endings.filter(val => val[0].includes(this.count) || val[0] === 'default')[0][1];
    return this.count + ' ' + ending;
  }

  getCount () {
    return this.count;
  }

  clearCountValue () {
    this.count = this.defaultValue;
    this.countElement.text(this.count);
    this.toggleButtons();
  }

  decreaseHandler () {
    if (this.count > this.min) {
      this.count -= 1;
      this.countElement.text(this.count);
    }
  }

  increaseHandler () {
    if (this.count < this.max) {
      this.count += 1;
      this.countElement.text(this.count);
    }
  }

  buttonsClickHandler () {
    this.toggleButtons();
    this.parentClass.setJoinedResultsString();
  }

  toggleButtons () {
    if (this.count == this.max) {
      this.increaseButton.prop('disabled', true);
    } else {
      this.increaseButton.prop('disabled', false);
    }

    if (this.count == this.min) {
      this.decreaseButton.prop('disabled', true);
    } else {
      this.decreaseButton.prop('disabled', false);
    }
  }

  bindButtons () {
    this.decreaseButton.on('click', () => {
      this.decreaseHandler()
      this.buttonsClickHandler()
    })

    this.increaseButton.on('click', () => {
      this.increaseHandler()
      this.buttonsClickHandler()
    })
  }

  render () {
    this.bindButtons();
    this.toggleButtons();
    return this;
  }
}