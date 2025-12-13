document.addEventListener('DOMContentLoaded', function () {
  // Элементы
  const emailStep = document.getElementById('emailStep');
  const codeStep = document.getElementById('codeStep');
  const passwordStep = document.getElementById('passwordStep');

  const emailInput = document.getElementById('inputEmail');
  const btnSendCode = document.getElementById('btnSendCode');

  const codeInputs = document.querySelectorAll('.code-num');
  const fullOtpInput = document.getElementById('fullOtp');

  const btnSavePassword = document.getElementById('btnSavePassword');
  const passwordInput = document.getElementById('inputPassword');
  const confirmPasswordInput = document.getElementById('inputConfirmPassword');

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
    }, 3000);
  }

  //отправка кода
  btnSendCode.addEventListener('click', () => {
    const email = emailInput.value.trim();
    if (!email || !email.includes('@')) {
      showNotification('Введите корректный email');
      return;
    }

    emailStep.style.display = 'none';
    codeStep.style.display = 'block';
    codeInputs[0].focus();
  });

  //ввод кода
  codeInputs.forEach((input, index) => {
    input.addEventListener('input', () => {
      let value = input.value.replace(/\D/g, '');
      if (value.length > 1) value = value[0];
      input.value = value;

      if (value && index < codeInputs.length - 1) {
        codeInputs[index + 1].focus();
      }
      updateCode();
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !input.value && index > 0) {
        codeInputs[index - 1].focus();
      }
    });
  });

  //проверка кода
  function updateCode() {
    const code = Array.from(codeInputs).map(inp => inp.value).join('');
    fullOtpInput.value = code;

    // как только введено 6 цифр — переходим к паролю
    if (code.length === 6) {
      codeStep.style.display = 'none';
      passwordStep.style.display = 'block';
    }
  }


  btnSavePassword.addEventListener('click', () => {
    const pass1 = passwordInput.value.trim();
    const pass2 = confirmPasswordInput.value.trim();

    if (!pass1 || !pass2) {
      showNotification('Заполните оба поля');
      return;
    }
    if (pass1 !== pass2) {
      showNotification('Пароли не совпадают');
      return;
    }

    showNotification('Пароль изменён!');
    setTimeout(() => {
      window.location.href = '/html/index.html';
    }, 1500);
  });
});