'use strict';

(function () {

  var SERVER_URL = 'https://24.javascript.pages.academy/kekstagram';
  var STATUS_OK = 200;
  var SERVER_TIMEOUT = 10000;

  var xhrAction = function (onLoad, onError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {

      if (xhr.status === STATUS_OK) {

        onLoad(xhr.response);

      } else {

        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);

      }

    });

    xhr.addEventListener('error', function () {

      onError('Произошла ошибка соединения');

    });

    xhr.addEventListener('timeout', function () {

      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');

    });

    xhr.timeout = SERVER_TIMEOUT;

    return xhr;

  };

  window.backend = {

    load: function (onLoad, onError) {

      var xhr = xhrAction(onLoad, onError);

      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();

    },

    save: function (data, onLoad, onError) {

      var xhr = xhrAction(onLoad, onError);

      xhr.open('POST', SERVER_URL);
      xhr.send(data);

    },

    showError: function (errorMessage) {

      window.utils.showMessage(errorMessage);

    },

    showSuccess: function () {

      window.utils.showMessage('Данные успешно отправлены.');

    }

  };

})();
