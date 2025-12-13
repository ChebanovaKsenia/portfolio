document.addEventListener('DOMContentLoaded', function () {
  // Элементы
  const inputLogin = document.getElementById('inputLogin'); 
  const inputPassword = document.getElementById('inputPassword'); 
  const btnLogin = document.getElementById('btnLogin');
  const passwordFields = document.querySelectorAll('#inputPassword');

passwordFields.forEach(field => {
  field.addEventListener('copy', function(e) {
    e.preventDefault();
  });
  field.addEventListener('cut', function(e) {
    e.preventDefault();
  });
  field.addEventListener('paste', function(e) {
    e.preventDefault();
  });
});

  //уведомления
  function showNotification(message) {
    const old = document.querySelector('.notification');
    if (old) old.remove();

    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.textContent = message;
    document.body.appendChild(notif);

    setTimeout(() => notif.classList.add('show'), 10);

    setTimeout(() => {
      notif.classList.remove('show');
      setTimeout(() => notif.remove(), 300);
    }, 10000);}

 //обработка нажатия кнопки — без запроса на сервер
  btnLogin.addEventListener('click', function() {
    const login = inputLogin.value.trim();
    const password = inputPassword.value.trim();

    if (!login || !password) {
      showNotification('Заполните все поля');
      return;
    }
    //сохраняем
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', login);

    showNotification('Вы успешно вошли!');
    
    //переход на главную
    setTimeout(() => {
      window.location.href = '/html/home/home.html';
    }, 500); // небольшая задержка для показа уведомления
});
});