import * as $ from 'jquery';

const likeHandler = function () {
  const $button = $(this);
  const likedClassName = 'like-btn_liked';

  if ($button.hasClass(likedClassName)) $button.removeClass(likedClassName);
  else $button.addClass(likedClassName);
};

$('.js-like-btn').on('click', likeHandler);
