'use strict';

(function () {

  var blockPictures = document.querySelector('.pictures');
  var blockGallery = document.querySelector('.gallery-overlay');
  var blockBtnClose = blockGallery.querySelector('.gallery-overlay-close');
  var blockFilter = document.querySelector('.filters');
  var pictures = [];
  var fragment = document.createDocumentFragment();

  var onLoad = function (data) {

    pictures = data;

    appendElements(pictures);

    blockFilter.classList.remove('filters-inactive');

  };

  window.backend.load(onLoad, window.backend.showError);

  var appendElements = function (data) {

    blockPictures.innerHTML = '';

    data.forEach(function (item) {

      fragment.appendChild(window.picture(item));

    });

    blockPictures.appendChild(fragment);

  };

  var sortFilterLikes = function (sortedPictures) {

    sortedPictures.sort(function (first, second) {

      return second.likes - first.likes;

    });

    return sortedPictures;

  };

  var sortFilterComments = function (sortedPictures) {

    sortedPictures.sort(function (first, second) {

      return second.comments.length - first.comments.length;

    });

    return sortedPictures;

  };

  var sortFilterRandomize = function (sortedPictures) {

    sortedPictures.sort(function () {

      return Math.random() - 0.5;

    });

    return sortedPictures;

  };

  var refreshGallery = function (elem) {

    var typeFilter = elem.value;
    var newPictures = pictures.slice();

    if (typeFilter === 'popular') {

      newPictures = sortFilterLikes(newPictures);

    } else if (typeFilter === 'discussed') {

      newPictures = sortFilterComments(newPictures);

    } else if (typeFilter === 'random') {

      newPictures = sortFilterRandomize(newPictures);

    }

    appendElements(newPictures);

  };

  var closePopup = function () {

    window.utils.closePopup(blockGallery);

    document.removeEventListener('keydown', onPopupEscPress);

  };

  var openPopup = function (elem) {

    window.preview(elem, blockGallery);

    window.utils.openPopup(blockGallery);

    document.addEventListener('keydown', onPopupEscPress);

  };

  var onPopupEscPress = function (evt) {

    window.utils.onEscPress(evt, closePopup);

  };

  blockPictures.addEventListener('click', function (evt) {

    openPopup(evt.target);

    evt.preventDefault();

  });

  blockBtnClose.addEventListener('click', function () {

    closePopup();

  });

  blockPictures.addEventListener('keydown', function (evt) {

    window.utils.onEnterPress(evt, openPopup, evt.target);

  });

  blockBtnClose.addEventListener('keydown', function (evt) {

    window.utils.onEnterPress(evt, closePopup);

  });

  blockFilter.addEventListener('change', function (evt) {

    window.utils.debounce(evt.target, refreshGallery);


  });

})();
