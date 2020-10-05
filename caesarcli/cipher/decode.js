// Note: the lower-case 'a' is equal to 97, 'z' -> 122, 'A' -> 65, 'Z' -> 90
const decodeChar = require("./decode-char");

module.exports = function (ciphertext, shiftAmount) {
  var cipherText = "";
  for (var i = 0; i < ciphertext.length; i++) {
    var cipherCharacter = ciphertext.charCodeAt(i);
    cipherText += String.fromCharCode(decodeChar(cipherCharacter, shiftAmount));
  }
  return cipherText;
};
