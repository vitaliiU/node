//Declaring program variable
const { Command } = require("commander");
const program = new Command();

module.exports = function () {
  //set attributes
  program.version("6.1.0");
  program
    .option("-s, --shift <shift-number>", "a shift")
    .option("-a, --actions <actions-name>", "an actions encode/decode")
    .option("-i, --input <input-file>", "an input file")
    .option("-o, --output <output-file>", "an output file");
  program.parse(process.argv);
  return program;
};
