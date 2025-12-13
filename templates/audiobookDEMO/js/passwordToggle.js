document.addEventListener('DOMContentLoaded', function () {
  const singleToggle = document.getElementById('lockIcon'); //иконка в логине
  const allToggle = document.getElementById('allLockIcon'); //иконка в регистре

  let isVisible = false;

  //вход (1 поле) 
  if (singleToggle) {
    const inputPassword = document.getElementById('inputPassword');
    if (inputPassword) {
      singleToggle.addEventListener('click', function () {
        isVisible = !isVisible;
        inputPassword.type = isVisible ? 'text' : 'password';
        this.classList.add('shrink');
        setTimeout(() => {
          this.classList.remove('shrink');
        }, 250);
      });
    }
  }

  //регистрация (2 поля)
  if (allToggle) {
    const pass1 = document.getElementById('inputPassword');
    const pass2 = document.getElementById('inputConfirmPassword');

    if (pass1 && pass2) {
      allToggle.addEventListener('click', function () {
        isVisible = !isVisible;
        pass1.type = isVisible ? 'text' : 'password';
        pass2.type = isVisible ? 'text' : 'password';
        this.classList.add('shrink');
        setTimeout(() => {
          this.classList.remove('shrink');
        }, 250);
      });
    }
  }
});