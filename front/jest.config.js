module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|scss|less)$': '<rootDir>/src/__mocks__/styleMock.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(axios|@fullcalendar)/)' 
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
};
