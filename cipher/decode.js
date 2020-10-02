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
// module.exports = function (ciphertext, shiftAmount) {
//   var plaintext = "";
//   for (var i = 0; i < ciphertext.length; i++) {
//     var cipherCharacter = ciphertext.charCodeAt(i);
//     if (cipherCharacter >= 97 && cipherCharacter <= 122) {
//       plaintext += String.fromCharCode(
//         ((cipherCharacter - 97 - parseInt(shiftAmount) + 26) % 26) + 97
//       );
//     } else if (cipherCharacter >= 65 && cipherCharacter <= 90) {
//       plaintext += String.fromCharCode(
//         ((cipherCharacter - 65 - parseInt(shiftAmount) + 26) % 26) + 65
//       );
//     } else {
//       plaintext += String.fromCharCode(cipherCharacter);
//     }
//   }
//   return plaintext;
// };
