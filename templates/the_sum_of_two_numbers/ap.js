const answer = document.getElementById('answer');
           //объекты
let nums = [1, 2, 4, 10, 6, 3, 7];  //создаем массив
let target = 16;                    //создаем нужное нам число

            //шаги решения
for (let i = 0; i < nums.length - 1; i++){ //первый цикл
    for (let j = i + 1; j < nums.length; j++) {//второй цикл
        if(nums[i] + nums[j] === target){
             answer.innerHTML = "Найдены индексы: " + i +", "+ j +". Их сумма чисел равна " + target;
        }
    }
}

