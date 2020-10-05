// node app -a encode -s 3 -i ./io/input.txt -o ./io/output.txt

const fs = require("fs");
const { Readable } = require("stream");
const readline = require("readline");
const util = require("util");
const stream = require("stream");
const pipeline = util.promisify(stream.pipeline);

const cipher = require("./cipher");
const transformReq = require("./service/transform");
const setAttribut = require("./service/set-attribut");
const notValid = require("./service/validation");

const program = setAttribut();

//app
console.log();
console.log(
  "________________________________START APP______________________________"
);
console.log();

//sett constants attributes
const action = program.action;
const shift = program.shift;
const input = program.input ? program.input : null;
const output = program.output ? program.output : null;

//validation input/output files
notValid(input, output).then((message) => {
  if (message !== "") {
    console.error(message + "\n");
    process.exit(1); // return a nonzero exit code
  }
  // check required parameters
  if (!action || !shift) {
    if (!action) {
      console.error("Failed! Actions (encode/decode) are required.\n");
    }
    if (!shift) {
      console.error("Failed! Shift are required.\n");
    }
    process.exit(1); // return a nonzero exit code
  } else if (action !== "encode" && action !== "decode") {
    console.error("Failed! Actions value isn't valid.\n");
    process.exit(1); // return a nonzero exit code
  }

  //check optional parametrs
  else {
    const transform = transformReq(action, shift);
    //when valid input && output files
    if (input && output) {
      pipeline(
        fs.createReadStream(input),
        transform(),
        fs.createWriteStream(output, {
          flags: "a",
        })
      ).then(
        () => console.log("Output file's writed successfully.\n"),
        (error) => console.error("Output file isn't writed. " + error.message)
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

      //when valid only input files
    } else if (input && !output) {
      pipeline(fs.createReadStream(input), transform(), process.stdout).then(
        () => {},
        (error) =>
          console.error("Output stream ended with ERROR: " + error.message)
      );
    } else {
      //when input files is missing work stdin, stdout (output file)
      const rl = readline.createInterface(process.stdin, process.stdout);
      rl.setPrompt(
        `Please, enter text for ${action} (or "exit" for exit) and press Enter >> `
      );
      rl.prompt();
      rl.on("line", function (line) {
        if (line === "exit") {
          console.log("Bye");
          rl.close();
        } else {
          //when input files is missing && valid output file - write from stdin to output file
          if (output) {
            // creating stream from string
            var str = new Readable({
              read(size) {
                this.push(line);
                this.push(null);
              },
            });

            pipeline(
              str,
              transform(),
              fs.createWriteStream(output, {
                flags: "a",
              })
            ).then(
              () => {},
              (error) =>
                console.error("Output file isn't writed." + error.message)
            );
            //when input && output files is missing - write from stdin to stdout without pipline
          } else {
            if (action === "encode") {
              console.log(
                `Encoding result >>  ` + cipher.getEncode(line, shift)
              );
            }
            if (action === "decode") {
              console.log(
                `Decoding result >>  ` + cipher.getDecode(line, shift)
              );
            }
          }
        }
        rl.prompt();
      }).on("close", function () {
        process.exit(0);
      });
    }
  }
});
