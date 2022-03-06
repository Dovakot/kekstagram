'use strict';

(function () {

  var DIVISOR_FILTER_BLUR = 20;
  var DIVISOR_FILTER_BRIGHT = 33.33;

  var dragPocket = {};
  var filterValues = {

    'effect-chrome': 1,
    'effect-sepia': 1,
    'effect-marvin': 100,
    'effect-phobos': 5,
    'effect-heat': 3

  };

  window.initializeFilters = function (filterElement, setFilter) {

    var blockSlider = filterElement.querySelector('.upload-effect-level');
    var blockCheckbox = filterElement.querySelector('#upload-effect-none');
    var blockSliderLine = blockSlider.querySelector('.upload-effect-level-line');
    var blockSliderPin = blockSlider.querySelector('.upload-effect-level-pin');
    var blockSliderVal = blockSlider.querySelector('.upload-effect-level-val');
    var blockSliderValue = blockSlider.querySelector('.upload-effect-level-value');

    var changeEffectImage = function (target) {

      return 'effect-' + target.value;

    };

    var setValueSlider = function (value, valueStyle) {

      blockSliderValue.value = value;

      blockSliderPin.style.left = valueStyle;
      blockSliderVal.style.width = valueStyle;

    };

    var checkValueCheckbox = function (value) {

      var valueStyle = 0;
      var effect = '';

      if (dragPocket.effect === 'effect-chrome') {

        valueStyle = value / 100;
        effect = 'grayscale(' + valueStyle + ')';

      } else if (dragPocket.effect === 'effect-sepia') {

        valueStyle = value / 100;
        effect = 'sepia(' + valueStyle + ')';

      } else if (dragPocket.effect === 'effect-marvin') {

        effect = 'invert(' + value + '%)';

      } else if (dragPocket.effect === 'effect-phobos') {

        valueStyle = parseFloat(value / DIVISOR_FILTER_BLUR, 10).toFixed(1);
        effect = 'blur(' + valueStyle + 'px)';

      } else if (dragPocket.effect === 'effect-heat') {

        valueStyle = parseFloat(value / DIVISOR_FILTER_BRIGHT, 10).toFixed(1);
        effect = 'brightness(' + valueStyle + ')';

      }

      setFilter(null, effect);
      setValueSlider(value, value + '%');

    };

    filterElement.addEventListener('change', function (evt) {

      var effectName = changeEffectImage(evt.target);

      if (effectName === 'effect-none') {

        blockSlider.classList.add('hidden');

      } else {

        setValueSlider(filterValues[effectName], '100%');

        blockSlider.classList.remove('hidden');

      }

      setFilter(effectName, '');

    });

    var onMouseDown = function (evt) {

      if (evt.which !== 1) {

        return;

      }

      var target = evt.target;

      if (!target) {

        return;

      }

      if (target === blockSliderPin) {

        var thumbCoords = window.utils.getCoords(blockSliderPin);
        dragPocket.dragZone = blockSliderPin;
        dragPocket.effect = changeEffectImage(filterElement.querySelector('input:checked'));
        dragPocket.shiftX = evt.pageX - thumbCoords.left;
        dragPocket.sliderCoords = window.utils.getCoords(blockSliderLine);

        document.addEventListener('mousemove', onMouseMove);

      }

    };

    var onMouseMove = function (evt) {

      evt.preventDefault();

      if (!dragPocket.dragZone) {

        return;

      }

      var newLeft = evt.pageX - dragPocket.sliderCoords.left;
      var sliderWidth = blockSliderLine.offsetWidth;

      if (newLeft < 0) {

        newLeft = 0;

      }

      if (newLeft > sliderWidth) {

        newLeft = sliderWidth;

      }

      var newValue = Math.ceil(newLeft / sliderWidth * 100);

      checkValueCheckbox(newValue);

    };

    blockSlider.addEventListener('mousedown', function (evt) {

      onMouseDown(evt);

    });

    document.addEventListener('mouseup', function () {

      dragPocket = {};
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousemdown', onMouseDown);

    });


    return [blockCheckbox, blockSlider];

  };

})();
