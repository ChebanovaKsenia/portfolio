//МОДАЛЬНЫЕ ОКНА
function showModal(message, onConfirm = null, onCancel = null) {
  const oldModal = document.getElementById('customModal');
  if (oldModal) oldModal.remove();

  const overlay = document.createElement('div');
  overlay.id = 'modalOverlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 30, 60, 0.6);
    backdrop-filter: blur(5px);
    z-index: 10000;
  `;

  const modal = document.createElement('div');
  modal.id = 'customModal';
  modal.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(15px);
    border: 3px solid #949494;
    border-radius: 20px;
    padding: 30px;
    width: 300px;
    text-align: center;
    z-index: 10001;
    color: white;
    font-size: 18px;
  `;

  const messageEl = document.createElement('div');
  messageEl.textContent = message;
  messageEl.style.marginBottom = '25px';
  modal.appendChild(messageEl);

  const buttonGroup = document.createElement('div');
  buttonGroup.style.display = 'flex';
  buttonGroup.style.justifyContent = 'center';
  buttonGroup.style.gap = '15px';

  // Кнопка "Да" — только если есть onConfirm
  if (onConfirm) {
    const yesBtn = document.createElement('button');
    yesBtn.textContent = 'Да';
    yesBtn.style.cssText = `
      padding: 8px 16px;
      background: rgba(255,255,255,0.2);
      border: 2px solid white;
      border-radius: 10px;
      color: white;
      cursor: pointer;
      font-weight: bold;
    `;
    yesBtn.onmouseover = () => yesBtn.style.boxShadow = '1px 1px 10px white';
    yesBtn.onmouseout = () => yesBtn.style.boxShadow = 'none';
    yesBtn.onclick = () => {
      onConfirm();
      document.body.removeChild(overlay);
    };
    buttonGroup.appendChild(yesBtn);
  }

  // Кнопка "Нет" — всегда показываем, даже если onCancel не задан
  const noBtn = document.createElement('button');
  noBtn.textContent = onConfirm ? 'Нет' : 'ОК';
  noBtn.style.cssText = `
    padding: 8px 16px;
    background: rgba(255,255,255,0.2);
    border: 2px solid white;
    border-radius: 10px;
    color: white;
    cursor: pointer;
    font-weight: bold;
  `;
  noBtn.onmouseover = () => noBtn.style.boxShadow = '1px 1px 10px white';
  noBtn.onmouseout = () => noBtn.style.boxShadow = 'none';
  noBtn.onclick = () => {
    if (onCancel) onCancel();
    document.body.removeChild(overlay);
  };
  buttonGroup.appendChild(noBtn);

  modal.appendChild(buttonGroup);
  document.body.appendChild(overlay);
  overlay.appendChild(modal);
}

function showConfirm(message, onConfirm, onCancel = null) {
  showModal(message, onConfirm, onCancel);
}

function showInfo(message) {
  showModal(message);
}

function showConfirm(message, onConfirm, onCancel) {
  showModal(message, onConfirm, onCancel);
}

//авторизация + меню
document.addEventListener('DOMContentLoaded', function () {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (isLoggedIn)
     {
    initUserProfileMenu();
   }
    else {
    // кнопка "Войти"
    const authBtn = document.createElement('a');
    authBtn.href = '/html/index.html';
    authBtn.className = 'auth-login-btn';
    authBtn.textContent = 'Войти';
    authBtn.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      background: rgba(255, 255, 255, 0.2);
      border: 2px solid white;
      border-radius: 8px;
      color: white;
      padding: 8px 16px;
      cursor: pointer;
      font-weight: bold;
      text-decoration: none;
      backdrop-filter: blur(10px);
    `;
    authBtn.onmouseover = () => authBtn.style.boxShadow = '1px 1px 10px white';
    authBtn.onmouseout = () => authBtn.style.boxShadow = 'none';
    document.body.appendChild(authBtn);
  }

  //защита
  const voicedBtn = document.getElementById('voicedBtn');
  if (voicedBtn) {
    voicedBtn.addEventListener('click', function (e) {
      if (!isLoggedIn) {
        e.preventDefault();
        showInfo('Пожалуйста, войдите в аккаунт для озвучки книг.');
      }
    });
  }
});

//ВЫХОД
function handleLogout() {
  showConfirm(
    'Вы действительно хотите выйти?',
    () => {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userName');
      window.location.href = '/html/index.html';
    }
  );
}

function initUserProfileMenu() {
  const trigger = document.querySelector('.user-menu-trigger');
  const menu = document.querySelector('.user-menu');
  const overlay = document.getElementById('modalOverlay');
  const container = document.querySelector('.form', '.form2', '.form3'); 
  if (!trigger || !menu) return;

   const userName = localStorage.getItem('userName');

  menu.innerHTML = `
  <div class="menu-header">
      <span class="user-name">${userName}</span>
    </div>
    <a href="/html/home/home.html" class="menu-item">главная</a>
    <a href="/html/home/subscription.html" class="menu-item">подписка</a>
    <a href="/html/home/support.html" class="menu-item">поддержка</a>
    <a href="#" class="menu-item menu-item--logout" id="logoutLink">выход</a>
    
    <div class="theme-switch-wrapper">
      <label class="theme-switch">
        <input type="checkbox" id="theme-toggle">
        <span class="slider">
          <img src="/pictures/moon.png" class="theme-icon moon-icon">
          <img src="/pictures/sun.png" class="theme-icon sun-icon">
        </span>
      </label>
    </div>
  `;


  //открыть
  trigger.addEventListener('click', function(e) {
  e.stopPropagation();
  overlay.classList.toggle('show');
  menu.classList.toggle('show');
  container.classList.add('shifted');
});
//закрытие
overlay.addEventListener('click', function() {
  menu.classList.toggle('show');
  overlay.classList.remove('show');
  container.classList.remove('shifted');
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    menu.classList.toggle('show');
    overlay.classList.remove('show');
    container.classList.remove('shifted');
  }
});


  document.getElementById('logoutLink')?.addEventListener('click', function (e) {
    e.preventDefault();
    handleLogout();
  });
}