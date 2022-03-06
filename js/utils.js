'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout = null;

  window.utils = {

    debounce: function (elem, actionFunction) {

      if (lastTimeout) {

        window.clearTimeout(lastTimeout);

      }

      lastTimeout = window.setTimeout(actionFunction, DEBOUNCE_INTERVAL, elem);

    },

    getCoords: function (elem) {

      var box = elem.getBoundingClientRect();

      return {

        top: box.top + pageYOffset,
        left: box.left + pageXOffset

      };

    },

    onEscPress: function (evt, actionFunction) {

      if (evt.keyCode === ESC_KEYCODE) {

        actionFunction();

      }

    },

    onEnterPress: function (evt, actionFunction, target) {

      if (evt.keyCode === ENTER_KEYCODE) {

        if (target) {

          actionFunction(target);

        } else {

          actionFunction();

        }

      }

    },

    openPopup: function (popup) {

      document.body.classList.add('modal-open');
      popup.classList.remove('hidden');

      setTimeout(function () {

        popup.focus();

      }, 300);

    },

    closePopup: function (popup) {

      popup.classList.add('hidden');
      document.body.classList.remove('modal-open');

    },

    showMessage: function (textMessage) {

      var errorModal = document.querySelector('.modal-message');
      var errorModalText = errorModal.querySelector('.modal-message__content');

      errorModal.classList.add('modal-message--show');
      errorModalText.textContent = textMessage;

      setTimeout(function () {

        errorModal.classList.remove('modal-message--show');

      }, 2000);

    }

  };

})();
