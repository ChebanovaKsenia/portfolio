const lockIcon = document.querySelector('.lock-icon');
const passwordInput = document.getElementById('password');

lockIcon.addEventListener('click', function() {
  const isPasswordVisible = passwordInput.type === 'text';
  if (isPasswordVisible) {
    passwordInput.type = 'password';
  } else {
    passwordInput.type = 'text';
  }
  this.classList.add('shrink');
  setTimeout(() => {
    this.classList.remove('shrink');
  }, 250);
});