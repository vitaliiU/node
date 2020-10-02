//Transform the text (add text to a existing text in Stream)
const fs = require("fs");
const through2 = require("through2");

const cipher = require("../cipher");

module.exports = function (output, actions, shift) {
  let str_to_append = fs.readFileSync(output, "utf8") + "\n";
  let through_opts = { decodeStrings: false, encoding: "utf8" };
  let chunk_handler = function (chunk, enc, next) {
    this.push(str_to_append);

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
    // this.push(str_to_append);
    done();
  };
  let through_stream = through2.ctor(
    through_opts,
    chunk_handler,
    finish_handler
  );
  return through_stream;
};
