document.addEventListener('DOMContentLoaded', function() {
});

//функция выхода
function handleLogout() {
  if (confirm('Выйти из аккаунта?')) {
    localStorage.clear();
    
    //перенаправляем
    window.location.href = '/html/login.html';
  }
}