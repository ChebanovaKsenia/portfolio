$(document).ready(() => {
  $('.thumb').on('click', function() {
    const src = $(this).attr('src');
    $('#overlay-img').attr('src', src);
    $('#gallery-overlay').fadeIn(300);
  });

  $('#gallery-overlay, .close-btn').on('click', () => $('#gallery-overlay').fadeOut(300));
});