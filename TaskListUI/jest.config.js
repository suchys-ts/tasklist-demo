// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

// eslint-disable-next-line import/no-commonjs
module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    'src/**/*.[jt]s',
    'src/**/*.[jt]sx',
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/polyfills/**',
    '!src/utility/fetch.js',
  ],

  // The directory where Jest should output its coverage files
  coverageDirectory: './test/output/coverage',

  // A list of reporter names that Jest uses when writing coverage reports.
  coverageReporters: ['text', 'html', 'json-summary'],

  globals: {
    __DEV__: true,
    documentProxyObj: {},
  },
  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx'],

  moduleNameMapper: {
    '\\.(html)$': '<rootDir>/src/__mocks__/index_html.js',
  },

  // Use this configuration option to add custom reporters to Jest.
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        filename: 'jest-report.html',
      },
    ],
  ],

  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: ['<rootDir>/jest_setup.js'],

  // Enables passing the output of shallow(..), mount(..) directly to a snapshot
  snapshotSerializers: ['enzyme-to-json/serializer'],

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  // The glob patterns Jest uses to detect test files
  testMatch: ['**/?(*.)test.[jt]s', '**/?(*.)test.[jt]sx'],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ['public/', 'dist/', 'build/', '.git/'],

  // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
  testURL: 'https://localhost:8080/api/todos',

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: ['.git'],

  // Indicates whether each individual test should be reported during the run
  verbose: false,
};
