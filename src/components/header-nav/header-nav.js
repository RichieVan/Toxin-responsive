import * as $ from 'jquery';

const headerNav = $('.js-header-nav');
const headerNavWrapper = $('.js-header-nav__wrapper');
const headerNavInnerWrapper = $('.js-header-nav__inner-wrapper');
const headerShowButton = $('.js-header-nav__button_show');
const headerHideButton = $('.js-header-nav__button_hiding');
const headerActiveClass = 'header-nav_active';

const hideNav = function () {
  headerNav.removeClass(headerActiveClass)
}

headerShowButton.on('click', function () {
  headerNav.addClass(headerActiveClass)
})

headerHideButton.on('click', hideNav)
headerNavWrapper.on('click', hideNav)

headerNavInnerWrapper.on('click', function (e) {
  e.stopPropagation()
})