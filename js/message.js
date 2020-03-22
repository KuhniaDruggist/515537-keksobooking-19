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

  var MessageTypes = {
    SUCCESS: messageSuccess,
    ERROR: messageError
  };

  var showMessage = function (messageType) {
    var onMessageEscPress = function (evt) {
      window.utils.isPressEsc(evt, onMessageClick);
    };

    var onMessageClick = function () {
      messageType.classList.add('hidden');
      document.removeEventListener('keydown', onMessageEscPress);
      document.removeEventListener('click', onMessageClick);
    };

    messageType.classList.remove('hidden');
    document.addEventListener('keydown', onMessageEscPress);
    document.addEventListener('click', onMessageClick);
  };

  var onSuccess = function () {
    showMessage(MessageTypes.SUCCESS);
  };

  var onError = function () {
    showMessage(MessageTypes.ERROR);
  };

  window.message = {
    openSuccess: onSuccess,
    openError: onError
  };

})();
