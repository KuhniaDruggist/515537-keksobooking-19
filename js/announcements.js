'use strict';
(function () {

  var MAX_PIN = 8;
  var APARTMENTS = ['palace', 'flat', 'house', 'bungalo'];
  var TIMES = ['12:00', '13:00', '14:00'];
  var PIN_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PIN_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var createAnnouncement = function () {
    var announcementList = [];
    for (var i = 1; i <= MAX_PIN; i++) {

      var coordinateX = window.utils.getRandomNumberInRange(0, window.utils.getMapWidth());
      var coordinateY = window.utils.getRandomNumberInRange(130, 630);

      var announcement = {
        author: {
          avatar: 'img/avatars/user' + '0' + i + '.png',
        },

        offer: {
          title: 'Заголовок объявления',
          address: coordinateX + ', ' + coordinateY,
          price: window.utils.getRandomNumberInRange(10000, 100000),
          type: window.utils.getRandomElementFromArray(APARTMENTS),
          rooms: 4,
          guests: 10,
          checkin: window.utils.getRandomElementFromArray(TIMES),
          checkout: window.utils.getRandomElementFromArray(TIMES),
          features: window.utils.getRandomArray(PIN_FEATURES),
          description: 'Здесь будет описание вашего уютного жилища',
          photos: window.utils.getRandomArray(PIN_PHOTOS),
        },

        location: {
          x: coordinateX,
          y: coordinateY,
        }
      };
      announcementList.push(announcement);
    }
    return announcementList;
  };

  window.announcements = {
    render: createAnnouncement
  };

})();
