'use strict';
(function () {

  var messageContainer = document.querySelector('main');

  var messageSuccessTimplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  var messageSuccess = messageSuccessTimplate.cloneNode(true);

  var messageErrorTimplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var messageError = messageErrorTimplate.cloneNode(true);

  messageContainer.appendChild(messageSuccess).classList.add('hidden');
  messageContainer.appendChild(messageError).classList.add('hidden');

  var onSuccess = function () {
    var onMessageEscPress = function (evt) {
      window.utils.isPressEsc(evt, closeSuccess);
    };

    var closeSuccess = function () {
      messageSuccess.classList.add('hidden');
      document.removeEventListener('keydown', onMessageEscPress);
      document.removeEventListener('click', closeSuccess);
    };

    messageSuccess.classList.remove('hidden');
    document.addEventListener('keydown', onMessageEscPress);
    document.addEventListener('click', closeSuccess);
  };

  var onError = function () {
    var onMessageEscPress = function (evt) {
      window.utils.isPressEsc(evt, closeError);
    };

    var closeError = function () {
      messageError.classList.add('hidden');
      document.removeEventListener('keydown', onMessageEscPress);
      document.removeEventListener('click', closeError);
    };

    messageError.classList.remove('hidden');
    document.addEventListener('keydown', onMessageEscPress);
    document.addEventListener('click', closeError);
  };

  window.message = {
    openSuccess: onSuccess,
    openError: onError
  };

})();
