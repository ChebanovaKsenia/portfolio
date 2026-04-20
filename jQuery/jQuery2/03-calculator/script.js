$(document).ready(() => {
  $('.calc-input').on('input', function() {
    let sum = 0;
    $('.calc-input').each(function() {
      sum += parseFloat($(this).val()) || 0;
    });
    $('#result').text(`Итого: ${sum.toFixed(2)} ₽`);
  });
});