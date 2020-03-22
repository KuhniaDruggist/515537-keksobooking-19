'use strict';
(function () {

  var START_COORDS_X_MAIN_PIN = activationButton.offsetLeft;
  var START_COORDS_Y_MAIN_PIN = activationButton.offsetTop;

  var map = document.querySelector('.map');
  var mapFields = document.querySelector('.map__filters').children;

  var activationButton = map.querySelector('.map__pin--main');

  var newNoticeForm = document.querySelector('.ad-form');
  var newNoticeFields = newNoticeForm.children;

  var toggleFieldsAvailability = function (elements, status) {
    Array.from(elements).forEach(function (element) {
      element.disabled = status;
    });
  };

  toggleFieldsAvailability(mapFields, true);
  toggleFieldsAvailability(newNoticeFields, true);

  var onActButtonMousedown = function (evt) {
    window.utils.isPressLeftMouse(evt, true, START_COORDS_X_MAIN_PIN, START_COORDS_Y_MAIN_PIN);
  };

  var onActButtonEnter = function (evt) {
    window.utils.isPressEnterActivationButton(evt, true, START_COORDS_X_MAIN_PIN, START_COORDS_Y_MAIN_PIN);
    activationButton.removeEventListener('keydown', onActButtonEnter);
  };

  var activatePage = function () {
    map.classList.remove('map--faded');

    var cachedPins = [];
    window.backend.getData(function (pins) {
      cachedPins = pins;
      window.sort.filters(cachedPins);
    });

    toggleFieldsAvailability(mapFields, false);
    toggleFieldsAvailability(newNoticeFields, false);

    newNoticeForm.classList.remove('ad-form--disabled');
    activationButton.removeEventListener('mousedown', onActButtonMousedown);
    activationButton.removeEventListener('keydown', onActButtonEnter);
  };

  var inactivatePage = function () {
    newNoticeForm.reset();

    map.classList.add('map--faded');
    newNoticeForm.classList.add('ad-form--disabled');

    window.map.inactivateFields(mapFields, true);
    window.map.inactivateFields(newNoticeFields, true);

    window.form.setAddressValue(false, START_COORDS_X_MAIN_PIN, START_COORDS_Y_MAIN_PIN);

    window.pins.remove();
    window.card.remove();

    window.message.openSuccess();

    activationButton.addEventListener('mousedown', onActButtonMousedown);
    activationButton.addEventListener('keydown', onActButtonEnter);
  };

  activationButton.addEventListener('mousedown', onActButtonMousedown);
  activationButton.addEventListener('keydown', onActButtonEnter);

  window.map = {
    activate: activatePage,
    inactivate: inactivatePage,
    inactivateFields: toggleFieldsAvailability
  };

})();
