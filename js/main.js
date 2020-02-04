'use strict';

var apartments = ['palace', 'flat', 'house', 'bungalo'];
var times = ['12:00', '13:00', '14:00'];
var featureList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photoList = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var similarListPin = document.querySelector('.map__pins');

var similarPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var getRangeNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomNumber = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    var randomNumber = arr[Math.floor(Math.random() * arr.length)];
  }
  return randomNumber;
};

var getElementList = function (arr) {
  var elements = [];
  var numberToCompare = Math.floor(Math.random() * arr.length);
  for (var i = 0; i <= numberToCompare; i++) {
    var element = arr[i];
    elements.push(element);
  }
  return elements;
};

var getMapWidth = function () {
  return document.querySelector('.map__overlay').offsetWidth;
};

var createAnnouncement = function () {
  var announcementList = [];
  for (var i = 1; i <= 8; i++) {
    var announcement = {
      author: {
        avatar: 'img/avatars/user' + '0' + i + '.png',
      },

      offer: {
        title: 'Заголовок объявления',
        address: '600, 350',
        price: getRangeNumber(10000, 100000),
        type: getRandomNumber(apartments),
        rooms: 4,
        guests: 10,
        checkin: getRandomNumber(times),
        checkout: getRandomNumber(times),
        features: getElementList(featureList),
        description: 'Здесь будет описание вашего уютного жилища',
        photos: getElementList(photoList),
      },

      location: {
        x: getRangeNumber(0, getMapWidth()),
        y: getRangeNumber(130, 630),
      }
    };
    announcementList.push(announcement);
  }
  return announcementList;
};

var announcements = createAnnouncement();

var renderPin = function (pin) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style.left = pin.location.x + 'px';
  pinElement.style.top = pin.location.y + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;

  return pinElement;
};

var renderPins = function () {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < announcements.length; j++) {
    fragment.appendChild(renderPin(announcements[j]));
  }
  return fragment;
};

similarListPin.appendChild(renderPins());
