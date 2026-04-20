$(document).ready(() => {
  $('th').on('click', function() {
    const colIndex = $(this).data('col');
    const isAsc = $(this).data('asc') !== true;
    $(this).data('asc', isAsc);

    const $rows = $('tbody tr').toArray();
    $rows.sort((a, b) => {
      const aVal = $(a).find(`td:eq(${colIndex === 'name' ? 0 : colIndex === 'age' ? 1 : 2})`).text().toLowerCase();
      const bVal = $(b).find(`td:eq(${colIndex === 'name' ? 0 : colIndex === 'age' ? 1 : 2})`).text().toLowerCase();
      const numA = parseFloat(aVal) || aVal;
      const numB = parseFloat(bVal) || bVal;
      return isAsc ? (numA > numB ? 1 : -1) : (numA < numB ? 1 : -1);
    });

    $('tbody').append($rows);
  });
});