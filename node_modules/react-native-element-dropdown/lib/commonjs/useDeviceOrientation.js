"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDeviceOrientation = useDeviceOrientation;

var _react = require("react");

var _reactNative = require("react-native");

/* eslint-disable no-shadow */
const isOrientationPortrait = _ref => {
  let {
    width,
    height
  } = _ref;
  return height >= width;
};

const isOrientationLandscape = _ref2 => {
  let {
    width,
    height
  } = _ref2;
  return width >= height;
};

function useDeviceOrientation() {
  const screen = _reactNative.Dimensions.get('screen');

  const initialState = {
    portrait: isOrientationPortrait(screen),
    landscape: isOrientationLandscape(screen)
  };
  const [orientation, setOrientation] = (0, _react.useState)(initialState);
  (0, _react.useEffect)(() => {
    const onChange = _ref3 => {
      let {
        screen
      } = _ref3;
      setOrientation({
        portrait: isOrientationPortrait(screen),
        landscape: isOrientationLandscape(screen)
      });
    };

    const subscription = _reactNative.Dimensions.addEventListener('change', onChange);

    return () => {
      if (typeof (subscription === null || subscription === void 0 ? void 0 : subscription.remove) === 'function') {
        subscription.remove();
      } else {
        // React Native < 0.65
        _reactNative.Dimensions.removeEventListener('change', onChange);
      }
    };
  }, []);
  return orientation.portrait === true ? 'PORTRAIT' : 'LANDSCAPE';
}
//# sourceMappingURL=useDeviceOrientation.js.map