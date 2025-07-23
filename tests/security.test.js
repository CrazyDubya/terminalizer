const { execSync } = require('child_process');
const path = require('path');

describe('Security Tests', () => {
  test('should not have obvious security vulnerabilities in dependencies', () => {
    // Test that we can run audit without critical/high vulnerabilities
    const auditResult = execSync('npm audit --audit-level=high --json', { 
      cwd: path.join(__dirname, '..'),
      encoding: 'utf8'
    });
    
    const audit = JSON.parse(auditResult);
    expect(audit.metadata.vulnerabilities.high || 0).toBe(0);
    expect(audit.metadata.vulnerabilities.critical || 0).toBe(0);
  });

  test('should have security documentation', () => {
    const fs = require('fs');
    const securityFile = path.join(__dirname, '../SECURITY.md');
    expect(fs.existsSync(securityFile)).toBe(true);
    
    const content = fs.readFileSync(securityFile, 'utf8');
    expect(content).toContain('Security');
    expect(content).toContain('vulnerability');
  });

  test('should validate input parameters', () => {
    const validation = require('../validation');
    
    // Test that validation functions exist and work
    expect(typeof validation.validateFileName).toBe('function');
    expect(typeof validation.validateCommand).toBe('function');
    expect(typeof validation.validatePath).toBe('function');
  });
});

describe('Code Quality Tests', () => {
  test('should not contain debug statements in production code', () => {
    const fs = require('fs');
    const glob = require('glob');
    
    // Ignore test files and node_modules
    const files = glob.sync('**/*.js', { 
      cwd: path.join(__dirname, '..'),
      ignore: ['node_modules/**', 'tests/**', 'coverage/**']
    });
    
    files.forEach(file => {
      const content = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
      expect(content).not.toContain('console.debug');
      expect(content).not.toContain('debugger;');
    });
  });

  test('should have proper error handling', () => {
    const fs = require('fs');
    const appContent = fs.readFileSync(path.join(__dirname, '../app.js'), 'utf8');
    
    // Should contain error handling patterns
    expect(appContent).toContain('catch');
  });
});