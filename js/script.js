// Находим инпут, который меняет тему на темную, а также кнопку 'загрузить еще' и модальное окно
// (где будет запускаться видос), и все классы с видео
const switcher = document.querySelector('#cbx'),
      more     = document.querySelector('.more'),
      modal    = document.querySelector('.modal'),
      videos   = document.querySelectorAll('.videos__item'),
      videosWrapper = document.querySelector('.videos__wrapper');
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
        // У лого обычного и для темной темы разная высота, из-за этого прыгает верстка при
        // переключении. Пришлось изменить у лого для темной темы высоту
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

// Создание новых видео

// const data = [
//     ['img/thumb_3.webp', 'img/thumb_4.webp', 'img/thumb_5.webp'],
//     ['#3 Верстка на flexbox CSS | Блок преимущества и галерея | Марафон верстки | Артем Исламов', 
//     '#2 Установка spikmi и работа с ветками на Github | Марафон вёрстки Урок 2', 
//     '#1 Верстка реального заказа landing Page | Марафон вёрстки | Артём Исламов'],
//     ['3,6 тыс. просмотров', '4,2 тыс. просмотров', '28 тыс. просмотров'],
//     ['X9SmcY3lM-U', '7BvHoh0BrMw', 'mC8JW_aG2EM']
// ];

// more.addEventListener('click', () => {
//     const videosWrapper = document.querySelector('.videos__wrapper');
//     more.remove();

//     for (let i = 0; i < data[0].length; i++) {
//         let card = document.createElement('a');
//         card.classList.add('videos__item', 'videos__item-active');
//         card.setAttribute('data-url', data[3][i]);
//         card.innerHTML = `
//             <img src="${data[0][i]}" alt="thumb">
//             <div class="videos__item-descr">
//                 ${data[1][i]}
//             </div>
//             <div class="videos__item-views">
//                 ${data[2][i]}
//             </div>
//         `;

//         videosWrapper.appendChild(card);
//         setTimeout(() => {
//             card.classList.remove('videos__item-active');
//         }, 10);

//         if (night) { // Фикс темного режима при загрузке новых видео
    
//             document.querySelectorAll('.videos__item-descr').forEach(item => {
//                 item.style.color = '#ffffff';
//             });
    
//             document.querySelectorAll('.videos__item-views').forEach(item => {
//                 item.style.color = '#ffffff';
//             });
//         }

//         bindNewModal(card);
//     }

//     sliceTitle('.videos__item-descr', 100);  // Обрезаются заголовки загруженных видео
// });

// Data API загружаем видео с ютуба

function start() {
	gapi.client.init({
		'apiKey': 'AIzaSyDZ_HqCJJ1aahZbeh8PrtKe5XqYNiS-Y0E',
		'discoveryDocs': ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"]
	}).then(function() {
		return gapi.client.youtube.playlistItems.list({
			"part": "snippet,contentDetails",
			"maxResults": '6',
			"playlistId": "PL3LQJkGQtzc4gsrFkm4MjWhTXhopsMgpv"
		});
	}).then(function(response) {
		console.log(response.result);
		

		response.result.items.forEach(item => {
			let card = document.createElement('a');

			card.classList.add('videos__item', 'videos__item-active');
			card.setAttribute('data-url', item.contentDetails.videoId);

			card.innerHTML = `
				<img src="${item.snippet.thumbnails.high.url}" alt="thumb">
				<div class="videos__item-descr">
					${item.snippet.title}
				</div>
				<div class="videos__item-views">
					2.7 тыс. просмотров
				</div>
			`;
			videosWrapper.appendChild(card);
			setTimeout(() => {
				card.classList.remove('videos__item-active');
			}, 10);
			if (night === true) {
				card.querySelector('.videos__item-descr').style.color = '#fff';
				card.querySelector('.videos__item-views').style.color = '#fff';
			}
		});

		sliceTitle('.videos__item-descr', 80);
		bindModal(document.querySelectorAll('.videos__item'));

	}).catch( e => {
		console.log(e);
	});
}

more.addEventListener('click', () => {
	more.remove();
	gapi.load('client', start);
});

function search(target) {
	gapi.client.init({
		'apiKey': 'AIzaSyDZ_HqCJJ1aahZbeh8PrtKe5XqYNiS-Y0E',
		'discoveryDocs': ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"]
	}).then(function() {
		return	gapi.client.youtube.search.list({
			'maxResults': '10',
			'part': 'snippet',
			'q': `${target}`,
			'type': ''
		});
	}).then(function(response) {
		console.log(response.result);
		// videosWrapper.innerHTML = '';
		while (videosWrapper.firstChild) {
			videosWrapper.removeChild(videosWrapper.firstChild);
		}

		response.result.items.forEach(item => {
			let card = document.createElement('a');

			card.classList.add('videos__item', 'videos__item-active');
			card.setAttribute('data-url', item.id.videoId);

			card.innerHTML = `
                <img src="${item.snippet.thumbnails.high.url}" alt="thumb">
                <div class="videos__item-descr">
                    ${item.snippet.title}
                </div>
                <div class="videos__item-views">
                    2.7 тыс. просмотров
                </div>
            `;
			videosWrapper.appendChild(card);
			setTimeout(() => {
				card.classList.remove('videos__item-active');
			}, 10);
			if (night === true) {
				card.querySelector('.videos__item-descr').style.color = '#fff';
				card.querySelector('.videos__item-views').style.color = '#fff';
			}
		});

		sliceTitle('.videos__item-descr', 80);
		bindModal(document.querySelectorAll('.videos__item'));
	});
}

document.querySelector('.search').addEventListener('submit', (e) => {
	e.preventDefault();
	gapi.load('client', () => {
		search(document.querySelector('.search > input').value);
	});
	document.querySelector('.search > input').value = '';
});

// Обрезаем заголовки

function sliceTitle(selector, count) {
    document.querySelectorAll(selector).forEach(item => {
        item.textContent.trim(); // Обрезает лишние пробелы

        if (item.textContent.length < count) { // Если длина строки, меньше 100
            return;                                   // То ничего не происходит
        } else {
            const str = item.textContent.slice(0, count + 1) + '...'; // Если больше, то
            item.textContent = str;                                   // строка от 0 до count
        }
    });
}

sliceTitle('.videos__item-descr', 80);

// Открытые модального окна

function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
    player.stopVideo();  // Закрываем видео, после закрытия модалки
}

function bindModal(cards) {
    cards.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const id = item.getAttribute('data-url'); //Получаем id от наших видео
            loadVideo(id); // Загружаем id в API
            openModal();
        });
    });
}

function bindNewModal(card) {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        const id = card.getAttribute('data-url'); //Получаем id от наших видео
        loadVideo(id); // Загружаем id в API
        openModal();
    });
}

// Закрытие модального окна, нажатием вне его области

modal.addEventListener('click', (e) => {
    if (!e.target.classList.contains('modal__body')) {  // Отслеживаем клик. Клик вне modal__body
        closeModal();
    }
});

// Закрытие модального окна через escape

document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
        closeModal();
    }
}); 

// Работа с youtube iframe API. Добавляем скрипт с ютуба.

function createVideo() {
    var tag = document.createElement('script');

    // Создает тег скрипт, помещает его перед основным скриптом.

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    setTimeout(() => {
        player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: 'M7lc1UVf-VE'
          });
    }, 300);
}

createVideo();

function loadVideo(id) {
    player.loadVideoById({
        videoId: `${id}`
    });
}