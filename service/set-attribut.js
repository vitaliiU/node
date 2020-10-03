//Declaring program variable
const { Command } = require("commander");
const program = new Command();

module.exports = function () {
  //set attributes
  program.storeOptionsAsProperties(false).passCommandToAction(false);
  program
    .option("-s, --shift <shift-number>", "a shift")
    .option("-i, --input <input-file>", "an input file")
    .option("-o, --output <output-file>", "an output file");

  program
    // .command("show")
    .option('-a, --action <actions-name>", "an actions encode/decode')
    .action((options) => {
      // console.log(options.action);
    });

  program.parse(process.argv);
  const programOptions = program.opts();
  return programOptions;
};
