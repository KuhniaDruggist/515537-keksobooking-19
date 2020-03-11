'use strict';
(function () {

  var ServerLinks = {
    URL_GET: 'https://js.dump.academy/keksobooking/data'
  };

  var RESPONSE_TYPE = 'json';

  var load = function (onLoad, number) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPE;

    xhr.open('GET', ServerLinks.URL_GET);

    xhr.addEventListener('load', function () {
      onLoad(xhr.response, number);
    });

    xhr.send();
  };

  window.backend = {
    getData: load
  };

})();
