$(document).ready(() => {
  const $btn = $('#menu-btn');
  const $dropdown = $('#dropdown');

  //Показываем при наведении
  $btn.on('mouseenter', () => $dropdown.stop().slideDown(200));
  
  //Скрываем при уходе мыши с меню
  $dropdown.on('mouseleave', () => $dropdown.stop().slideUp(200));

  //Скрываем при клике вне области
  $(document).on('click', (e) => {
    if (!$btn.is(e.target) && $btn.has(e.target).length === 0 && 
        !$dropdown.is(e.target) && $dropdown.has(e.target).length === 0) {
      $dropdown.stop().slideUp(200);
    }
  });
});