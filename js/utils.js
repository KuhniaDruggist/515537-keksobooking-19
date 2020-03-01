'use strict';
(function () {

  var Buttons = {
    ENTER_KEY: 'Enter',
    LEFT_MOUSE_BUTTON: 0
  };

  var pressLeftMouse = function (evt, status) {
    if (evt.button === Buttons.LEFT_MOUSE_BUTTON) {
      window.map.activPage();
      window.form.address(status);
    }
  };

  var pressEnter = function (evt, status) {
    if (evt.key === Buttons.ENTER_KEY) {
      window.map.activPage();
      window.form.address(status);
    }
  };

  var getRandomElementFromArray = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var getRandomNumberInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomArray = function (arr) {
    var elements = [];
    for (var i = 0; i < arr.length; i++) {
      elements.push(getRandomElementFromArray(arr));
    }
    return elements;
  };

  var getMapWidth = function () {
    return document.querySelector('.map__overlay').offsetWidth;
  };

  window.utils = {
    isLeftMouse: pressLeftMouse,
    isPressEnter: pressEnter,
    randomElementFromArray: getRandomElementFromArray,
    randomNumberInRange: getRandomNumberInRange,
    randomArray: getRandomArray,
    mapWidth: getMapWidth
  };

})();
