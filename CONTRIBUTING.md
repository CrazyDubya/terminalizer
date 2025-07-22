# Contributing to Terminalizer

Thank you for your interest in contributing to Terminalizer! This guide will help you get started and ensure your contributions align with our standards.

## Code Quality Standards

### Testing Requirements
- All new features must include tests
- Bug fixes should include regression tests
- Aim for high test coverage on new code
- Run `npm test` before submitting changes

### Code Style
- Follow existing code patterns and conventions
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep functions focused and single-purpose

### Security
- Follow security guidelines in `SECURITY.md`
- Validate all user inputs
- Use provided validation utilities
- Avoid shell injection vulnerabilities

## Development Setup

### Prerequisites
- Node.js 14+ (recommended: latest LTS)
- npm or yarn package manager
- Git for version control

### Getting Started
1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Install dependencies: `npm install`
4. Run tests: `npm test`
5. Create a feature branch: `git checkout -b feature/your-feature`

### Development Workflow
1. Make your changes
2. Add/update tests as needed
3. Run tests: `npm test`
4. Run linting: `npm run lint` (if available)
5. Commit your changes with clear messages
6. Push to your fork
7. Create a pull request

## Best Practices

### Error Handling
```javascript
// Good: Proper error handling with context
try {
  const result = await someOperation();
  di.Logger.success('Operation completed successfully');
  return result;
} catch (error) {
  di.Logger.error('Operation failed:', error.message);
  throw new Error(`Failed to complete operation: ${error.message}`);
}

// Bad: Silent failures or generic errors
try {
  const result = await someOperation();
  return result;
} catch (error) {
  // Silent failure
}
```

### Input Validation
```javascript
// Good: Validate inputs using provided utilities
const validation = di.validation.validateRecordingFile(filename);
if (!validation.valid) {
  throw new Error(validation.error);
}

// Bad: No validation
function processFile(filename) {
  // Directly using user input without validation
  fs.readFile(filename, callback);
}
```

### Logging
```javascript
// Good: Use the logger utility
di.Logger.info('Starting recording process');
di.Logger.debug('Debug info:', debugData);
di.Logger.error('Process failed:', error);

// Bad: Direct console usage
console.log('Starting process');
console.error(error);
```

### Async/Await
```javascript
// Good: Consistent async/await usage
async function processRecording(file) {
  try {
    const data = await readFile(file);
    const processed = await processData(data);
    await saveResult(processed);
    return processed;
  } catch (error) {
    di.Logger.error('Processing failed:', error);
    throw error;
  }
}

// Bad: Mixed callbacks and promises
function processRecording(file, callback) {
  readFile(file, (err, data) => {
    if (err) return callback(err);
    processData(data).then(processed => {
      callback(null, processed);
    }).catch(callback);
  });
}
```

## Pull Request Guidelines

### Before Submitting
- [ ] Code follows project conventions
- [ ] Tests are included and passing
- [ ] Documentation is updated if needed
- [ ] Security guidelines are followed
- [ ] No debug statements or console.log in production code
- [ ] Commit messages are clear and descriptive

### PR Description Template
```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to change)
- [ ] Documentation update

## Testing
- [ ] Tests added/updated
- [ ] All tests pass
- [ ] Manual testing completed

## Security
- [ ] Security guidelines followed
- [ ] Input validation implemented
- [ ] No sensitive data exposed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or clearly documented)
```

## Issue Guidelines

### Bug Reports
Include:
- Terminalizer version
- Operating system and version
- Node.js version
- Steps to reproduce
- Expected vs actual behavior
- Error messages (if any)
- Sample configuration (if relevant)

### Feature Requests
Include:
- Clear description of the feature
- Use case and justification
- Proposed implementation approach
- Potential breaking changes
- Alternative solutions considered

## Code Review Process

### For Contributors
- Be responsive to feedback
- Make requested changes promptly
- Ask questions if feedback is unclear
- Keep PRs focused and atomic

### For Reviewers
- Be constructive and specific
- Focus on code quality and security
- Test changes locally when possible
- Approve when standards are met

## Release Process

### Version Bumping
- Follow semantic versioning (semver)
- Update CHANGELOG.md
- Tag releases appropriately
- Update documentation as needed

### Release Notes
- Highlight new features
- List bug fixes
- Note breaking changes
- Include upgrade instructions

## Getting Help

- Check existing issues and documentation first
- Ask questions in GitHub discussions
- Join the community chat (if available)
- Reach out to maintainers for guidance

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes for significant contributions
- Invited to become maintainers for sustained contributions

Thank you for helping make Terminalizer better!