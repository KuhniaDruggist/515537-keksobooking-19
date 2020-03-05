'use strict';
(function () {

  var TypeOfHouse = {
    BUNGALO: 'Бунгало',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    PALACE: 'Дворец'
  };
  var similarAnnouncementCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var cardElement = similarAnnouncementCardTemplate.cloneNode(true);
  var buttonClose = cardElement.querySelector('.popup__close');

  var renderAnnouncementCard = function (card) {
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;

    cardElement.querySelector('.popup__text--price')
      .textContent = card.offer.price ? card.offer.price + '₽/ночь' : '';

    cardElement.querySelector('.popup__type').textContent = TypeOfHouse[card.offer.type.toUpperCase()];

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
