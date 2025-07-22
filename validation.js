/**
 * Input validation utilities
 * 
 * @author Mohammad Fares <faressoft.com@gmail.com>
 */

const path = require('path');
const fs = require('fs');

/**
 * Validate recording file name
 * 
 * @param  {String}  filename
 * @return {Object}  {valid: boolean, error?: string}
 */
function validateRecordingFile(filename) {
  if (!filename) {
    return { valid: false, error: 'Recording file name is required' };
  }

  // Check for valid filename characters
  const invalidChars = /[<>:"/\\|?*]/;
  if (invalidChars.test(filename)) {
    return { valid: false, error: 'Recording file name contains invalid characters' };
  }

  // Check length
  if (filename.length > 255) {
    return { valid: false, error: 'Recording file name is too long' };
  }

  return { valid: true };
}

/**
 * Validate and sanitize file path
 * 
 * @param  {String}  filePath
 * @return {Object}  {valid: boolean, path?: string, error?: string}
 */
function validateFilePath(filePath) {
  if (!filePath) {
    return { valid: false, error: 'File path is required' };
  }

  try {
    const resolved = path.resolve(filePath);
    
    // Basic path traversal protection
    if (resolved.includes('..')) {
      return { valid: false, error: 'Path traversal not allowed' };
    }

    return { valid: true, path: resolved };
  } catch (error) {
    return { valid: false, error: 'Invalid file path: ' + error.message };
  }
}

/**
 * Validate configuration object
 * 
 * @param  {Object}  config
 * @return {Object}  {valid: boolean, errors?: Array}
 */
function validateConfig(config) {
  const errors = [];

  if (!config || typeof config !== 'object') {
    return { valid: false, errors: ['Configuration must be an object'] };
  }

  // Validate cols and rows
  if (config.cols !== 'auto' && (isNaN(config.cols) || config.cols < 1)) {
    errors.push('cols must be "auto" or a positive number');
  }

  if (config.rows !== 'auto' && (isNaN(config.rows) || config.rows < 1)) {
    errors.push('rows must be "auto" or a positive number');
  }

  // Validate quality
  if (config.quality && (isNaN(config.quality) || config.quality < 1 || config.quality > 100)) {
    errors.push('quality must be a number between 1 and 100');
  }

  // Validate frameDelay
  if (config.frameDelay !== 'auto' && (isNaN(config.frameDelay) || config.frameDelay < 0)) {
    errors.push('frameDelay must be "auto" or a non-negative number');
  }

  // Validate maxIdleTime
  if (config.maxIdleTime !== 'auto' && (isNaN(config.maxIdleTime) || config.maxIdleTime < 0)) {
    errors.push('maxIdleTime must be "auto" or a non-negative number');
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Sanitize command string to prevent injection
 * 
 * @param  {String}  command
 * @return {Object}  {valid: boolean, command?: string, error?: string}
 */
function sanitizeCommand(command) {
  if (!command) {
    return { valid: true, command: null };
  }

  if (typeof command !== 'string') {
    return { valid: false, error: 'Command must be a string' };
  }

  // Basic command injection protection
  const dangerousPatterns = [
    /[;&|`$()]/,  // Shell metacharacters
    /\|\|/,       // OR operator
    /&&/,         // AND operator
    />/,          // Redirection
    /</           // Input redirection
  ];

  for (const pattern of dangerousPatterns) {
    if (pattern.test(command)) {
      return { valid: false, error: 'Command contains potentially dangerous characters' };
    }
  }

  return { valid: true, command: command.trim() };
}

module.exports = {
  validateRecordingFile,
  validateFilePath,
  validateConfig,
  sanitizeCommand
};