/**
 * Terminalizer
 * 
 * @author Mohammad Fares <faressoft.com@gmail.com>
 */

var yargs = require('yargs'),
    requireDir = require('require-dir');
var packageJson = require('./package.json'),
    commands = requireDir('./commands'),
    DI = require('./di.js');

// Define the DI as a global object
global.di = new DI();

// Define the the root path of the app as a global constant
global.ROOT_PATH = __dirname;

// The base url of the Terminalizer website
// `www` is necessary due to https://github.com/faressoft/terminalizer/issues/207
global.BASEURL = 'https://www.terminalizer.com';

// Dependency Injection
di.require('chalk');
di.require('async');
di.require('axios');
di.require('death');
di.require('path');
di.require('os');
di.require('electron');
di.require('deepmerge');
di.require('uuid');
di.require('tmp');
di.require('lodash', '_');
di.require('fs-extra', 'fs');
di.require('js-yaml', 'yaml');
di.require('performance-now', 'now');
di.require('async-promises', 'asyncPromises');
di.require('string-argv', 'stringArgv');
di.require('progress', 'ProgressBar');
di.require('gif-encoder', 'GIFEncoder');
di.require('inquirer');

di.set('pty', require('@homebridge/node-pty-prebuilt-multiarch'));
di.set('PNG', require('pngjs').PNG);
di.set('spawn', require('child_process').spawn);
di.set('utility', require('./utility.js'));
di.set('commands', commands);
di.set('errorHandler', errorHandler);
di.set('Logger', require('./logger.js').Logger);
di.set('validation', require('./validation.js'));

// Initialize yargs
yargs.usage('Usage: $0 <command> [options]')
     // Add link
     .epilogue('For more information, check https://www.terminalizer.com')
     // Set the version number
     .version(packageJson.version)
     // Add aliases for version and help options
     .alias({v: 'version', h: 'help'})
     // Require to pass a command
     .demandCommand(1, 'The command is missing')
     // Strict mode
     .strict()
     // Set width to 90 cols
     .wrap(100)
     // Handle failures
     .fail(errorHandler);

// Load commands
yargs.command(commands.init)
     .command(commands.config)
     .command(commands.record)
     .command(commands.play)
     .command(commands.render)
     .command(commands.share)
     .command(commands.generate)

try {

  // Parse the command line arguments
  yargs.parse();

} catch (error) {

  // Print the error
  errorHandler(error);

}

/**
 * Print an error
 * 
 * @param {String|Error} error
 */
function errorHandler(error) {

  // Preserve stack trace for Error objects
  var errorMessage = error instanceof Error ? error.message : error.toString();
  var stackTrace = error instanceof Error && error.stack ? error.stack : null;

  console.error('Error: \n  ' + errorMessage + '\n');
  
  // Show stack trace in development or if explicitly an Error object
  if (stackTrace && (process.env.NODE_ENV === 'development' || process.env.DEBUG)) {
    console.error('Stack trace:\n' + stackTrace + '\n');
  }
  
  console.error('Hint:\n  Use the ' + di.chalk.green('--help') + ' option to get help about the usage');
  process.exit(1);

}
