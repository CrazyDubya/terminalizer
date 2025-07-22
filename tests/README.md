# Test Directory

This directory contains tests for the Terminalizer project.

## Test Structure

- `basic.test.js` - Basic CLI and application structure tests
- Additional test files can be added here for specific functionality

## Running Tests

To run tests, first install Jest as a dev dependency:

```bash
npm install --save-dev jest
```

Then add to package.json scripts:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

Run tests with:

```bash
npm test
```

## Test Categories

1. **CLI Tests** - Verify command-line interface functionality
2. **Structure Tests** - Ensure all required files and modules exist
3. **Utility Tests** - Test utility functions and helpers
4. **Integration Tests** - Test end-to-end workflows (future)