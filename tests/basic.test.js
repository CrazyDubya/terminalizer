const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

describe('Terminalizer CLI', () => {
  const binPath = path.join(__dirname, '..', 'bin', 'app.js');
  
  test('should show help when no command provided', () => {
    try {
      execSync(`node ${binPath}`, { encoding: 'utf8', timeout: 5000 });
    } catch (error) {
      // CLI should exit with error code 1 and show usage message
      expect(error.status).toBe(1);
      expect(error.stderr).toContain('The command is missing');
    }
  });

  test('should show version with --version flag', () => {
    const output = execSync(`node ${binPath} --version`, { encoding: 'utf8', timeout: 5000 });
    expect(output.trim()).toMatch(/^\d+\.\d+\.\d+$/);
  });

  test('should show help with --help flag', () => {
    const output = execSync(`node ${binPath} --help`, { encoding: 'utf8', timeout: 5000 });
    expect(output).toContain('Usage:');
    expect(output).toContain('Commands:');
  });

  test('should list available commands', () => {
    const output = execSync(`node ${binPath} --help`, { encoding: 'utf8', timeout: 5000 });
    expect(output).toContain('init');
    expect(output).toContain('config');
    expect(output).toContain('record');
    expect(output).toContain('play');
    expect(output).toContain('render');
    expect(output).toContain('share');
    expect(output).toContain('generate');
  });
});

describe('Application Structure', () => {
  test('should have main entry point', () => {
    const appPath = path.join(__dirname, '..', 'app.js');
    expect(fs.existsSync(appPath)).toBe(true);
  });

  test('should have binary entry point', () => {
    const binPath = path.join(__dirname, '..', 'bin', 'app.js');
    expect(fs.existsSync(binPath)).toBe(true);
  });

  test('should have config file', () => {
    const configPath = path.join(__dirname, '..', 'config.yml');
    expect(fs.existsSync(configPath)).toBe(true);
  });

  test('should have all command modules', () => {
    const commandsDir = path.join(__dirname, '..', 'commands');
    const commands = ['init.js', 'config.js', 'record.js', 'play.js', 'render.js', 'share.js', 'generate.js'];
    
    commands.forEach(command => {
      expect(fs.existsSync(path.join(commandsDir, command))).toBe(true);
    });
  });
});

describe('Utility Functions', () => {
  const utility = require('../utility.js');
  
  test('should have utility module', () => {
    expect(utility).toBeDefined();
    expect(typeof utility).toBe('object');
  });
});