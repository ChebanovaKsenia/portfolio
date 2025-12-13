document.addEventListener('DOMContentLoaded', function() {
  if (typeof showConfirm !== 'function') {
    console.error('Функция showConfirm не найдена. Убедитесь, что модальные окна подключены.');
    return;
  }

  document.querySelectorAll('.plan button[data-price]').forEach(btn => {
    btn.addEventListener('click', function() {
      const price = this.dataset.price;
      const planName = this.closest('.plan').querySelector('h2').textContent;

      if (price != 0) {
        showConfirm(
          `Подключить подписку «${planName}» за ${price} ₽/месяц?`,
          () => {
            showInfo(`Подписка «${planName}» успешно активирована!`);
          }
        );
      } else {
        showConfirm(
          `Отменить подписку и перейти на бесплатный тариф?`,
          () => {
            showInfo('Подписка отменена. Вы перешли на бесплатный тариф.');
          }
        );
      }
    });
  });
});