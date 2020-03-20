'use strict';
(function () {

  var HousingTypeFildValue = {
    ANY: 'any',
    MIDDLE: 'middle',
    LOW: 'low',
    HIGH: 'high'
  };

  var filterList = document.querySelector('.map__filters');
  var housingType = filterList.querySelector('#housing-type');
  var housingPrice = filterList.querySelector('#housing-price');
  var housingRooms = filterList.querySelector('#housing-rooms');
  var housingGuests = filterList.querySelector('#housing-guests');
  var filterWifi = filterList.querySelector('#filter-wifi');
  var filterDishwasher = filterList.querySelector('#filter-dishwasher');
  var filterParking = filterList.querySelector('#filter-parking');
  var filterWasher = filterList.querySelector('#filter-washer');
  var filterElevator = filterList.querySelector('#filter-elevator');
  var filterConditioner = filterList.querySelector('#filter-conditioner');


  var getFilterType = function (pin) {
    if (housingType.value === HousingTypeFildValue.ANY) {
      return pin.offer.type;
    }
    return pin.offer.type === housingType.value;
  };

  var getFilterPrice = function (pin) {
    if (housingPrice.value === HousingTypeFildValue.ANY) {
      return pin.offer.price;
    } else if (housingPrice.value === HousingTypeFildValue.MIDDLE) {
      return pin.offer.price >= 10000 && pin.offer.price <= 50000;
    } else if (housingPrice.value === HousingTypeFildValue.LOW) {
      return pin.offer.price < 10000;
    } else if (housingPrice.value === HousingTypeFildValue.HIGH) {
      return pin.offer.price > 50000;
    }
    return pin.offer.price;
  };

  var getFilterRooms = function (pin) {
    if (housingRooms.value === HousingTypeFildValue.ANY) {
      return String(pin.offer.rooms);
    }
    return String(pin.offer.rooms) === housingRooms.value;
  };

  var getFilterGuests = function (pin) {
    if (housingGuests.value === HousingTypeFildValue.ANY) {
      return String(pin.offer.guests);
    }
    return String(pin.offer.guests) === housingGuests.value;
  };

  var filterCheck = function (fild, arr) {
    if (fild.checked) {
      arr.push(fild.value);
    }
  };

  var getFilterFeature = function (pin) {
    var featuresList = [];

    filterCheck(filterWifi, featuresList);
    filterCheck(filterDishwasher, featuresList);
    filterCheck(filterParking, featuresList);
    filterCheck(filterWasher, featuresList);
    filterCheck(filterElevator, featuresList);
    filterCheck(filterConditioner, featuresList);

    for (var i = 0; i < featuresList.length; i++) {
      if (pin.offer.features.indexOf(featuresList[i]) === -1) {
        return false;
      }
    }
    return true;
  };

  var filterPinsData = function (announcements) {
    var data = announcements.filter(function (pin) {
      return (getFilterType(pin) && getFilterPrice(pin) && getFilterRooms(pin) && getFilterGuests(pin) && getFilterFeature(pin));
    });
    return data;
  };

  var filtersAnnouncement = function (announcements) {
    window.pins.render(announcements);
    filterList.addEventListener('change', function () {
      window.pins.remove();
      window.card.remove();
      window.pins.render(filterPinsData(announcements));
    });
  };

  window.sort = {
    filters: filtersAnnouncement
  };

})();
