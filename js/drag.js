'use strict';
(function () {

  var WIDTH_MAIN_PIN = 65;
  var HALF_PART = 0.5;

  var MIN_COORDS_Y = 130;
  var MAX_COORDS_Y = 630;

  var map = document.querySelector('.map');
  var minCoordsX = -WIDTH_MAIN_PIN * HALF_PART;
  var maxCoordsX = map.offsetWidth - WIDTH_MAIN_PIN * HALF_PART;
  var activationButton = map.querySelector('.map__pin--main');

  activationButton.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };


      var newCoordsY = activationButton.offsetTop - shift.y;
      var newCoordsX = activationButton.offsetLeft - shift.x;

      if (newCoordsY >= MIN_COORDS_Y && newCoordsY <= MAX_COORDS_Y) {
        activationButton.style.top = (newCoordsY) + 'px';
      }

      if (newCoordsX >= minCoordsX && newCoordsX <= maxCoordsX) {
        activationButton.style.left = (newCoordsX) + 'px';
      }

      window.form.setAddressValue(true, newCoordsX, newCoordsY);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
