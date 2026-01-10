//шлобальная переменная для токена капчи
let captchaToken = null;

document.addEventListener('DOMContentLoaded', function () {
  const inputLogin = document.getElementById('inputLogin');
  const inputIdentifier = document.getElementById('inputIdentifier');
  const inputPassword = document.getElementById('inputPassword');
  const btnLogin = document.getElementById('btnLogin');

  //запрет копирования пароля
  inputPassword.addEventListener('copy', e => e.preventDefault());
  inputPassword.addEventListener('cut', e => e.preventDefault());
  inputPassword.addEventListener('paste', e => e.preventDefault());

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

  //инициализация капчи
  function initCaptcha() {
    if (typeof smartCaptcha !== 'undefined') {
      smartCaptcha.render('captcha-container', {
        sitekey: 'ysc1_1peaK2DdNT5OzzSR3nasDrUJHYPI69YaUC0s9gvZ4d02a56e',
        hideShield: false,
        callback: function(token) {
          captchaToken = token;
        },
        'expired-callback': function() {
          captchaToken = null;
        }
      });
    } else {
      console.warn('SmartCaptcha not loaded. Retrying...');
      setTimeout(initCaptcha, 500);
    }
  }

  initCaptcha();

  //обработка входа
  btnLogin.addEventListener('click', async function () {
    const login = inputLogin.value.trim();
    const identifier = inputIdentifier.value.trim();
    const password = inputPassword.value.trim();

    if (!login || !identifier || !password) {
      showNotification('Заполните все поля');
      return;
    }

    //проверка капчи
    if (!captchaToken) {
      showNotification('Пройдите проверку «Я не робот»');
      return;
    }

    try {
      const response = await axios.post('/login.php', {
        login: login,
        identifier: identifier,
        password: password,
        captchaToken: captchaToken // отправляем токен
      });

      if (response.data.success) {
  //очищаем старые данные (на всякий случай)
  localStorage.removeItem('userQuote');
  localStorage.removeItem('userMood');
  localStorage.removeItem('userAvatar');

  //сохраняем ВСЁ из ответа сервера
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('userName', response.data.user.login);
  localStorage.setItem('userEmail', response.data.user.email);
  localStorage.setItem('userPhone', response.data.user.phone);
  localStorage.setItem('userAvatar', response.data.user.avatar || '/pictures/user.png');
  localStorage.setItem('userQuote', response.data.user.quote || '«Пока нет цитаты»');
  localStorage.setItem('userMood', response.data.user.mood || 'Нейтральное');
  localStorage.setItem('regDate', new Date(response.data.user.registered_at).toLocaleDateString('ru-RU'));

  showNotification('Вы успешно вошли!');
  setTimeout(() => {
    window.location.href = '/html/profile.html';
  }, 1000);
}
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      if (error.response?.status === 401) {
        showNotification('Неверные данные');
      } else {
        showNotification('Ошибка сервера');
      }
    }
  });
});