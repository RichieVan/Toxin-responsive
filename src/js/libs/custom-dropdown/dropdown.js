import * as $ from 'jquery';

(function ($) {
  $.fn.dropdownWithCounters = function (props) {
    const dropdown = new DropdownWithCounters(props)
    
    this.after(dropdown.render())
  }
})($)

class DropdownWithCounters {
  counters;
  showList = false;
  acceptButtonData = {
    text: 'Применить',
    show: true,
  };
  clearButtonData = {
    text: 'Очистить',
    show: false,
  };
  resultInput;
  listContainerElement;
  fieldContainerElement;
  maskElement;
  activityClass = 'dropdown--expanded';

  constructor (options) {
    this.counters = options.counters.map(props => {
      const item = new Counter({
        ...props,
        parentClass: this
      });
      return item;
    });

    if (options?.buttons) {
      if (options.buttons?.accept) {
        this.acceptButtonData = {...this.acceptButtonData, ...options.buttons.accept};
      }
      if (options.buttons?.clear) {
        this.clearButtonData = {...this.clearButtonData, ...options.buttons.clear};
      }
    }
  }

  maskClickHandler () {
    if (this.showList) {
      this.fieldContainerElement.removeClass(this.activityClass);
    } else {
      this.fieldContainerElement.addClass(this.activityClass);
    }
    this.showList = !this.showList;
  }

  cleanButtonClickHandler () {
    this.counters.forEach(counter => {
      counter.clearCountValue();
    })
    this.setJoinedResultString();
  }

  acceptButtonClickHandler () {
    this.maskClickHandler();
  }

  setJoinedResultString () {
    let result = '';
    this.counters.forEach(counter => {
      if (result.length > 0) result = result + ', ';
      result = result + counter.getResultString();
    })
    this.resultInput.val(result);
    this.maskElement.attr('title', result);
  }

  renderButtons () {
    let buttonsContainer;
    if (this.acceptButtonData.show || this.clearButtonData.show) {
      buttonsContainer = $("<div/>", { "class": "dropdown-buttons", });
    }

    if (this.clearButtonData.show) {
      $(
        "<button/>", 
        { 
          "class": "dropdown-button",
          "click": () => (this.cleanButtonClickHandler()),
          "text": this.clearButtonData.text
        }
      ).appendTo(buttonsContainer);
    }

    if (this.acceptButtonData.show) {
      $(
        "<button/>", 
        { 
          "class": "dropdown-button",
          "click": () => (this.acceptButtonClickHandler()),
          "text": this.acceptButtonData.text
        }
      ).appendTo(buttonsContainer);
    }
    return buttonsContainer;
  }

  render () {
    this.fieldContainerElement = $("<div/>", { "class": "field-dropdown" });
    this.resultInput = $("<input/>", { "class": "field-dropdown__input", "type": "text", }).appendTo(this.fieldContainerElement);
    const dropdownArrow = $("<div/>", { "class": "field-dropdown__arrow" }).appendTo(this.fieldContainerElement);
    $("<span/>", { "class": "material-icons", "html": "expand_more" }).appendTo(dropdownArrow);
    this.maskElement = $("<div/>", { "class": "field-dropdown__mask", "click": () => (this.maskClickHandler()) }).appendTo(this.fieldContainerElement);
    this.listContainerElement = $("<div/>", { "class": "dropdown-content", }).appendTo(this.fieldContainerElement);
    const listCounters = $("<div/>", { "class": "dropdown-counters", }).appendTo(this.listContainerElement);
    this.counters.forEach(counter => {
      counter.render().appendTo(listCounters);
    })
    this.renderButtons().appendTo(this.listContainerElement)

    this.setJoinedResultString();
    return this.fieldContainerElement;
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

  constructor (options) {
    this.name = options.name;
    this.max = options.max;
    this.min = options?.min || 0;
    this.defaultValue = options?.defaultValue || 0;
    this.count = this.defaultValue;
    this.endings = options.nameEndings;
    this.parentClass = options.parentClass;
  }

  getResultString () {
    const ending = this.endings.filter(val => val[0].includes(this.count) || val[0] === 'default')[0][1];
    return this.count + ' ' + ending;
  }

  clearCountValue () {
    this.count = this.defaultValue;
    this.countElement.text(this.count);
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
    this.parentClass.setJoinedResultString();
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
    this.decreaseButton = $(
      "<button/>",
      {
        "class": "dropdown-counter__button",
        "click": () => {
          this.decreaseHandler()
          this.buttonsClickHandler()
        },
        'text': '-',
      }
    );

    this.countElement = $(
      "<div/>",
      {
        "class": "dropdown-counter__count",
        "text": this.count
      }
    );

    this.increaseButton = $(
      "<button/>",
      {
        "class": "dropdown-counter__button",
        "click": () => {
          this.increaseHandler()
          this.buttonsClickHandler()
        },
        'text': '+',
      }
    );

    const buttonsContainer = $(
      "<div/>",
      {
        "class": "dropdown-counter__buttons-container"
      }
    ).append([this.decreaseButton, this.countElement, this.increaseButton]);

    return buttonsContainer;
  }

  render () {
    const buttonsContainer = this.bindButtons();

    this.counterContainer = $(
      "<div/>",
      {
        "class": "dropdown-counter"
      }
    );

    const counterName = $(
      "<div/>",
      {
        "class": "dropdown-counter__name",
        "text": this.name
      }
    )

    counterName.appendTo(this.counterContainer);
    buttonsContainer.appendTo(this.counterContainer);

    this.toggleButtons();
    return this.counterContainer;
  }
}