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
// module.exports = function (plaintext, shiftAmount) {
//   let ciphertext = "";
//   for (let i = 0; i < plaintext.length; i++) {
//     let plainCharacter = plaintext.charCodeAt(i);
//     if (plainCharacter >= 97 && plainCharacter <= 122) {
//       ciphertext += String.fromCharCode(
//         ((plainCharacter - 97 + parseInt(shiftAmount)) % 26) + 97
//       );
//       let t = plainCharacter - 97 + parseInt(shiftAmount);
//     } else if (plainCharacter >= 65 && plainCharacter <= 90) {
//       ciphertext += String.fromCharCode(
//         ((plainCharacter - 65 + parseInt(shiftAmount)) % 26) + 65
//       );
//     } else {
//       ciphertext += String.fromCharCode(plainCharacter);
//     }
//   }
//   return ciphertext;
// };
