'use strict';

(function () {

  window.preview = function (elem, blockGallery) {

    var target = elem.closest('.picture');

    if (target) {

      var blockGalleryImage = blockGallery.querySelector('.gallery-overlay-image');
      var blockLikesCount = blockGallery.querySelector('.likes-count');
      var blockCommentsCount = blockGallery.querySelector('.comments-count');

      var blockImgSrc = target.querySelector('img').getAttribute('src');
      var blockCommentsText = target.querySelector('.picture-comments').textContent;
      var blockLikesText = target.querySelector('.picture-likes').textContent;

      blockGalleryImage.setAttribute('src', blockImgSrc);
      blockLikesCount.textContent = blockLikesText;
      blockCommentsCount.textContent = blockCommentsText;

    }

  };

})();
