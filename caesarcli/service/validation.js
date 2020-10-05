//validation input|outpu files
const fs = require("fs");

module.exports = async function (input, output) {
  let message = "";
  if (input) {
    let promiseIn = new Promise((resolve, reject) => {
      fs.access(input, fs.constants.F_OK | fs.constants.R_OK, (err) => {
        if (err) {
          if (err.code === "ENOENT") {
            resolve("Input file does not exist. ");
          } else {
            resolve("Input the file is not readable. ");
          }
        } else {
          resolve("");
        }
      });
    });
    message += await promiseIn;
  }

  if (output) {
    let promiseOut = new Promise((resolve, reject) => {
      fs.access(output, fs.constants.F_OK | fs.constants.W_OK, (err) => {
        if (err) {
          if (err.code === "ENOENT") {
            resolve("Output file does not exist. ");
          } else {
            resolve("Output the file is not writable. ");
          }
        } else {
          resolve("");
        }
      });
    });
    message += await promiseOut;
  }

  return message;
};
