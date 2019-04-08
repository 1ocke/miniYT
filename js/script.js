// Находим инпут, который меняет тему на темную, а также кнопку 'загрузить еще' и модальное окно
// (где будет запускаться видос), и все классы с видео
const switcher = document.querySelector('#cbx'),
      more     = document.querySelector('.more'),
      modal    = document.querySelector('.modal'),
      videos   = document.querySelectorAll('.videos__item');
// Те видео, которые будут выводиться на экран
let player;

// Делаем меню. trigger - то, куда кликаем. boxBody - тело появляющегося элемента(родителя)
// сontent - то, что будет всплывать. openClass - присваеваемый класс
function bindSlideToggle(trigger, boxBody, content, openClass) {
    let button = {
        'element': document.querySelector(trigger),
        'active': false
    };

    const box        = document.querySelector(boxBody),
          boxContent = document.querySelector(content);

    button.element.addEventListener('click', () => {
        if (button.active === false) {                         // Проверяем не активно ли меню
            button.active = true;                              // Если нет, то делаем активным
            box.style.height = boxContent.clientHeight + 'px'; //Берем высоту родителя
            box.classList.add(openClass);                      // Активный класс для слайда
        } else {
            button.active = false;                             // И наоборот
            box.style.height = 0 + 'px';
            box.classList.remove(openClass);
        }
    });
}

bindSlideToggle('.hamburger', '[data-slide="nav"]', '.header__menu', 'slide-active');

// Переключение в темную тему

function switchMode() {
    if (night === false) {
        night = true;
        document.body.classList.add('night');

        document.querySelectorAll('.hamburger > line').forEach(item => {
            item.style.stroke = '#ffffff';
        });

        document.querySelectorAll('.videos__item-descr').forEach(item => {
            item.style.color = '#ffffff';
        });

        document.querySelectorAll('.videos__item-views').forEach(item => {
            item.style.color = '#ffffff';
        });

        document.querySelector('.header__item-descr').style.color = '#ffffff';
        document.querySelector('.logo > img').src= 'logo/youtube_night.svg';
    } else {
        night = false;
        document.body.classList.remove('night');
        document.querySelectorAll('.hamburger > line').forEach(item => {
            item.style.stroke = '#000000';
        });
        document.querySelectorAll('.videos__item-descr').forEach(item => {
            item.style.color = '#000000';
        });
        document.querySelectorAll('.videos__item-views').forEach(item => {
            item.style.color = '#000000';
        });
        document.querySelector('.header__item-descr').style.color = '#000000';
        document.querySelector('.logo > img').src= 'logo/youtube.svg';
    }
}

let night = false;

switcher.addEventListener('change', () => {
    switchMode();
});

