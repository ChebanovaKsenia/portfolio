document.addEventListener('DOMContentLoaded', function () {
  //проверка входа
  if (!localStorage.getItem('isLoggedIn')) {
    window.location.href = '/html/login.html';
    return;
  }

  //хагрузка данных из localStorage
  let userName = localStorage.getItem('userName') || '—';
  let userEmail = localStorage.getItem('userEmail') || '—';
  let userPhone = localStorage.getItem('userPhone') || '—';
  let userQuote = localStorage.getItem('userQuote') || '«Пока нет цитаты»';
  let userMood = localStorage.getItem('userMood') || 'Нейтральное';
  let avatarSrc = localStorage.getItem('userAvatar') || '/pictures/user.png';
  let regDate = localStorage.getItem('regDate') || new Date().toLocaleDateString('ru-RU');

  const editForm = document.getElementById('editForm');
  const overlay = document.getElementById('overlay');
  const passwordSection = document.getElementById('passwordSection');
  const togglePasswordBtn = document.getElementById('togglePasswordBtn');

  //отображение данных
  document.getElementById('userName').textContent = userName;
  document.getElementById('userEmail').textContent = userEmail;
  document.getElementById('userPhone').textContent = userPhone;
  document.getElementById('quoteDisplay').textContent = userQuote;
  document.getElementById('moodDisplay').textContent = userMood;
  document.getElementById('avatarPicture').src = avatarSrc;
  document.getElementById('regDate').textContent = regDate;

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

  //смена аватара
  const avatarUpload = document.getElementById('avatarUpload');
  const avatarImg = document.getElementById('avatarPicture');

  avatarUpload.addEventListener('change', async function (e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = async function (event) {
        const base64 = event.target.result;
        localStorage.setItem('userAvatar', base64);
        avatarImg.src = base64;

        try {
          await axios.post('/update-avatar.php', {
            login: localStorage.getItem('userName'),
            avatar: base64
          });
        } catch (error) {
          console.error('Не удалось сохранить аватар на сервере');
        }
      };
      reader.readAsDataURL(file);
    }
  });

  //переключение блока пароля
  togglePasswordBtn.addEventListener('click', function () {
    if (passwordSection.style.display === 'none') {
      passwordSection.style.display = 'block';
      togglePasswordBtn.textContent = 'Отмена';
    } else {
      passwordSection.style.display = 'none';
      togglePasswordBtn.textContent = 'Изменить пароль';
    }
  });

  //открытие формы редактирования
  document.getElementById('editBtn').addEventListener('click', function () {
    document.getElementById('editQuote').value = userQuote.replace(/«|»/g, '');
    document.getElementById('editMood').value = userMood;
    document.getElementById('editPhone').value = userPhone;

    editForm.style.display = 'block';
    overlay.style.display = 'block';
  });

  //отмена редактирования
  document.getElementById('cancelBtn').addEventListener('click', function () {
    editForm.style.display = 'none';
    overlay.style.display = 'none';
  });

  //сохранение изменений
  document.getElementById('updateBtn').addEventListener('click', async function () {
    const quote = document.getElementById('editQuote').value.trim();
    const mood = document.getElementById('editMood').value;
    const phone = document.getElementById('editPhone').value.trim();

    let passwordChanged = false;

    //обработка пароля
    if (passwordSection.style.display === 'block') {
      const oldPassword = document.getElementById('oldPassword').value.trim();
      const newPassword = document.getElementById('newPassword').value.trim();
      const confirmNewPassword = document.getElementById('confirmNewPassword').value.trim();

      if (!oldPassword || !newPassword || !confirmNewPassword) {
        showNotification('Заполните все поля пароля');
        return;
      }

      if (newPassword !== confirmNewPassword) {
        showNotification('Новые пароли не совпадают');
        return;
      }

      try {
        const checkResponse = await axios.post('/check-password.php', {
          login: userName,
          oldPassword: oldPassword
        });

        if (!checkResponse.data.success) {
          showNotification('Неверный старый пароль');
          return;
        }

        await axios.post('/update-password.php', {
          login: userName,
          newPassword: newPassword
        });

        const maskedPass = newPassword.length <= 2
          ? newPassword
          : newPassword.slice(0, 2) + '•'.repeat(newPassword.length - 2);
        localStorage.setItem('userPasswordDisplay', maskedPass);
        document.getElementById('userPassword').textContent = maskedPass;
        passwordChanged = true;
      } catch (error) {
        console.error('Ошибка изменения пароля:', error);
        showNotification('Не удалось изменить пароль');
        return;
      }
    }

    //обновление профиля (цитата, настроение, телефон)
    try {
      await axios.post('/update-profile.php', {
        login: userName,
        quote: quote,
        mood: mood,
        phone: phone
      });

      //обновляем данные в памяти и localStorage
      userQuote = `«${quote || 'Пока нет цитаты'}»`;
      userMood = mood;
      userPhone = phone || '—';

      localStorage.setItem('userQuote', userQuote);
      localStorage.setItem('userMood', userMood);
      localStorage.setItem('userPhone', userPhone);

      //обновляем отображение на странице
      document.getElementById('quoteDisplay').textContent = userQuote;
      document.getElementById('moodDisplay').textContent = userMood;
      document.getElementById('userPhone').textContent = userPhone;

    } catch (error) {
      console.error('Не удалось сохранить профиль на сервере');
      showNotification('Ошибка сохранения профиля');
      return;
    }

    //скрываем форму
    editForm.style.display = 'none';
    overlay.style.display = 'none';

    showNotification(passwordChanged ? 'Пароль и профиль обновлены!' : 'Профиль обновлён!');
  });

  //выход
  document.getElementById('btnLogout').addEventListener('click', handleLogout);
});