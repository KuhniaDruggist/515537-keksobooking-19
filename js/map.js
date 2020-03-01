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
    similarListPin.appendChild(window.pins.list());
    similarFilters.before(window.card.annoucement(window.announcements.list()[0]));
    toggleFieldsAvailability(mapFields, false);
    toggleFieldsAvailability(newNoticeFields, false);

    newNoticeForm.classList.remove('ad-form--disabled');
  };

  activationButton.addEventListener('mousedown', function (evt) {
    window.utils.isLeftMouse(evt, true);
  });

  activationButton.addEventListener('keydown', function (evt) {
    window.utils.isPressEnter(evt, true);
  });

  window.map = {
    activPage: activatePage
  };

})();
