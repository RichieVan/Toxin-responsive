import * as $ from 'jquery';

const expandableListClassName = 'expandable-list';
const expandedModifierClassName = expandableListClassName + '--expanded';

$('.' + expandableListClassName).each(function () {
  const $list = $(this);
  const $mask = $list.find('.' + expandableListClassName + '__mask');
  const $content = $list.find('.' + expandableListClassName + '__content');
  
  let isExpanded = $list.hasClass(expandedModifierClassName);
  const initialContainerHeight = $content.height();

  $mask.on('click', function () {
    if (isExpanded) {
      $content.height(0);
      $list.removeClass(expandedModifierClassName)
    } else {
      $content.height(initialContainerHeight)
      $list.addClass(expandedModifierClassName)
    }
    isExpanded = !isExpanded;
  })

  if (isExpanded) $content.height(initialContainerHeight);
})