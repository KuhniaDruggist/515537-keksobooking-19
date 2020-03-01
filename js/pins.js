'use strict';
(function () {

  var X_AXIS_OFFSET = 25;
  var Y_AXIS_OFFSET = 70;

  var similarPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

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
    for (var i = 0; i < window.announcements.list().length; i++) {
      fragment.appendChild(renderPin(window.announcements.list()[i]));
    }
    return fragment;
  };

  window.pins = {
    list: renderPins
  };

})();
