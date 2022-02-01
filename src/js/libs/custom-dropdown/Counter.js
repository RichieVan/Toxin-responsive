class Counter {
  count;

  defaultValue;

  name;

  max;

  min;

  endings;

  parentClass;

  countElement;

  decreaseButton;

  increaseButton;

  element;

  constructor(element, parentClass) {
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

  getResultString() {
    const ending = this.endings.filter((val) => val[0].includes(this.count) || val[0] === 'default')[0][1];
    return `${this.count} ${ending}`;
  }

  getCount() {
    return this.count;
  }

  clearCountValue() {
    this.count = this.defaultValue;
    this.countElement.text(this.count);
    this.toggleButtons();
  }

  decreaseHandler() {
    if (this.count > this.min) {
      this.count -= 1;
      this.countElement.text(this.count);
    }
  }

  increaseHandler() {
    if (this.count < this.max) {
      this.count += 1;
      this.countElement.text(this.count);
    }
  }

  buttonsClickHandler() {
    this.toggleButtons();
    this.parentClass.setJoinedResultsString();
  }

  toggleButtons() {
    if (this.count === this.max) {
      this.increaseButton.prop('disabled', true);
    } else {
      this.increaseButton.prop('disabled', false);
    }

    if (this.count === this.min) {
      this.decreaseButton.prop('disabled', true);
    } else {
      this.decreaseButton.prop('disabled', false);
    }
  }

  bindButtons() {
    this.decreaseButton.on('click', () => {
      this.decreaseHandler();
      this.buttonsClickHandler();
    });

    this.increaseButton.on('click', () => {
      this.increaseHandler();
      this.buttonsClickHandler();
    });
  }

  render() {
    this.bindButtons();
    this.toggleButtons();
    return this;
  }
}

export default Counter;
