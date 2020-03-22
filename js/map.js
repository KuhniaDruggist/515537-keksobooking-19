'use strict';
(function () {

  var map = document.querySelector('.map');
  var mapFields = document.querySelector('.map__filters').children;

  var activationButton = map.querySelector('.map__pin--main');
  var startCoordsXMainPin = activationButton.offsetLeft;
  var startCoordsYMainPin = activationButton.offsetTop;

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
    window.utils.isPressLeftMouse(evt, true, startCoordsXMainPin, startCoordsYMainPin);
  };

  var onActButtonEnter = function (evt) {
    window.utils.isPressEnterActivationButton(evt, true, startCoordsXMainPin, startCoordsYMainPin);
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

    activationButton.style.left = startCoordsXMainPin + 'px';
    activationButton.style.top = startCoordsYMainPin + 'px';

    window.map.inactivateFields(mapFields, true);
    window.map.inactivateFields(newNoticeFields, true);

    window.form.setAddressValue(false, startCoordsXMainPin, startCoordsYMainPin);

    window.pins.remove();
    window.card.remove();

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
