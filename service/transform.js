//Transform the text (add text to a existing text in Stream)
const fs = require("fs");
const through2 = require("through2");

const cipher = require("../cipher");

module.exports = function (actions, shift) {
  let through_opts = { decodeStrings: false, encoding: "utf8" };
  let chunk_handler = function (chunk, enc, next) {
    if (actions === "encode") {
      this.push("Encoding result >> ");
    } else {
      this.push("Decoding result >> ");
    }
    for (let i = 0; i < chunk.length; i++) {
      if (actions === "encode") {
        chunk[i] = cipher.getEncodeChar(chunk[i], shift);
      } else {
        chunk[i] = cipher.getDecodeChar(chunk[i], shift);
      }
    }

    next(null, chunk);
  };
  let finish_handler = function (done) {
    this.push("\n");
    done();
  };
  let through_stream = through2.ctor(
    through_opts,
    chunk_handler,
    finish_handler
  );
  return through_stream;
};
