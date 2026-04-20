$(document).ready(() => {
  window.showNotification = (msg, type = 'success') => {
    const $note = $(`<div class="note note-${type}">${msg}</div>`);
    $('#notifications').append($note);
    $note.fadeIn(300).delay(3000).fadeOut(400, function() { $(this).remove(); });
  };

  $('#notify-btn').on('click', () => showNotification('Форма успешно отправлена! '));
  $('#error-btn').on('click', () => showNotification('Произошла ошибка!', 'error'));
  $('#warn-btn').on('click', () => showNotification('Предупреждение!', 'warning'));
});