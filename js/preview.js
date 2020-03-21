'user strict';
(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var chooserAvatar = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');

  var chooserHousingPhoto = document.querySelector('.ad-form__upload input[type=file]');
  var previewHousingPhoto = document.querySelector('.ad-form__photo');

  var downloadImg = function (chooser, img) {
    var file = chooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
     return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        img.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var downloadAvatar = function () {
    downloadImg(chooserAvatar, previewAvatar);
  }

  var downloadHousingPhoto = function () {
    var createElement = document.createElement('img')
    createElement.classList.add('housing__photo');
    var img = previewHousingPhoto.appendChild(createElement);
    downloadImg(chooserHousingPhoto, img);
  }

  chooserAvatar.addEventListener('change', downloadAvatar);
  chooserHousingPhoto.addEventListener('change', downloadHousingPhoto);

})();
