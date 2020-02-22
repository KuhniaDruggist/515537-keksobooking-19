'use strict';

var APARTMENTS = ['palace', 'flat', 'house', 'bungalo'];
var TypeOfHouse = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
};
var TIMES = ['12:00', '13:00', '14:00'];
var PIN_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PIN_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var WIDTH_MAIN_PIN = 65;
var HEIGHT_MAIN_PIN = 65;
var HEIGHT_SHARP_MAIN_POINT = 22;
var SOURCE_X_COORDINATA_MAIN_PIN = 570;
var SOURCE_Y_COORDINATA_MAIN_PIN = 375;

var MAX_PIN = 8;
var X_AXIS_OFFSET = 25;
var Y_AXIS_OFFSET = 70;

var ENTER_KEY = 'Enter';
var LEFT_MOUSE_BUTTON = 0;

var map = document.querySelector('.map');

var activationButton = map.querySelector('.map__pin--main');

var filterMapForm = document.querySelector('.map__filters');

var filterMapSelect = filterMapForm.querySelectorAll('select');
filterMapSelect.forEach(function (n) {
  n.setAttribute('disabled', 'disabled');
});

var filterMapFieldset = filterMapForm.querySelectorAll('fieldset');
filterMapFieldset.forEach(function (n) {
  n.setAttribute('disabled', 'disabled');
});

var newNoticeForm = document.querySelector('.ad-form');
var newNoticeFieldset = newNoticeForm.querySelectorAll('fieldset');
newNoticeFieldset.forEach(function (n) {
  n.setAttribute('disabled', 'disabled');
});
var addressInput = newNoticeForm.querySelector('#address');
addressInput.value = (SOURCE_X_COORDINATA_MAIN_PIN + WIDTH_MAIN_PIN * 0.5)
+ ', '
+ (SOURCE_Y_COORDINATA_MAIN_PIN + HEIGHT_MAIN_PIN * 0.5);

var similarListPin = document.querySelector('.map__pins');

var similarPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var similarAnnouncementCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

var similarFilters = document.querySelector('.map__filters-container');

var getRandomNumberInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomArray = function (arr) {
  var elements = [];
  for (var i = 0; i < arr.length; i++) {
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
        address: coordinateX + ', ' + coordinateY,
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

var renderAnnouncementCard = function (card) {
  var cardElement = similarAnnouncementCardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__avatar').src = card.author.avatar;
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;

  cardElement.querySelector('.popup__text--price')
    .textContent = card.offer.price ? card.offer.price + '₽/ночь' : '';

  cardElement.querySelector('.popup__type').textContent = TypeOfHouse[card.offer.type];

  cardElement.querySelector('.popup__text--capacity')
    .textContent = (card.offer.rooms && card.offer.guests) ? card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей' : '';

  cardElement.querySelector('.popup__text--time')
    .textContent = (card.offer.checkin && card.offer.checkout) ? 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout : '';

  if (card.offer.features) {
    for (var i = 0; i < card.offer.features.length; i++) {
      if (card.offer.features[i] && card.offer.features.length) {
        cardElement.querySelector('.popup__feature--' + card.offer.features[i]).textContent = card.offer.features[i];
      }
    }
  } else {
    cardElement.querySelector('.popup__features').innerHTML = '';
  }

  if (card.offer.photos && card.offer.photos.length) {
    cardElement.querySelector('.popup__photos').innerHTML = '';
    var photosList = cardElement.querySelector('.popup__photos');
    for (var j = 0; j < card.offer.photos.length; j++) {
      var photoElement = document.createElement('img');
      photoElement.src = card.offer.photos[j];
      photoElement.className = 'popup__photo';
      photoElement.setAttribute('width', '45');
      photoElement.setAttribute('height', '40');
      photosList.appendChild(photoElement);
    }
  } else {
    cardElement.querySelector('.popup__photos').innerHTML = '';
  }

  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  return cardElement;
};

var activatesThePage = function () {
  map.classList.remove('map--faded');
  similarListPin.appendChild(renderPins());
  similarFilters.before(renderAnnouncementCard(announcements[0]));

  filterMapSelect.forEach(function (n) {
    n.removeAttribute('disabled', 'disabled');
  });

  filterMapFieldset.forEach(function (n) {
    n.removeAttribute('disabled', 'disabled');
  });

  newNoticeForm.classList.remove('ad-form--disabled');

  newNoticeFieldset.forEach(function (n) {
    n.removeAttribute('disabled', 'disabled');
  });
};

var setSharpPointCoordinates = function () {
  addressInput.value = (SOURCE_X_COORDINATA_MAIN_PIN + WIDTH_MAIN_PIN * 0.5)
  + ', '
  + (SOURCE_Y_COORDINATA_MAIN_PIN + HEIGHT_MAIN_PIN + HEIGHT_SHARP_MAIN_POINT);
};

activationButton.addEventListener('mousedown', function (evt) {
  if (typeof evt === 'object') {
    switch (evt.button) {
      case LEFT_MOUSE_BUTTON:
        activatesThePage();
        setSharpPointCoordinates();
        break;
    }
  }
});

activationButton.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    activatesThePage();
    setSharpPointCoordinates();
  }
});

var roomNumber = newNoticeForm.querySelector('#room_number');
var capacity = newNoticeForm.querySelector('#capacity');
for (var i = 0; i < capacity.length; i++) {
  capacity.children[i].setAttribute('disabled', 'disabled');
}
capacity.children[2].removeAttribute('disabled', 'disabled');
capacity.children[2].setAttribute('selected', 'selected');

roomNumber.addEventListener('change', function () {
  var currentVal = roomNumber.value;
  for (var j = capacity.children.length - 2; j >= 0; j--) {
    if (currentVal === '1') {
      capacity.children[j].setAttribute('disabled', 'disabled');
      capacity.children[2].removeAttribute('disabled', 'disabled');
      capacity.children[2].setAttribute('selected', 'selected');
      capacity.children[capacity.children.length - 1].removeAttribute('selected', 'selected');
    } else if (currentVal === '2') {
      capacity.children[j].removeAttribute('disabled', 'disabled');
      capacity.children[0].setAttribute('disabled', 'disabled');
      capacity.children[capacity.children.length - 1].setAttribute('disabled', 'disabled');
      capacity.children[capacity.children.length - 1].removeAttribute('selected', 'selected');
    } else if (currentVal === '3') {
      capacity.children[0].setAttribute('disabled', 'disabled');
      capacity.children[j].removeAttribute('disabled', 'disabled');
      capacity.children[capacity.children.length - 1].setAttribute('disabled', 'disabled');
      capacity.children[capacity.children.length - 1].removeAttribute('selected', 'selected');

    } else if (currentVal === '100') {
      capacity.children[j].setAttribute('disabled', 'disabled');
      capacity.children[capacity.children.length - 1].removeAttribute('disabled', 'disabled');
      capacity.children[capacity.children.length - 1].setAttribute('selected', 'selected');
    }
  }
});
