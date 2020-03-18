'use strict';
(function () {

  var HousingTypeFildValue = {
    ANY: 'any'
  };

  var filterList = document.querySelector('.map__filters');
  var housingType = filterList.querySelector('#housing-type');

  var filterPins = function (announcements) {
    var listByTypeOfHousing = announcements.filter(function (pin) {
      if (housingType.value === HousingTypeFildValue.ANY) {
        return pin.offer.type;
      }
      return pin.offer.type === housingType.value;
    });
    return listByTypeOfHousing;
  };

  var filtersAnnouncement = function (announcements) {
    window.pins.render(announcements);
    housingType.addEventListener('change', function () {
      window.pins.remove();
      window.card.remove();
      window.pins.render(filterPins(announcements));
    });
  };

  window.sort = {
    filters: filtersAnnouncement
  };

})();
