// Note: the lower-case 'a' is equal to 97, 'z' -> 122, 'A' -> 65, 'Z' -> 90
const encodeChar = require("./encode-char");

module.exports = function (plaintext, shiftAmount) {
  let cipherText = "";
  for (let i = 0; i < plaintext.length; i++) {
    let plainCharacter = plaintext.charCodeAt(i);
    cipherText += String.fromCharCode(encodeChar(plainCharacter, shiftAmount));
  }
  return cipherText;
};
