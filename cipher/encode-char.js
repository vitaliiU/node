// Note: the lower-case 'a' is equal to 97, 'z' -> 122, 'A' -> 65, 'Z' -> 90
module.exports = function (char, shiftAmount) {
  let outChar = "";
  let shift = parseInt(shiftAmount);

  if (shift < 0) {
    shift = 26 * (Math.trunc(-shift / 26) + 1) + shift;
  }

  if (char >= 97 && char <= 122) {
    outChar = ((char - 97 + shift) % 26) + 97;
  } else if (char >= 65 && char <= 90) {
    outChar = ((char - 65 + shift) % 26) + 65;
  } else {
    outChar = char;
  }

  return outChar;
};
