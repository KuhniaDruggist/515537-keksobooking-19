'use strict';
(function () {

  var ServerLinks = {
    URL_GET: 'https://js.dump.academy/keksobooking/data',
    URL_POST: 'https://js.dump.academy/keksobooking'
  };

  var RequestTypes = {
    GET: 'GET',
    POST: 'POST'
  };

  var StatusCodes = {
    OK: 200
  };

  var TIMEOUT_IN_MS = 10000;
  var RESPONSE_TYPE = 'json';

  var createRequest = function (requestTypes, URL, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.responseType = RESPONSE_TYPE;

    xhr.open(requestTypes, URL);

    xhr.addEventListener('load', function () {
      var statusLoad = xhr.status === StatusCodes.OK ? onLoad(xhr.response) : onError();
      return statusLoad;
    });

    xhr.addEventListener('error', onError);

    xhr.addEventListener('timeout', onError);

    xhr.send(data);
  };

  var load = function (onLoad) {
    createRequest(RequestTypes.GET, ServerLinks.URL_GET, onLoad);
  };

  var save = function (data, onLoad, onError) {
    createRequest(RequestTypes.POST, ServerLinks.URL_POST, onLoad, onError, data);
  };

  window.backend = {
    getData: load,
    sentData: save
  };

})();


