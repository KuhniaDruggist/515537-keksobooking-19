'use strict';
(function () {

  var TypeOfHouse = {
    BUNGALO: 'Бунгало',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    PALACE: 'Дворец'
  };

  var similarFilters = document.querySelector('.map__filters-container');
  var similarAnnouncementCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var cardElement = similarAnnouncementCardTemplate.cloneNode(true);
  var buttonClose = cardElement.querySelector('.popup__close');

  var renderAnnouncementCard = function (card, number) {
    cardElement.querySelector('.popup__avatar').src = card[number].author.avatar;
    cardElement.querySelector('.popup__title').textContent = card[number].offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card[number].offer.address;

    cardElement.querySelector('.popup__text--price')
      .textContent = card[number].offer.price ? card[number].offer.price + '₽/ночь' : '';

    cardElement.querySelector('.popup__type').textContent = TypeOfHouse[card[number].offer.type.toUpperCase()];

    cardElement.querySelector('.popup__text--capacity')
      .textContent = (card[number].offer.rooms && card[number].offer.guests) ? card[number].offer.rooms + ' комнаты для ' + card[number].offer.guests + ' гостей' : '';

    cardElement.querySelector('.popup__text--time')
      .textContent = (card[number].offer.checkin && card[number].offer.checkout) ? 'Заезд после ' + card[number].offer.checkin + ', выезд до ' + card[number].offer.checkout : '';

    if (card[number].offer.features) {
      for (var i = 0; i < card[number].offer.features.length; i++) {
        if (card[number].offer.features[i] && card[number].offer.features.length) {
          cardElement.querySelector('.popup__feature--' + card[number].offer.features[i]).textContent = card[number].offer.features[i];
        }
      }
    } else {
      cardElement.querySelector('.popup__features').innerHTML = '';
    }

    if (card[number].offer.photos && card[number].offer.photos.length) {
      cardElement.querySelector('.popup__photos').innerHTML = '';
      var photosList = cardElement.querySelector('.popup__photos');
      for (var j = 0; j < card[number].offer.photos.length; j++) {
        var photoElement = document.createElement('img');
        photoElement.src = card[number].offer.photos[j];
        photoElement.className = 'popup__photo';
        photoElement.setAttribute('width', '45');
        photoElement.setAttribute('height', '40');
        photosList.appendChild(photoElement);
      }
    } else {
      cardElement.querySelector('.popup__photos').innerHTML = '';
    }

    cardElement.querySelector('.popup__description').textContent = card[number].offer.description;

    similarFilters.prepend(cardElement);
  };

  var onCardEscPress = function (evt) {
    window.utils.isPressEsc(evt, closeCard);
  };

  var closeCard = function () {
    cardElement.classList.add('hidden');
    document.removeEventListener('keydown', onCardEscPress);
  };

  var openCard = function () {
    cardElement.classList.remove('hidden');
  };

  buttonClose.addEventListener('click', function () {
    closeCard();
  });

  buttonClose.addEventListener('keydown', function (evt) {
    window.utils.isPressEnter(evt, closeCard);
  });

  cardElement.addEventListener('keydown', function (evt) {
    window.utils.isPressEsc(evt, closeCard);
  });

  window.card = {
    render: renderAnnouncementCard,
    open: openCard,
    close: closeCard,
    addCondition: onCardEscPress
  };

})();
