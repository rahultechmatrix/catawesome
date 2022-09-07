"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = void 0;

var _reactNative = require("react-native");

const styles = _reactNative.StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    justifyContent: 'center'
  },
  textInput: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  input: {
    fontSize: 16,
    flex: 1
  },
  label: {
    marginBottom: 4,
    fontSize: 16
  },
  row: {
    flexDirection: 'row'
  },
  icon: {
    width: 20,
    height: 20
  },
  textError: {
    color: 'red',
    fontSize: 14,
    marginTop: 10
  }
});

exports.styles = styles;
//# sourceMappingURL=styles.js.map