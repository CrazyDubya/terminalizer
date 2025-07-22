/**
 * Simple logging utility for Terminalizer
 * 
 * @author Mohammad Fares <faressoft.com@gmail.com>
 */

const chalk = require('chalk');

/**
 * Log levels
 */
const LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3
};

/**
 * Current log level (can be controlled by environment variable)
 */
const LOG_LEVEL = process.env.LOG_LEVEL ? 
  LEVELS[process.env.LOG_LEVEL.toUpperCase()] || LEVELS.INFO : 
  LEVELS.INFO;

/**
 * Logger class
 */
class Logger {
  
  static error(message, ...args) {
    if (LOG_LEVEL >= LEVELS.ERROR) {
      console.error(chalk.red('ERROR:'), message, ...args);
    }
  }

  static warn(message, ...args) {
    if (LOG_LEVEL >= LEVELS.WARN) {
      console.warn(chalk.yellow('WARN:'), message, ...args);
    }
  }

  static info(message, ...args) {
    if (LOG_LEVEL >= LEVELS.INFO) {
      console.log(chalk.blue('INFO:'), message, ...args);
    }
  }

  static debug(message, ...args) {
    if (LOG_LEVEL >= LEVELS.DEBUG) {
      console.log(chalk.gray('DEBUG:'), message, ...args);
    }
  }

  static success(message, ...args) {
    if (LOG_LEVEL >= LEVELS.INFO) {
      console.log(chalk.green('SUCCESS:'), message, ...args);
    }
  }

  static progress(message, ...args) {
    if (LOG_LEVEL >= LEVELS.INFO) {
      console.log(chalk.magenta('PROGRESS:'), message, ...args);
    }
  }
}

module.exports = {
  Logger,
  LEVELS,
  error: Logger.error,
  warn: Logger.warn,
  info: Logger.info,
  debug: Logger.debug,
  success: Logger.success,
  progress: Logger.progress
};