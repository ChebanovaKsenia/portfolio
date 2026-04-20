$(document).ready(() => {
  //Локальная база городов (для демо)
  //В реальном проекте я бы подключила Dadata/kladr-api, но для демо использую мок-данные, чтобы не зависеть от сети и ключей
  const cities = [
    'Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург',
    'Казань', 'Нижний Новгород', 'Челябинск', 'Самара',
    'Омск', 'Ростов-на-Дону', 'Уфа', 'Красноярск',
    'Воронеж', 'Пермь', 'Волгоград', 'Краснодар',
    'Саратов', 'Тюмень', 'Тольятти', 'Ижевск'
  ];

  const $input = $('#city-input');
  const $list = $('#suggestions');
  let debounceTimer;
  let activeIndex = -1;

  $input.on('input', function() {
    clearTimeout(debounceTimer);
    const query = $(this).val().trim().toLowerCase();
    
    if (query.length < 2) {
      $list.hide().empty();
      return;
    }

    debounceTimer = setTimeout(() => {
      //Фильтруем массив (регистронезависимо)
      const matches = cities.filter(city => 
        city.toLowerCase().includes(query)
      );

      $list.empty();
      
      if (matches.length === 0) {
        $list.append('<li class="no-results">Ничего не найдено</li>').show();
      } else {
        matches.forEach(city => {
          //Подсветка совпадения (опционально)
          const highlighted = city.replace(
            new RegExp(`(${query})`, 'gi'),
            '<strong>$1</strong>'
          );
          $list.append(`<li>${highlighted}</li>`);
        });
        $list.show();
      }
      activeIndex = -1;
    }, 200); //Небольшая задержка для оптимизации
  });

  //Клик по подсказке
  $list.on('click', 'li:not(.no-results)', function() {
    $input.val($(this).text());
    $list.hide().empty();
  });

  //Скрыть при клике вне поля
  $(document).on('click', (e) => {
    if (!$input.is(e.target) && $list.has(e.target).length === 0) {
      $list.hide().empty();
    }
  });

  //Навигация стрелками (опционально)
  $input.on('keydown', function(e) {
    const $items = $list.find('li:not(.no-results)');
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = Math.min(activeIndex + 1, $items.length - 1);
      updateActive($items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, -1);
      updateActive($items);
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      $items.eq(activeIndex).click();
    }
  });

  function updateActive($items) {
    $items.removeClass('active');
    if (activeIndex >= 0) {
      $items.eq(activeIndex).addClass('active');
    }
  }
});