                    //НОЧНОЕ НЕБО
function createNightSky() {
  //удалить прошлое + светлую тему
  document.querySelectorAll('.clouds-day').forEach(el => el.remove());
}

                    //ДНЕВНОЕ НЕБО 
function createDaySky() {
  document.querySelectorAll('.clouds-day').forEach(el => el.remove());
}
//ПРИМЕНЕНИЕ ТЕМЫ
function applyTheme(theme) {
  const body = document.body;
  body.classList.remove('light-theme', 'dark-theme');
  body.classList.add(theme === 'light' ? 'light-theme' : 'dark-theme');
  localStorage.setItem('theme', theme);
}
//ОБНОВЛЕНИЕ ФОНА ПОД ТЕКУЩУЮ ТЕМУ
function updateBackground() {
  const theme = localStorage.getItem('theme') || 'dark';
  if (theme === 'light') {
    createDaySky();
  } else {
    createNightSky();
  }
}

//ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
function initPage() {
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  
  applyTheme(savedTheme);
  updateBackground();
  
  if (themeToggle) {
    themeToggle.checked = (savedTheme === 'light');
    themeToggle.addEventListener('change', function() {
      const newTheme = this.checked ? 'light' : 'dark';
      applyTheme(newTheme);
      updateBackground();
    });
  }
}

//синхронизация
window.addEventListener('storage', function(e) {
  if (e.key === 'theme') {
    // Обновляем класс темы
    const body = document.body;
    body.classList.remove('light-theme', 'dark-theme');
    body.classList.add(e.newValue === 'light' ? 'light-theme' : 'dark-theme');
    // Обновляем фон
    updateBackground();
  }
});
// Запуск
document.addEventListener('DOMContentLoaded', initPage);