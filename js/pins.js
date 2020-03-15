'use strict';
(function () {

  var X_AXIS_OFFSET = 25;
  var Y_AXIS_OFFSET = 70;

  var MAX_NUMBER_OF_PIN = 5;

  var similarListPin = document.querySelector('.map__pins');
  var similarPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  var renderPin = function (pin) {
    var pinElement = similarPinTemplate.cloneNode(true);

    pinElement.style.left = pin.location.x + X_AXIS_OFFSET + 'px';
    pinElement.style.top = pin.location.y + Y_AXIS_OFFSET + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;
    pinElement.addEventListener('click', function () {
      window.card.render(pin);
      window.card.open();
      pinElement.addEventListener('keydown', function (evt) {
        window.utils.isPressEsc(evt, window.card.close);
      });
    });

    return pinElement;
  };

  var renderPins = function (pins) {
    var fragment = document.createDocumentFragment();
    var takeNumber = pins.length > MAX_NUMBER_OF_PIN ? MAX_NUMBER_OF_PIN : pins.length;
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderPin(pins[i], i));
    }
    similarListPin.appendChild(fragment);
  };

  var removePins = function () {
    var newPins = similarListPin.querySelectorAll('button[class="map__pin"]');
    Array.from(newPins).forEach(function (n) {
      n.remove();
    });
  };

  window.pins = {
    render: renderPins,
    remove: removePins
  };

})();
