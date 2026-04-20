$(document).ready(() => {
  $('#sortable-list').sortable({
    placeholder: 'ui-state-highlight',
    update: () => console.log('Список обновлён:', $('#sortable-list').sortable('toArray'))
  }).disableSelection();
});
