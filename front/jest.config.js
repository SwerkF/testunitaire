module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    // ignore css/scss imports
    moduleNameMapper: {
      '\\.(css|less)$': '<rootDir>/src/__mocks__/styleMock.js',
    }
  };
  