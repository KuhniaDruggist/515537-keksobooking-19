'use strict';
(function () {

  var MAX_PINS_COUNT = 5;

  var filterList = document.querySelector('.map__filters');
  var housingType = filterList.querySelector('#housing-type');
  var housingPrice = filterList.querySelector('#housing-price');
  var housingRooms = filterList.querySelector('#housing-rooms');
  var housingGuests = filterList.querySelector('#housing-guests');

  var Features = {
    WIFI: filterList.querySelector('#filter-wifi'),
    DISHWASHER: filterList.querySelector('#filter-dishwasher'),
    PARKING: filterList.querySelector('#filter-parking'),
    WASHER: filterList.querySelector('#filter-washer'),
    ELEVATOR: filterList.querySelector('#filter-elevator'),
    CONDITIONER: filterList.querySelector('#filter-conditioner')
  };

  var HousingTypeFildValue = {
    ANY: 'any',
    MIDDLE: 'middle',
    LOW: 'low',
    HIGH: 'high'
  };

  var getFilterType = function (pin) {
    return housingType.value === HousingTypeFildValue.ANY || pin.offer.type === housingType.value;
  };

  var getFilterPrice = function (pin) {
    if (housingPrice.value === HousingTypeFildValue.MIDDLE) {
      return pin.offer.price >= 10000 && pin.offer.price <= 50000;
    } else if (housingPrice.value === HousingTypeFildValue.LOW) {
      return pin.offer.price < 10000;
    } else if (housingPrice.value === HousingTypeFildValue.HIGH) {
      return pin.offer.price > 50000;
    }
    return housingPrice.value === HousingTypeFildValue.ANY;
  };

  var getFilterRooms = function (pin) {
    return housingRooms.value === HousingTypeFildValue.ANY || pin.offer.rooms.toString() === housingRooms.value;
  };

  var getFilterGuests = function (pin) {
    return housingGuests.value === HousingTypeFildValue.ANY || pin.offer.guests.toString() === housingGuests.value;
  };

  var filterCheck = function (fild, arr) {
    if (fild.checked) {
      arr.push(fild.value);
    }
  };

  var getFilterFeature = function (pin) {
    var featuresList = [];

    filterCheck(Features.WIFI, featuresList);
    filterCheck(Features.DISHWASHER, featuresList);
    filterCheck(Features.PARKING, featuresList);
    filterCheck(Features.WASHER, featuresList);
    filterCheck(Features.ELEVATOR, featuresList);
    filterCheck(Features.CONDITIONER, featuresList);

    for (var i = 0; i < featuresList.length; i++) {
      if (pin.offer.features.indexOf(featuresList[i]) === -1) {
        return false;
      }
    }
    return true;
  };

  var filterPinsData = function (announcements) {
    var result = [];

    for (var i = 0; i < announcements.length; i++) {

      if (result.langth === MAX_PINS_COUNT) {
        break;
      }

      var pin = announcements[i];

      if (getFilterType(pin) && getFilterPrice(pin) && getFilterRooms(pin) && getFilterGuests(pin) && getFilterFeature(pin)) {
        result.push(pin);
      }
    }
    return result;
  };

  var filtersAnnouncement = function (announcements) {
    window.pins.render(announcements);
    filterList.addEventListener('change', window.debounce(function () {
      window.pins.remove();
      window.card.remove();
      window.pins.render(filterPinsData(announcements));
    }));
  };

  window.sort = {
    filters: filtersAnnouncement
  };

})();
