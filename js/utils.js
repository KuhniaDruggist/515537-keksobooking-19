'use strict';
(function () {

  var Buttons = {
    LEFT_MOUSE_BUTTON: 0,
    ENTER_KEY: 'Enter',
    ESC_KEY: 'Escape'
  };

  var pressLeftMouse = function (evt, status) {
    if (evt.button === Buttons.LEFT_MOUSE_BUTTON) {
      window.map.activate();
      window.form.setAddressValue(status);
    }
  };

  var pressEnterActivationButton = function (evt, status) {
    if (evt.key === Buttons.ENTER_KEY) {
      window.map.activate();
      window.form.setAddressValue(status);
    }
  };

  var pressEnter = function (evt, action) {
    if (evt.key === Buttons.ENTER_KEY) {
      action();
    }
  };

  var pressEsc = function (evt, action) {
    if (evt.key === Buttons.ESC_KEY) {
      action();
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
    isPressLeftMouse: pressLeftMouse,
    isPressEnterActivationButton: pressEnterActivationButton,
    isPressEnter: pressEnter,
    isPressEsc: pressEsc,
    getRandomElementFromArray: getRandomElementFromArray,
    getRandomNumberInRange: getRandomNumberInRange,
    getRandomArray: getRandomArray,
    getMapWidth: getMapWidth
  };

})();
