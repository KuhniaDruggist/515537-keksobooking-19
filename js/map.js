'use strict';
(function () {

  var map = document.querySelector('.map');
  var mapFields = document.querySelector('.map__filters').children;

  var activationButton = map.querySelector('.map__pin--main');
  var START_COORDS_X_MAIN_PIN = activationButton.offsetLeft;
  var START_COORDS_Y_MAIN_PIN = activationButton.offsetTop;

  var newNoticeForm = document.querySelector('.ad-form');
  var newNoticeFields = newNoticeForm.children;

  var toggleFieldsAvailability = function (elements, status) {
    Array.from(elements).forEach(function (n) {
      n.disabled = status;
    });
  };

  toggleFieldsAvailability(mapFields, true);
  toggleFieldsAvailability(newNoticeFields, true);

  var onActButtonMousedown = function (evt) {
    window.utils.isPressLeftMouse(evt, true, START_COORDS_X_MAIN_PIN, START_COORDS_Y_MAIN_PIN);
  };

  var onActButtonEnter = function (evt) {
    window.utils.isPressEnterActivationButton(evt, true);
    activationButton.removeEventListener('keydown', onActButtonEnter);
  };

  var activatePage = function () {
    map.classList.remove('map--faded');

    var cachedPins = [];
    window.backend.getData(function (pins) {
      cachedPins = pins;
      window.pins.render(cachedPins);
    });

    document.addEventListener('keydown', window.card.addCondition);
    toggleFieldsAvailability(mapFields, false);
    toggleFieldsAvailability(newNoticeFields, false);

    newNoticeForm.classList.remove('ad-form--disabled');
    activationButton.removeEventListener('mousedown', onActButtonMousedown);
  };

  activationButton.addEventListener('mousedown', onActButtonMousedown);
  activationButton.addEventListener('keydown', onActButtonEnter);

  window.map = {
    activate: activatePage
  };

})();
