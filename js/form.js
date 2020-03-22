'use strict';
(function () {

  var WIDTH_MAIN_PIN = 65;
  var HEIGHT_MAIN_PIN = 65;
  var HEIGHT_SHARP_MAIN_POINT = 22;

  var map = document.querySelector('.map');

  var activationButton = map.querySelector('.map__pin--main');
  var startCoordsXMainPin = activationButton.offsetLeft;
  var startCoordsYMainPin = activationButton.offsetTop;

  var newNoticeForm = document.querySelector('.ad-form');

  var numberOfRooms = newNoticeForm.querySelector('#room_number');
  var numberOfGuests = newNoticeForm.querySelector('#capacity');
  var typeRoom = newNoticeForm.querySelector('#type');
  var price = newNoticeForm.querySelector('#price');
  var checkIn = newNoticeForm.querySelector('#timein');
  var checkOut = newNoticeForm.querySelector('#timeout');

  var addressInput = newNoticeForm.querySelector('#address');

  var GuestsInRoom = {
    1: [2],
    2: [2, 1],
    3: [2, 1, 0],
    100: [3]
  };

  var CostOfHousing = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var StatusAddress = {
    ACTIVE: true,
    INACTIVE: false
  };

  var setAddressValue = function (status, coordsXMainPin, coordsYMainPin) {
    var sharpSize = status === StatusAddress.ACTIVE ? HEIGHT_MAIN_PIN +
    HEIGHT_SHARP_MAIN_POINT : HEIGHT_MAIN_PIN * 0.5;

    addressInput.value = (coordsXMainPin + WIDTH_MAIN_PIN * 0.5) +
    ', ' + (coordsYMainPin + sharpSize);
  };

  setAddressValue(false, startCoordsXMainPin, startCoordsYMainPin);

  var disablesAllElements = function (select) {
    for (var i = 0; i < select.length; i++) {
      select.children[i].setAttribute('disabled', 'disabled');
      select.children[i].removeAttribute('selected', 'selected');
    }
  };

  var checkRoomsAndGuests = function () {
    var currentVal = numberOfRooms.value;
    var guests = GuestsInRoom[currentVal];
    disablesAllElements(numberOfGuests);
    for (var i = 0; i < guests.length; i++) {
      numberOfGuests.children[guests[i]].removeAttribute('disabled', 'disabled');
      numberOfGuests.children[guests[i]].setAttribute('selected', 'selected');
    }
  };

  checkRoomsAndGuests();

  numberOfRooms.addEventListener('change', function () {
    checkRoomsAndGuests();
  });

  price.setAttribute('min', CostOfHousing.FLAT);
  price.setAttribute('placeholder', CostOfHousing.FLAT);
  typeRoom.addEventListener('change', function () {
    var currentVal = typeRoom.value.toUpperCase();
    if (currentVal) {
      price.setAttribute('min', CostOfHousing[currentVal]);
      price.setAttribute('placeholder', CostOfHousing[currentVal]);
    }
  });

  var checkTime = function (act1, act2) {
    var currentVal = act1.value;
    if (currentVal) {
      act2.value = currentVal;
    }
  };

  checkIn.addEventListener('change', function () {
    checkTime(checkIn, checkOut);
  });

  checkOut.addEventListener('change', function () {
    checkTime(checkOut, checkIn);
  });

  newNoticeForm.addEventListener('submit', function (evt) {
    window.backend.sentData(new FormData(newNoticeForm), window.map.inactivate, window.message.openError);
    evt.preventDefault();
  });

  window.form = {
    setAddressValue: setAddressValue
  };

})();
