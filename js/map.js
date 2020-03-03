'use strict';
(function () {

  var map = document.querySelector('.map');
  var mapFields = document.querySelector('.map__filters').children;

  var activationButton = map.querySelector('.map__pin--main');

  var newNoticeForm = document.querySelector('.ad-form');
  var newNoticeFields = newNoticeForm.children;

  var toggleFieldsAvailability = function (elements, status) {
    Array.from(elements).forEach(function (n) {
      n.disabled = status;
    });
  };

  toggleFieldsAvailability(mapFields, true);
  toggleFieldsAvailability(newNoticeFields, true);

  var similarListPin = document.querySelector('.map__pins');
  var similarFilters = document.querySelector('.map__filters-container');

  var activatePage = function () {
    map.classList.remove('map--faded');
    similarListPin.appendChild(window.pins.render());
    similarFilters.before(window.card.render(window.announcements.render()[0]));
    document.addEventListener('keydown', window.card.addCondition);
    toggleFieldsAvailability(mapFields, false);
    toggleFieldsAvailability(newNoticeFields, false);

    newNoticeForm.classList.remove('ad-form--disabled');
  };

  var onActButtonMousedown = function (evt) {
    window.utils.isPressLeftMouse(evt, true);
    activationButton.removeEventListener('mousedown', onActButtonMousedown);
  }

  var onActButtonEnter = function (evt) {
    window.utils.isPressEnterActivationButton(evt, true);
    activationButton.removeEventListener('keydown', onActButtonEnter);
  }

  activationButton.addEventListener('mousedown', onActButtonMousedown);
  activationButton.addEventListener('keydown', onActButtonEnter);

  window.map = {
    activate: activatePage
  };

})();
