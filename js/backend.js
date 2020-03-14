'use strict';
(function () {

  var ServerLinks = {
    URL_GET: 'https://js.dump.academy/keksobooking/data',
    URL_POST: 'https://js.dump.academy/keksobooking'
  };

  var StatusCodes = {
    OK: 200
  };

  var TIMEOUT_IN_MS = 10000;
  var RESPONSE_TYPE = 'json';

  var load = function (onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPE;

    xhr.open('GET', ServerLinks.URL_GET);

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPE;

    xhr.open('POST', ServerLinks.URL_POST);

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCodes.OK) {
        onLoad(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.send(data);
  };

  window.backend = {
    getData: load,
    sentData: save
  };

})();


