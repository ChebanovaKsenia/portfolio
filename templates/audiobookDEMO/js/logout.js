document.addEventListener('DOMContentLoaded', function() {
  //вызывается из shared.js при клике на "выход"
});

//функция выхода(вызывается из shared.js)
function handleLogout() {
  if (confirm('Выйти из аккаунта?')) {
    //очистка данных
    localStorage.removeItem('savedLogin');
    localStorage.removeItem('savedPassword');
    localStorage.removeItem('theme'); // опционально
    
    //перенаправляем на вход
    window.location.href = '/html/index.html';
  }
}