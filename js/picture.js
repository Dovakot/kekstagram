'use strict';

(function () {

  var photoTemplate = document.querySelector('#picture-template').content.querySelector('.picture');

  window.picture = function (photo) {

    var photoElement = photoTemplate.cloneNode(true);
    var blockPhoto = photoElement.querySelector('img');
    var blockLikes = photoElement.querySelector('.picture-likes');
    var blockComments = photoElement.querySelector('.picture-comments');

    blockPhoto.setAttribute('src', photo.url);
    blockLikes.textContent = photo.likes;
    blockComments.textContent = photo.comments.length;

    return photoElement;

  };

})();
