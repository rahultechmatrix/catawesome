function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, Keyboard, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View, I18nManager } from 'react-native';
import CInput from '../TextInput';
import { useDeviceOrientation } from '../../useDeviceOrientation';
import { useDetectDevice } from '../../toolkits';
import { styles } from './styles';
import _ from 'lodash';
const {
  isTablet,
  isIOS
} = useDetectDevice;

const ic_down = require('../../assets/down.png');

const defaultProps = {
  placeholder: 'Select item',
  activeColor: '#F6F7F8',
  data: [],
  style: {}
};
const MultiSelectComponent = /*#__PURE__*/React.forwardRef((props, currentRef) => {
  const orientation = useDeviceOrientation();
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
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [currentValue, setCurrentValue] = useState([]);
  const [listData, setListData] = useState(data);
  const [, setKey] = useState(Math.random());
  const [position, setPosition] = useState();
  const [focus, setFocus] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const {
    width: W,
    height: H
  } = Dimensions.get('window');
  const styleContainerVertical = useMemo(() => {
    return {
      backgroundColor: 'rgba(0,0,0,0.1)',
      alignItems: 'center'
    };
  }, []);
  const styleHorizontal = useMemo(() => {
    return {
      marginBottom: 20,
      width: W / 2,
      alignSelf: 'center'
    };
  }, [W]);
  useImperativeHandle(currentRef, () => {
    return {
      open: eventOpen,
      close: eventClose
    };
  });
  useEffect(() => {
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

  const font = useCallback(() => {
    if (fontFamily) {
      return {
        fontFamily: fontFamily
      };
    } else {
      return {};
    }
  }, [fontFamily]);
  const getValue = useCallback(() => {
    setCurrentValue(value ? [...value] : []);
  }, [value]);

  const _measure = useCallback(() => {
    if (ref && ref !== null && ref !== void 0 && ref.current) {
      ref.current.measure((_width, _height, px, py, fx, fy) => {
        const isFull = orientation === 'LANDSCAPE' && !isTablet;
        const w = Math.floor(px);
        const top = isFull ? 20 : Math.floor(py) + Math.floor(fy) + 2;
        const bottom = H - top;
        const left = I18nManager.isRTL ? W - Math.floor(px) - Math.floor(fx) : Math.floor(fx);
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

  const onKeyboardDidShow = useCallback(e => {
    _measure();

    setKeyboardHeight(e.endCoordinates.height);
  }, [_measure]);

  const onKeyboardDidHide = () => {
    setKeyboardHeight(0);
  };

  useEffect(() => {
    const susbcriptionKeyboardDidShow = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    const susbcriptionKeyboardDidHide = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    return () => {
      if (typeof (susbcriptionKeyboardDidShow === null || susbcriptionKeyboardDidShow === void 0 ? void 0 : susbcriptionKeyboardDidShow.remove) === 'function') {
        susbcriptionKeyboardDidShow.remove();
      } else {
        Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
      }

      if (typeof (susbcriptionKeyboardDidHide === null || susbcriptionKeyboardDidHide === void 0 ? void 0 : susbcriptionKeyboardDidHide.remove) === 'function') {
        susbcriptionKeyboardDidHide.remove();
      } else {
        Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
      }
    };
  }, [onKeyboardDidShow]);
  useEffect(() => {
    getValue();
  }, [getValue, value]);
  const showOrClose = useCallback(() => {
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
  const onSearch = useCallback(text => {
    if (text.length > 0) {
      const defaultFilterFunction = e => {
        var _$get;

        const item = (_$get = _.get(e, labelField)) === null || _$get === void 0 ? void 0 : _$get.toLowerCase().replace(' ', '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const key = text.toLowerCase().replace(' ', '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return item.indexOf(key) >= 0;
      };

      const propSearchFunction = e => {
        const labelText = _.get(e, labelField);

        return searchQuery === null || searchQuery === void 0 ? void 0 : searchQuery(text, labelText);
      };

      const dataSearch = data.filter(searchQuery ? propSearchFunction : defaultFilterFunction);
      setListData(dataSearch);
    } else {
      setListData(data);
    }
  }, [data, labelField, searchQuery]);
  const onSelect = useCallback(item => {
    onSearch('');
    const index = currentValue.findIndex(e => e === _.get(item, valueField));

    if (index > -1) {
      currentValue.splice(index, 1);
    } else {
      if (maxSelect) {
        if (currentValue.length < maxSelect) {
          currentValue.push(_.get(item, valueField));
        }
      } else {
        currentValue.push(_.get(item, valueField));
      }
    }

    onChange(currentValue);
    setKey(Math.random());
  }, [currentValue, maxSelect, onChange, onSearch, valueField]);

  const _renderDropdown = () => {
    return /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
      testID: testID,
      onPress: showOrClose
    }, /*#__PURE__*/React.createElement(View, {
      style: styles.dropdown
    }, renderLeftIcon === null || renderLeftIcon === void 0 ? void 0 : renderLeftIcon(), /*#__PURE__*/React.createElement(Text, {
      style: [styles.textItem, placeholderStyle, font()]
    }, placeholder), renderRightIcon ? renderRightIcon() : /*#__PURE__*/React.createElement(Image, {
      source: ic_down,
      style: [styles.icon, {
        tintColor: iconColor
      }, iconStyle]
    })));
  };

  const checkSelected = useCallback(item => {
    const index = currentValue.findIndex(e => e === _.get(item, valueField));
    return index > -1;
  }, [currentValue, valueField]);

  const _renderItem = useCallback(_ref => {
    let {
      item,
      index
    } = _ref;
    const selected = checkSelected(item);
    return /*#__PURE__*/React.createElement(TouchableOpacity, {
      testID: _.get(item, itemTestIDField || labelField),
      key: index,
      onPress: () => onSelect(item),
      style: [selected && {
        backgroundColor: activeColor,
        ...styles.wrapItem
      }]
    }, renderItem ? renderItem(item, selected) : /*#__PURE__*/React.createElement(View, {
      style: styles.item
    }, /*#__PURE__*/React.createElement(Text, {
      style: [styles.textItem, placeholderStyle, font()]
    }, _.get(item, labelField))));
  }, [activeColor, checkSelected, font, itemTestIDField, labelField, onSelect, placeholderStyle, renderItem]);

  const renderSearch = useCallback(() => {
    if (search) {
      if (renderInputSearch) {
        return renderInputSearch(text => {
          onSearch(text);
        });
      } else {
        return /*#__PURE__*/React.createElement(CInput, {
          testID: testID + ' input',
          style: [styles.input, inputSearchStyle],
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

  const _renderListTop = useCallback(() => {
    return /*#__PURE__*/React.createElement(TouchableWithoutFeedback, null, /*#__PURE__*/React.createElement(View, {
      style: styles.flexShrink
    }, /*#__PURE__*/React.createElement(FlatList, _extends({
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

  const _renderListBottom = useCallback(() => {
    return /*#__PURE__*/React.createElement(TouchableWithoutFeedback, null, /*#__PURE__*/React.createElement(View, {
      style: styles.flexShrink
    }, renderSearch(), /*#__PURE__*/React.createElement(FlatList, _extends({
      testID: testID + ' flatlist'
    }, flatListProps, {
      keyboardShouldPersistTaps: "handled",
      data: listData,
      renderItem: _renderItem,
      keyExtractor: (_item, index) => index.toString(),
      showsVerticalScrollIndicator: showsVerticalScrollIndicator
    }))));
  }, [_renderItem, flatListProps, listData, renderSearch, showsVerticalScrollIndicator, testID]);

  const _renderModal = useCallback(() => {
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

        return /*#__PURE__*/React.createElement(Modal, {
          transparent: true,
          statusBarTranslucent: statusBarIsTranslucent,
          visible: visible,
          supportedOrientations: ['landscape', 'portrait'],
          onRequestClose: showOrClose
        }, /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
          onPress: showOrClose
        }, /*#__PURE__*/React.createElement(View, {
          style: [styles.flex1, isFull && styleContainerVertical, backgroundColor && {
            backgroundColor: backgroundColor
          }, keyboardStyle]
        }, /*#__PURE__*/React.createElement(View, {
          style: [styles.wrapTop, {
            height: topHeight,
            width: w
          }]
        }, isTopPosition && /*#__PURE__*/React.createElement(View, {
          style: [{
            width: w
          }, styles.container, containerStyle, isFull ? styleHorizontal : styleVertical]
        }, _renderListTop())), /*#__PURE__*/React.createElement(View, {
          style: styles.flex1
        }, !isTopPosition && /*#__PURE__*/React.createElement(View, {
          style: [{
            width: w
          }, styles.container, containerStyle, isFull ? styleHorizontal : styleVertical]
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
      const check = value === null || value === void 0 ? void 0 : value.indexOf(_.get(e, valueField));

      if (check !== -1) {
        return e;
      }
    });
    return /*#__PURE__*/React.createElement(View, {
      style: [styles.rowSelectedItem, inside && styles.flex1]
    }, list.map(e => {
      if (renderSelectedItem) {
        return /*#__PURE__*/React.createElement(TouchableOpacity, {
          testID: _.get(e, itemTestIDField || labelField),
          key: _.get(e, labelField),
          onPress: () => unSelect(e)
        }, renderSelectedItem(e, () => {
          unSelect(e);
        }));
      } else {
        return /*#__PURE__*/React.createElement(TouchableOpacity, {
          testID: _.get(e, itemTestIDField || labelField),
          key: _.get(e, labelField),
          style: [styles.selectedItem, selectedStyle],
          onPress: () => unSelect(e)
        }, /*#__PURE__*/React.createElement(Text, {
          style: [styles.selectedTextLeftItem, selectedTextStyle, font()]
        }, _.get(e, labelField)), /*#__PURE__*/React.createElement(Text, {
          style: [styles.selectedTextItem, selectedTextStyle]
        }, "\u24E7"));
      }
    }));
  };

  const _renderInside = () => {
    return /*#__PURE__*/React.createElement(View, {
      style: [styles.mainWrap, style],
      ref: ref,
      onLayout: _measure
    }, _renderDropdownInside(), _renderModal());
  };

  const _renderDropdownInside = () => {
    return /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
      testID: testID,
      onPress: showOrClose
    }, /*#__PURE__*/React.createElement(View, {
      style: styles.dropdownInside
    }, renderLeftIcon === null || renderLeftIcon === void 0 ? void 0 : renderLeftIcon(), value && (value === null || value === void 0 ? void 0 : value.length) > 0 ? _renderItemSelected(true) : /*#__PURE__*/React.createElement(Text, {
      style: [styles.textItem, placeholderStyle, font()]
    }, placeholder), renderRightIcon ? renderRightIcon() : /*#__PURE__*/React.createElement(Image, {
      source: ic_down,
      style: [styles.icon, {
        tintColor: iconColor
      }, iconStyle]
    })));
  };

  if (inside) {
    return _renderInside();
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
    style: [styles.mainWrap, style],
    ref: ref,
    onLayout: _measure
  }, _renderDropdown(), _renderModal()), (!visible || alwaysRenderItemSelected) && _renderItemSelected(false));
});
MultiSelectComponent.defaultProps = defaultProps;
export default MultiSelectComponent;
//# sourceMappingURL=index.js.map