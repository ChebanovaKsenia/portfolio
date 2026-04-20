$(document).ready(() => {
  const $input = $('#search');
  const $list = $('#items li');

  $input.on('input', function() {
    const val = $(this).val().toLowerCase();
    $list.filter(function() {
      return $(this).text().toLowerCase().includes(val);
    }).show().end().not(function() {
      return $(this).text().toLowerCase().includes(val);
    }).hide();
  });
});