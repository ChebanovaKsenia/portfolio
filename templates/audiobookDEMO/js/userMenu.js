document.addEventListener('DOMContentLoaded', function () {
     //ОКНО ПРАВИЛ
const rulesLink = document.getElementById('userMenuTrigger');
const modal = document.getElementById('userMenu');
const overlay = document.getElementById('modalOverlay');
const container = document.querySelector('.form'); 

//открытие
rulesLink.addEventListener('click', function(e) {
  e.preventDefault();
  modal.classList.add('show');
  overlay.classList.add('show');
  container.classList.add('shifted');
});
//закрытие
overlay.addEventListener('click', function() {
  modal.classList.remove('show');
  overlay.classList.remove('show');
  container.classList.remove('shifted');
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    modal.classList.remove('show');
    overlay.classList.remove('show');
    container.classList.remove('shifted');
  }
});
  });