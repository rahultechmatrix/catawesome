"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _TextInput = _interopRequireDefault(require("../TextInput"));

var _useDeviceOrientation = require("../../useDeviceOrientation");

var _toolkits = require("../../toolkits");

var _styles = require("./styles");

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const {
  isTablet,
  isIOS
} = _toolkits.useDetectDevice;

const ic_down = require('../../assets/down.png');

const defaultProps = {
  placeholder: 'Select item',
  activeColor: '#F6F7F8',
  data: [],
  style: {}
};

const MultiSelectComponent = /*#__PURE__*/_react.default.forwardRef((props, currentRef) => {
  const orientation = (0, _useDeviceOrientation.useDeviceOrientation)();
  const {
    testID,
    itemTestIDField,
    onChange,
    data,
    value,
    style,
    labelField,
    valueField,
    selectedStyle,
    selectedTextStyle,
    iconStyle,
    activeColor,
    containerStyle,
    fontFamily,
    placeholderStyle,
    iconColor = 'gray',
    inputSearchStyle,
    searchPlaceholder,
    placeholder,
    search = false,
    maxHeight = 340,
    maxSelect,
    disable = false,
    keyboardAvoiding = true,
    inside = false,
    renderItem,
    renderLeftIcon,
    renderRightIcon,
    renderSelectedItem,
    renderInputSearch,
    onFocus,
    onBlur,
    showsVerticalScrollIndicator = true,
    dropdownPosition = 'auto',
    flatListProps,
    alwaysRenderItemSelected = false,
    searchQuery,
    statusBarIsTranslucent,
    backgroundColor
  } = props;
  const ref = (0, _react.useRef)(null);
  const [visible, setVisible] = (0, _react.useState)(false);
  const [currentValue, setCurrentValue] = (0, _react.useState)([]);
  const [listData, setListData] = (0, _react.useState)(data);
  const [, setKey] = (0, _react.useState)(Math.random());
  const [position, setPosition] = (0, _react.useState)();
  const [focus, setFocus] = (0, _react.useState)(false);
  const [keyboardHeight, setKeyboardHeight] = (0, _react.useState)(0);

  const {
    width: W,
    height: H
  } = _reactNative.Dimensions.get('window');

  const styleContainerVertical = (0, _react.useMemo)(() => {
    return {
      backgroundColor: 'rgba(0,0,0,0.1)',
      alignItems: 'center'
    };
  }, []);
  const styleHorizontal = (0, _react.useMemo)(() => {
    return {
      marginBottom: 20,
      width: W / 2,
      alignSelf: 'center'
    };
  }, [W]);
  (0, _react.useImperativeHandle)(currentRef, () => {
    return {
      open: eventOpen,
      close: eventClose
    };
  });
  (0, _react.useEffect)(() => {
    setListData([...data]);
  }, [data]);

  const eventOpen = () => {
    if (!disable) {
      setVisible(true);

      if (onFocus) {
        onFocus();
      }
    }
  };

  const eventClose = () => {
    if (!disable) {
      setVisible(false);

      if (onBlur) {
        onBlur();
      }
    }
  };

  const font = (0, _react.useCallback)(() => {
    if (fontFamily) {
      return {
        fontFamily: fontFamily
      };
    } else {
      return {};
    }
  }, [fontFamily]);
  const getValue = (0, _react.useCallback)(() => {
    setCurrentValue(value ? [...value] : []);
  }, [value]);

  const _measure = (0, _react.useCallback)(() => {
    if (ref && ref !== null && ref !== void 0 && ref.current) {
      ref.current.measure((_width, _height, px, py, fx, fy) => {
        const isFull = orientation === 'LANDSCAPE' && !isTablet;
        const w = Math.floor(px);
        const top = isFull ? 20 : Math.floor(py) + Math.floor(fy) + 2;
        const bottom = H - top;
        const left = _reactNative.I18nManager.isRTL ? W - Math.floor(px) - Math.floor(fx) : Math.floor(fx);
        setPosition({
          isFull,
          w,
          top,
          bottom: Math.floor(bottom),
          left,
          height: Math.floor(py)
        });
      });
    }
  }, [H, W, orientation]);

  const onKeyboardDidShow = (0, _react.useCallback)(e => {
    _measure();

    setKeyboardHeight(e.endCoordinates.height);
  }, [_measure]);

  const onKeyboardDidHide = () => {
    setKeyboardHeight(0);
  };

  (0, _react.useEffect)(() => {
    const susbcriptionKeyboardDidShow = _reactNative.Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);

    const susbcriptionKeyboardDidHide = _reactNative.Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);

    return () => {
      if (typeof (susbcriptionKeyboardDidShow === null || susbcriptionKeyboardDidShow === void 0 ? void 0 : susbcriptionKeyboardDidShow.remove) === 'function') {
        susbcriptionKeyboardDidShow.remove();
      } else {
        _reactNative.Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
      }

      if (typeof (susbcriptionKeyboardDidHide === null || susbcriptionKeyboardDidHide === void 0 ? void 0 : susbcriptionKeyboardDidHide.remove) === 'function') {
        susbcriptionKeyboardDidHide.remove();
      } else {
        _reactNative.Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
      }
    };
  }, [onKeyboardDidShow]);
  (0, _react.useEffect)(() => {
    getValue();
  }, [getValue, value]);
  const showOrClose = (0, _react.useCallback)(() => {
    if (!disable) {
      _measure();

      setVisible(!visible);
      setListData(data);

      if (!visible) {
        if (onFocus) {
          onFocus();
        }
      } else {
        if (onBlur) {
          onBlur();
        }
      }
    }
  }, [_measure, data, disable, onBlur, onFocus, visible]);
  const onSearch = (0, _react.useCallback)(text => {
    if (text.length > 0) {
      const defaultFilterFunction = e => {
        var _$get;

        const item = (_$get = _lodash.default.get(e, labelField)) === null || _$get === void 0 ? void 0 : _$get.toLowerCase().replace(' ', '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const key = text.toLowerCase().replace(' ', '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return item.indexOf(key) >= 0;
      };

      const propSearchFunction = e => {
        const labelText = _lodash.default.get(e, labelField);

        return searchQuery === null || searchQuery === void 0 ? void 0 : searchQuery(text, labelText);
      };

      const dataSearch = data.filter(searchQuery ? propSearchFunction : defaultFilterFunction);
      setListData(dataSearch);
    } else {
      setListData(data);
    }
  }, [data, labelField, searchQuery]);
  const onSelect = (0, _react.useCallback)(item => {
    onSearch('');
    const index = currentValue.findIndex(e => e === _lodash.default.get(item, valueField));

    if (index > -1) {
      currentValue.splice(index, 1);
    } else {
      if (maxSelect) {
        if (currentValue.length < maxSelect) {
          currentValue.push(_lodash.default.get(item, valueField));
        }
      } else {
        currentValue.push(_lodash.default.get(item, valueField));
      }
    }

    onChange(currentValue);
    setKey(Math.random());
  }, [currentValue, maxSelect, onChange, onSearch, valueField]);

  const _renderDropdown = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
      testID: testID,
      onPress: showOrClose
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: _styles.styles.dropdown
    }, renderLeftIcon === null || renderLeftIcon === void 0 ? void 0 : renderLeftIcon(), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [_styles.styles.textItem, placeholderStyle, font()]
    }, placeholder), renderRightIcon ? renderRightIcon() : /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: ic_down,
      style: [_styles.styles.icon, {
        tintColor: iconColor
      }, iconStyle]
    })));
  };

  const checkSelected = (0, _react.useCallback)(item => {
    const index = currentValue.findIndex(e => e === _lodash.default.get(item, valueField));
    return index > -1;
  }, [currentValue, valueField]);

  const _renderItem = (0, _react.useCallback)(_ref => {
    let {
      item,
      index
    } = _ref;
    const selected = checkSelected(item);
    return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      testID: _lodash.default.get(item, itemTestIDField || labelField),
      key: index,
      onPress: () => onSelect(item),
      style: [selected && {
        backgroundColor: activeColor,
        ..._styles.styles.wrapItem
      }]
    }, renderItem ? renderItem(item, selected) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: _styles.styles.item
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [_styles.styles.textItem, placeholderStyle, font()]
    }, _lodash.default.get(item, labelField))));
  }, [activeColor, checkSelected, font, itemTestIDField, labelField, onSelect, placeholderStyle, renderItem]);

  const renderSearch = (0, _react.useCallback)(() => {
    if (search) {
      if (renderInputSearch) {
        return renderInputSearch(text => {
          onSearch(text);
        });
      } else {
        return /*#__PURE__*/_react.default.createElement(_TextInput.default, {
          testID: testID + ' input',
          style: [_styles.styles.input, inputSearchStyle],
          inputStyle: [inputSearchStyle, font()],
          autoCorrect: false,
          keyboardType: isIOS ? 'default' : 'visible-password',
          placeholder: searchPlaceholder,
          onChangeText: onSearch,
          placeholderTextColor: "gray",
          iconStyle: [{
            tintColor: iconColor
          }, iconStyle],
          onFocus: () => setFocus(true),
          onBlur: () => {
            setFocus(false);
          }
        });
      }
    }

    return null;
  }, [font, iconColor, iconStyle, inputSearchStyle, onSearch, renderInputSearch, search, searchPlaceholder, testID]);

  const _renderListTop = (0, _react.useCallback)(() => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: _styles.styles.flexShrink
    }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, _extends({
      testID: testID + ' flatlist'
    }, flatListProps, {
      keyboardShouldPersistTaps: "handled",
      data: listData,
      inverted: true,
      renderItem: _renderItem,
      keyExtractor: (_item, index) => index.toString(),
      showsVerticalScrollIndicator: showsVerticalScrollIndicator
    })), renderSearch()));
  }, [_renderItem, flatListProps, listData, renderSearch, showsVerticalScrollIndicator, testID]);

  const _renderListBottom = (0, _react.useCallback)(() => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: _styles.styles.flexShrink
    }, renderSearch(), /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, _extends({
      testID: testID + ' flatlist'
    }, flatListProps, {
      keyboardShouldPersistTaps: "handled",
      data: listData,
      renderItem: _renderItem,
      keyExtractor: (_item, index) => index.toString(),
      showsVerticalScrollIndicator: showsVerticalScrollIndicator
    }))));
  }, [_renderItem, flatListProps, listData, renderSearch, showsVerticalScrollIndicator, testID]);

  const _renderModal = (0, _react.useCallback)(() => {
    if (visible && position) {
      const {
        isFull,
        w,
        top,
        bottom,
        left,
        height
      } = position;

      if (w && top && bottom) {
        const styleVertical = {
          left: left,
          maxHeight: maxHeight
        };
        const isTopPosition = dropdownPosition === 'auto' ? bottom < (isIOS ? 200 : search ? 310 : 300) : dropdownPosition === 'top' ? true : false;
        let topHeight = isTopPosition ? top - height : top;
        let keyboardStyle = {};

        if (keyboardAvoiding) {
          if (renderInputSearch) {
            if (keyboardHeight > 0 && bottom < keyboardHeight + height) {
              if (isTopPosition) {
                topHeight = H - keyboardHeight;
              } else {
                keyboardStyle = {
                  backgroundColor: 'rgba(0,0,0,0.1)'
                };
                topHeight = H - keyboardHeight - 55;
              }
            }
          } else {
            if (focus && keyboardHeight > 0 && bottom < keyboardHeight + height) {
              if (isTopPosition) {
                topHeight = H - keyboardHeight;
              } else {
                keyboardStyle = {
                  backgroundColor: 'rgba(0,0,0,0.1)'
                };
                topHeight = H - keyboardHeight - 55;
              }
            }
          }
        }

        return /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
          transparent: true,
          statusBarTranslucent: statusBarIsTranslucent,
          visible: visible,
          supportedOrientations: ['landscape', 'portrait'],
          onRequestClose: showOrClose
        }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
          onPress: showOrClose
        }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: [_styles.styles.flex1, isFull && styleContainerVertical, backgroundColor && {
            backgroundColor: backgroundColor
          }, keyboardStyle]
        }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: [_styles.styles.wrapTop, {
            height: topHeight,
            width: w
          }]
        }, isTopPosition && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: [{
            width: w
          }, _styles.styles.container, containerStyle, isFull ? styleHorizontal : styleVertical]
        }, _renderListTop())), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: _styles.styles.flex1
        }, !isTopPosition && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: [{
            width: w
          }, _styles.styles.container, containerStyle, isFull ? styleHorizontal : styleVertical]
        }, _renderListBottom())))));
      }

      return null;
    }

    return null;
  }, [visible, position, maxHeight, dropdownPosition, search, keyboardAvoiding, statusBarIsTranslucent, showOrClose, styleContainerVertical, backgroundColor, containerStyle, styleHorizontal, _renderListTop, _renderListBottom, renderInputSearch, keyboardHeight, H, focus]);

  const unSelect = item => {
    if (!disable) {
      onSelect(item);
    }
  };

  const _renderItemSelected = inside => {
    const list = data.filter(e => {
      const check = value === null || value === void 0 ? void 0 : value.indexOf(_lodash.default.get(e, valueField));

      if (check !== -1) {
        return e;
      }
    });
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [_styles.styles.rowSelectedItem, inside && _styles.styles.flex1]
    }, list.map(e => {
      if (renderSelectedItem) {
        return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
          testID: _lodash.default.get(e, itemTestIDField || labelField),
          key: _lodash.default.get(e, labelField),
          onPress: () => unSelect(e)
        }, renderSelectedItem(e, () => {
          unSelect(e);
        }));
      } else {
        return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
          testID: _lodash.default.get(e, itemTestIDField || labelField),
          key: _lodash.default.get(e, labelField),
          style: [_styles.styles.selectedItem, selectedStyle],
          onPress: () => unSelect(e)
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
          style: [_styles.styles.selectedTextLeftItem, selectedTextStyle, font()]
        }, _lodash.default.get(e, labelField)), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
          style: [_styles.styles.selectedTextItem, selectedTextStyle]
        }, "\u24E7"));
      }
    }));
  };

  const _renderInside = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [_styles.styles.mainWrap, style],
      ref: ref,
      onLayout: _measure
    }, _renderDropdownInside(), _renderModal());
  };

  const _renderDropdownInside = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
      testID: testID,
      onPress: showOrClose
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: _styles.styles.dropdownInside
    }, renderLeftIcon === null || renderLeftIcon === void 0 ? void 0 : renderLeftIcon(), value && (value === null || value === void 0 ? void 0 : value.length) > 0 ? _renderItemSelected(true) : /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [_styles.styles.textItem, placeholderStyle, font()]
    }, placeholder), renderRightIcon ? renderRightIcon() : /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: ic_down,
      style: [_styles.styles.icon, {
        tintColor: iconColor
      }, iconStyle]
    })));
  };

  if (inside) {
    return _renderInside();
  }

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [_styles.styles.mainWrap, style],
    ref: ref,
    onLayout: _measure
  }, _renderDropdown(), _renderModal()), (!visible || alwaysRenderItemSelected) && _renderItemSelected(false));
});

MultiSelectComponent.defaultProps = defaultProps;
var _default = MultiSelectComponent;
exports.default = _default;
//# sourceMappingURL=index.js.map