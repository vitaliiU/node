const encode = require("./encode");
const decode = require("./decode");
const encodeChar = require("./encode-char");
const decodeChar = require("./decode-char");

module.exports = {
  getEncode: function (text, shift) {
    return encode(text, shift);
  },
  getDecode: function (text, shift) {
    return decode(text, shift);
  },
  getEncodeChar: function (char, shift) {
    return encodeChar(char, shift);
  },
  getDecodeChar: function (char, shift) {
    return decodeChar(char, shift);
  },
};
