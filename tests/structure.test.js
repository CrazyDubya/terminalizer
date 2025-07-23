const fs = require('fs');
const path = require('path');

describe('Application Configuration', () => {
  test('should have valid config.yml structure', () => {
    const configPath = path.join(__dirname, '../config.yml');
    expect(fs.existsSync(configPath)).toBe(true);
    
    const config = fs.readFileSync(configPath, 'utf8');
    expect(config).toContain('command:');
    expect(config).toContain('cwd:');
    expect(config).toContain('frameDelay:');
  });

  test('should have valid package.json', () => {
    const packagePath = path.join(__dirname, '../package.json');
    expect(fs.existsSync(packagePath)).toBe(true);
    
    const pkg = require('../package.json');
    expect(pkg.name).toBe('terminalizer');
    expect(pkg.version).toBeDefined();
    expect(pkg.bin).toBeDefined();
    expect(pkg.bin.terminalizer).toBeDefined();
  });

  test('should have all required dependency modules', () => {
    const requiredModules = [
      'chalk',
      'yargs', 
      'fs-extra',
      'js-yaml',
      'inquirer'
    ];

    requiredModules.forEach(module => {
      expect(() => require(module)).not.toThrow();
    });
  });
});

describe('File Structure Integrity', () => {
  test('should have core application files', () => {
    const requiredFiles = [
      'app.js',
      'di.js',
      'validation.js',
      'logger.js',
      'utility.js',
      'config.yml'
    ];

    requiredFiles.forEach(file => {
      const filePath = path.join(__dirname, '../', file);
      expect(fs.existsSync(filePath)).toBe(true);
    });
  });

  test('should have command modules', () => {
    const commandsDir = path.join(__dirname, '../commands');
    expect(fs.existsSync(commandsDir)).toBe(true);
    
    const commands = fs.readdirSync(commandsDir);
    expect(commands.length).toBeGreaterThan(0);
    
    // Check for key command files
    const keyCommands = ['record.js', 'play.js', 'render.js'];
    keyCommands.forEach(cmd => {
      expect(commands).toContain(cmd);
    });
  });

  test('should have render directory with required files', () => {
    const renderDir = path.join(__dirname, '../render');
    expect(fs.existsSync(renderDir)).toBe(true);
    
    const renderFiles = fs.readdirSync(renderDir);
    expect(renderFiles.length).toBeGreaterThan(0);
    // Check for key render files
    expect(renderFiles).toContain('index.js');
  });
});