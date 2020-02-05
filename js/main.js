'use strict';

var APARTMENTS = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var PIN_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PIN_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MAX_PIN = 8;
var X_AXIS_OFFSET = 25;
var Y_AXIS_OFFSET = 70;

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var similarListPin = document.querySelector('.map__pins');

var similarPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var getRandomNumberInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomArray = function (arr) {
  var elements = [];
  for (var i = 0; i <= arr.length; i++) {
    elements.push(getRandomElement(arr));
  }
  return elements;
};

var getMapWidth = function () {
  return document.querySelector('.map__overlay').offsetWidth;
};

var createAnnouncement = function () {
  var announcementList = [];
  for (var i = 1; i <= MAX_PIN; i++) {

    var coordinateX = getRandomNumberInRange(0, getMapWidth());
    var coordinateY = getRandomNumberInRange(130, 630);

    var announcement = {
      author: {
        avatar: 'img/avatars/user' + '0' + i + '.png',
      },

      offer: {
        title: 'Заголовок объявления',
        address: coordinateX + ',' + coordinateY,
        price: getRandomNumberInRange(10000, 100000),
        type: getRandomElement(APARTMENTS),
        rooms: 4,
        guests: 10,
        checkin: getRandomElement(TIMES),
        checkout: getRandomElement(TIMES),
        features: getRandomArray(PIN_FEATURES),
        description: 'Здесь будет описание вашего уютного жилища',
        photos: getRandomArray(PIN_PHOTOS),
      },

      location: {
        x: coordinateX,
        y: coordinateY,
      }
    };
    announcementList.push(announcement);
  }
  return announcementList;
};

var announcements = createAnnouncement();

var renderPin = function (pin) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style.left = pin.location.x + X_AXIS_OFFSET + 'px';
  pinElement.style.top = pin.location.y + Y_AXIS_OFFSET + 'px';
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