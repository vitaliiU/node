// node app -a encode -s 7 -i input.txt -o output.txt

const fs = require("fs");
const readline = require("readline");
const util = require("util");
const stream = require("stream");
const pipeline = util.promisify(stream.pipeline);
// const { pipeline } = require("stream");

const cipher = require("./cipher");
const transformReq = require("./service/transform");
const setAttribut = require("./service/set-attribut");

const program = setAttribut();

//app
console.log();
console.log(
  "________________________________START APP______________________________"
);
console.log();

// check required parameters
if (!program.actions) {
  console.error("Failed! Actions (encode/decode) are required");
} else if (!program.shift) {
  console.error("Failed! Shift are required");
  //check optional parametrs
} else {
  if (program.input && program.output) {
    const transform = transformReq(
      program.output,
      program.actions,
      program.shift
    );

    //pipeline promise
    pipeline(
      fs.createReadStream(program.input),
      transform(),
      fs.createWriteStream("./io/output.txt")
    ).then(
      () => console.log("Pipeline succeeded."),
      (error) => console.error("Pipeline is not succeeded." + error.message)
    );
    ///////////////////////////////////////////////////////////////////
    // async function run() {
    //   await pipeline(
    //     fs.createReadStream("input.txt"),
    //     through_stream(),
    //     fs.createWriteStream("output.txt")
    //   );
    //   console.log("Pipeline succeeded.");
    // }
    // run().catch(console.error);
    //////////////////////////////////////////////////////////////////
    // const getTransformStream = (shift, action) => {
    //   return new Transform({
    //     transform(chunk, encoding, callback) {
    //       this.push(caesarMachine(chunk, shift, action));
    //       callback();
    //     }
    //   });
    // };

    // const buildTransformPipeline = options =>
    //   pipeline(
    //     getReadStream(options.input),
    //     getTransformStream(options.shift, options.action),
    //     getWriteStream(options.output),
    //     err => handleErrors(err, options)
    //   );
    ///////////////////////////////////////////////////////////////////
  } else if (program.input && !program.output) {
  } else {
    const rl = readline.createInterface(process.stdin, process.stdout);
    rl.setPrompt(
      `Please, enter text for ${program.actions} (or "exit" for exit) and press Enter >> `
    );
    rl.prompt();
    rl.on("line", function (line) {
      if (line === "exit") {
        console.log("By");
        rl.close();
      } else {
        if (program.actions === "encode") {
          console.log(
            `Encoding result >>  ` + cipher.getEncode(line, program.shift)
          );
        }
        if (program.actions === "decode") {
          console.log(
            `Decoding result >>  ` + cipher.getDecode(line, program.shift)
          );
        }
      }
      rl.prompt();
    }).on("close", function () {
      process.exit(0);
    });
  }
}
