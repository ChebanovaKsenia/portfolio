document.addEventListener('DOMContentLoaded', function () {
     //ОКНО ПРАВИЛ
const rulesLink = document.getElementById('rules');
const modal = document.getElementById('rulesModal');
const overlay = document.getElementById('modalOverlay');
const closeBtn = document.getElementById('closeRules');
const container = document.querySelector('.form2'); 

//открытие
rulesLink.addEventListener('click', function(e) {
  e.preventDefault();
  modal.classList.add('show');
  overlay.classList.add('show');
  container.classList.add('shifted');
});
//закрытие
closeBtn.addEventListener('click', function() {
  modal.classList.remove('show');
  overlay.classList.remove('show');
  container.classList.remove('shifted');
});
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