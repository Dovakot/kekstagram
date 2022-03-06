'use strict';

(function () {

  var resizeElements = {

    classButtons: 'upload-resize-controls-button',
    classInc: 'upload-resize-controls-button-inc',
    classDec: 'upload-resize-controls-button-dec',
    maxVal: 100,
    minVal: 25,
    step: 25

  };

  window.initializeScale = function (scaleElement, setScale) {

    var inputElement = scaleElement.querySelector('.upload-resize-controls-value');

    var calcScaleValue = function (target) {

      var inputValue = parseInt(inputElement.value, 10);

      if (target.classList.contains(resizeElements.classDec) && inputValue > resizeElements.minVal) {

        inputValue -= resizeElements.step;


      } else if (target.classList.contains(resizeElements.classInc) && inputValue < resizeElements.maxVal) {

        inputValue += resizeElements.step;

      }

      if (inputValue !== parseInt(inputElement.value, 10)) {

        setScale(inputValue);
        inputElement.value = inputValue + '%';

      }

    };

    scaleElement.addEventListener('click', function (evt) {

      var target = evt.target;

      if (!target.classList.contains(resizeElements.classButtons)) {

        return;

      }

      calcScaleValue(target);

    });

    return inputElement;

  };

})();
