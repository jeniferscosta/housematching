import '@jest/globals';

// Extend Jest's global namespace with custom matchers or types if needed
declare global {
  namespace jest {
    interface Matchers<R> {
      // Add custom matchers here
    }
  }
}
