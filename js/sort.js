'use strict';
(function () {

  var filterList = document.querySelector('.map__filters');
  var housingType = filterList.querySelector('#housing-type');

  var filtersAnnouncement = function (announcements) {
    housingType.addEventListener('change', function () {

      var listByTypeOfHousing = announcements.filter(function (pin) {
        if (housingType.value === 'any') {
          return pin.offer.type;
        }
        return pin.offer.type === housingType.value;
      });

      window.pins.remove();
      window.card.remove();
      window.pins.render(listByTypeOfHousing);
    });
  };

  window.sort = {
    filters: filtersAnnouncement
  };

})();
