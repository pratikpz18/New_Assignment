const fs = require('fs');
const path = require('path');

module.exports = (result) => {
  // storing request and response of the data
  const requestAndResponse = result.testResults[0].console;

  //coopying the test file
  const testFilePath = result.testResults[0].testFilePath

  // Filter out only failed tests
  const failedTests = result.testResults[0].testResults.filter(test => test.status === 'failed');

  // Create a data object with information about failed tests
  const failedTestsData = failedTests.map(test => ({
    testName: test.fullName,
    testFilePath: testFilePath,
    status: 'failed',
  }));

  const baseFile = path.basename(testFilePath);
  const failedTestFileName = baseFile.split('.js')[0];

  // Specify the directory name
  const directoryName = 'failed_test_cases';

  // Create the directory if it doesn't exist
  const directoryPath = path.join(__dirname, directoryName);
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
  }

  // Specify the file path inside the directory
  const filePath = path.join(directoryPath, `${failedTestFileName}-failed-tests.json`);
  fs.writeFileSync(filePath, JSON.stringify(failedTestsData, null, 2));

  // Return the original result to Jest
  return result;
};
