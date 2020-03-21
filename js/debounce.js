'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500;

  window.debounce = function (colback) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        colback.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
