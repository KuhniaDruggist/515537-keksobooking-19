'use strict';
(function () {

  var filterList = document.querySelector('.map__filters');
  var housingType = filterList.querySelector('#housing-type');

  var filtersAnnouncement = function (announcements) {
    housingType.addEventListener('change', function () {
      if (housingType.value === 'any') {
        window.pins.remove();
        window.card.remove();
        window.pins.render(announcements);
      } else {
        var newListAnnouncements = announcements.filter(function (pin) {
          return pin.offer.type === housingType.value;
        });
        window.pins.remove();
        window.card.remove();
        window.pins.render(newListAnnouncements);
      }
    });
  };

  window.sort = {
    filters: filtersAnnouncement
  };

})();
