document.addEventListener('DOMContentLoaded', function () {
  //элементы
  const inputLogin = document.getElementById('inputLogin');
  const inputEmail = document.getElementById('inputEmail');
  const btnLogin = document.getElementById('btnLogin');
  const inputPassword = document.getElementById('inputPassword');
  const inputConfirmPassword = document.getElementById('inputConfirmPassword');
  const inputNumber = document.getElementById('inputNumber');

  //запрет копирования, вырезания, вставки, выделения
  [inputPassword, inputConfirmPassword].forEach(field => {
    ['copy', 'cut', 'paste', 'selectstart'].forEach(event => {
      field.addEventListener(event, e => e.preventDefault());
    });
    field.style.userSelect = 'none';
  });

  //надёжность пароля
  function isPasswordStrong(pwd) {
    if (pwd.length < 5) return false;
    const hasLetter = /[a-zA-Zа-яА-Я]/.test(pwd);
    const hasDigit = /\d/.test(pwd);
    return hasLetter && hasDigit;
  }

  //список разрешённых почт
  const allowedDomains = ['gmail.com', 'yandex.ru', 'yandex.com', 'ya.ru', 'mail.ru', 'inbox.ru', 'list.ru', 'bk.ru'];

  function isValidEmail(email) {
    if (!email || !email.includes('@')) return false;
    const parts = email.split('@');
    if (parts.length !== 2) return false;
    const local = parts[0];
    const domain = parts[1].toLowerCase();
    if (local.length < 1 || local.length > 64) return false;
    return allowedDomains.includes(domain);
  }

  //уведомы
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
    }, 3000);
  }

  //обработка отправки формы
  btnLogin.addEventListener('click', async function (e) {
    e.preventDefault();

    const login = inputLogin.value.trim();
    const email = inputEmail.value.trim();
    const phone = inputNumber.value.trim();
    const password = inputPassword.value.trim();
    const confirmPassword = inputConfirmPassword.value.trim();
    const defaultAvatar = '/pictures/user.png';

    //валидация
    let errors = [];
    if (login.length < 8) errors.push('Логин должен быть не менее 8 символов.');
    if (!isValidEmail(email)) errors.push('Пожалуйста, укажите существующий email');
    if (!phone) errors.push('Укажите номер телефона.');
    if (!isPasswordStrong(password)) errors.push('Пароль должен быть не менее 5 символов и содержать хотя бы одну букву и одну цифру.');
    if (password !== confirmPassword) errors.push('Пароли не совпадают.');

    if (errors.length > 0) {
      showNotification(errors[0]);
      return;
    }

    try {
      //отправка данных
      await axios.post('/register.php', {
        name: login,
        email: email,
        phone: phone,
        password: password,
        avatar: defaultAvatar
      });

      //сохранение в localStorage
      sessionStorage.setItem('pendingEmail', email);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', login);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userPhone', phone);
      localStorage.setItem('userQuote', '«Пока нет цитаты»');
      localStorage.setItem('userMood', 'Нейтральное');
      localStorage.setItem('regDate', new Date().toLocaleDateString('ru-RU'));

      showNotification('Вы успешно зарегистрировались!');
      setTimeout(() => window.location.href = '/html/profile.html', 1500);
    } catch (error) {
      //обработка ошибок
      if (error.response) {
        //сервер ответил с ошибкой (400, 500 и т.д.)
        console.error('Ошибка сервера:', error.response.data);
        showNotification('Ошибка регистрации. Проверьте данные.');
      } else if (error.request) {
        console.error('Нет ответа от сервера:', error.request);
        showNotification('Сервер не отвечает. Попробуйте позже.');
      } else {
        console.error('Ошибка запроса:', error.message);
        showNotification('Ошибка запроса.');
      }
    }
  });
});