import * as $ from 'jquery';

const likeHandler = function () {
  const $button = $(this);
  const likedClassName = 'like-btn--liked';

  if ($button.hasClass(likedClassName)) $button.removeClass(likedClassName);
  else $button.addClass(likedClassName);
};

$('.like-btn').on('click', likeHandler);
