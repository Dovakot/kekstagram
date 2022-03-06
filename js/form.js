'use strict';

(function () {

  var blockUploadFile = document.querySelector('#upload-file');
  var blockDragZone = document.querySelector('.upload-control');
  var formUpload = document.querySelector('.upload-form');
  var blockUploadOverlay = formUpload.querySelector('.upload-overlay');
  var blockBtnCancel = blockUploadOverlay.querySelector('.upload-form-cancel');
  var blockEffect = blockUploadOverlay.querySelector('.upload-effect-controls');
  var blockImagePreview = blockUploadOverlay.querySelector('.effect-image-preview');

  var blockInputHashtags = blockUploadOverlay.querySelector('.upload-form-hashtags');
  var blockInputComment = blockUploadOverlay.querySelector('.upload-form-description');

  var blockResize = blockUploadOverlay.querySelector('.upload-resize-controls');
  var closePopupUpload = function () {

    window.utils.closePopup(blockUploadOverlay);
    document.removeEventListener('keydown', onPopupUploadEscPress);

    setDefaultValue();

  };

  var openPopupUpload = function (target) {

    imageLoad(target);

    window.utils.openPopup(blockUploadOverlay);

    document.addEventListener('keydown', onPopupUploadEscPress);

  };

  var onPopupUploadEscPress = function (evt) {

    var target = evt.target;

    if (!target.classList.contains('upload-form-description')) {

      window.utils.onEscPress(evt, closePopupUpload);

    }

  };

  blockBtnCancel.addEventListener('keydown', function (evt) {

    window.utils.onEnterPress(evt, closePopupUpload);

  });

  blockUploadFile.addEventListener('change', function (evt) {

    openPopupUpload(evt.target);

  });

  blockBtnCancel.addEventListener('click', function () {

    closePopupUpload();

  });

  var adjustScale = function (scale) {

    var numberScale = scale / 100;
    blockImagePreview.style.transform = 'scale(' + numberScale + ')';

  };

  var scaleElement = window.initializeScale(blockResize, adjustScale);

  var applyFilter = function (classElement, effectElement) {

    if (classElement) {

      blockImagePreview.className = 'effect-image-preview ' + classElement;

    }

    blockImagePreview.style.filter = effectElement;

  };

  var filterElements = window.initializeFilters(blockEffect, applyFilter);

  var fieldCheckHashtags = function () {

    var inputValue = blockInputHashtags.value.toLowerCase();
    var hashTags = inputValue.split(' ');
    var strErrors = '';

    if (inputValue === '') {

      return '';

    }

    var beginsSymbolHash = hashTags.every(function (hashTag) {

      return hashTag.search(/^#[\wа-яё]{2,}/) !== -1;

    });

    var separatedSpacesHash = hashTags.every(function (hashTag) {

      return hashTag.search(/[\wа-яё#]#/) === -1;

    });

    var matchSearchHash = hashTags.every(function (hashTag, index, arr) {

      for (var i = index + 1; i < arr.length; i++) {

        if (hashTag === arr[i]) {

          return false;

        }

      }

      return true;

    });

    var valueLengthHash = hashTags.every(function (hashTag) {

      return hashTag.length <= 20;

    });

    if (!beginsSymbolHash) {

      strErrors += '- Хэш-тег начинается с символа `#` (решётка) и состоит из одного слова;\n';

    }

    if (!separatedSpacesHash) {

      strErrors += '- Хэш-теги разделяются пробелами;\n';

    }

    if (!matchSearchHash) {

      strErrors += '- Один и тот же хэш-тег не может быть использован дважды;\n';

    }

    if (hashTags.length > 5) {

      strErrors += '- Нельзя указать больше пяти хэш-тегов;\n';

    }

    if (!valueLengthHash) {

      strErrors += '- Максимальная длина одного хэш-тега 20 символов;\n';

    }

    return strErrors;

  };

  blockInputHashtags.addEventListener('input', function () {

    var inputHashErrors = fieldCheckHashtags();

    if (inputHashErrors !== '') {

      blockInputHashtags.setCustomValidity(inputHashErrors);
      blockInputHashtags.classList.add('field-invalid');

    } else {

      blockInputHashtags.setCustomValidity('');
      blockInputHashtags.classList.remove('field-invalid');

    }

  });

  blockDragZone.addEventListener('dragenter', function (evt) {

    blockDragZone.classList.add('element-selected');

    evt.preventDefault();

  });

  blockDragZone.addEventListener('dragleave', function () {

    blockDragZone.classList.remove('element-selected');

  });

  blockDragZone.addEventListener('dragover', function (evt) {

    evt.dataTransfer.dropEffect = 'copy';

    evt.stopPropagation();
    evt.preventDefault();

  }, false);

  blockDragZone.addEventListener('drop', function (evt) {

    var file = evt.dataTransfer;

    blockUploadFile.files = file.files;

    openPopupUpload(file);

    evt.stopPropagation();
    evt.preventDefault();

  }, false);

  var imageLoad = function (target) {

    var file = target.files[0];

    if (!file.type.match('image.*')) {

      return;

    }

    var reader = new FileReader();

    reader.addEventListener('load', function (theFile) {

      blockImagePreview.setAttribute('src', theFile.target.result);

    });

    reader.readAsDataURL(file);

    blockDragZone.classList.remove('element-selected');

  };

  var setDefaultValue = function () {

    blockInputHashtags.value = '';
    blockInputComment.value = '';
    blockUploadFile.value = '';
    scaleElement.value = '100%';
    filterElements[0].checked = true;
    filterElements[1].classList.add('hidden');

    adjustScale(100);
    applyFilter('effect-none', '');

    window.utils.closePopup(blockUploadOverlay);

  };

  formUpload.addEventListener('submit', function (evt) {

    var formData = new FormData(formUpload);

    window.backend.save(formData, window.backend.showSuccess, window.backend.showError);

    setDefaultValue();
    evt.preventDefault();

  });

})();
