const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

// Specify the directory name
const directoryName = 'failed_test_cases';

// Ensure the directory exists
const directoryPath = path.join(__dirname, directoryName);
if (!fs.existsSync(directoryPath)) {
  console.error(`Directory "${directoryName}" does not exist.`);
  return;
}

// Get an array of all file names in the directory
const failedTestFiles = fs.readdirSync(directoryPath);

// Loop through each file and perform some operation
failedTestFiles.forEach((failedTestFileName) => {
  const filePath = path.join(directoryPath, failedTestFileName);

  // Read the failed-tests.json file
  const failedTestsData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  // Ignore if no tests failed in the first run
  if (failedTestsData.length === 0) {
    console.info(`No Failed Test Case in ${failedTestFileName}:`);
    return;
  }

  // Extract the test file paths and names from the failed test data
  const failedTestPatterns = failedTestsData.map(test => `--testPathPattern="${test.testFilePath}" --testNamePattern="${test.testName}"`);

  // Generate the test command with failed test patterns as arguments
  const testCommand = `npx jest ${failedTestPatterns.join(' ')}`;

  // Run the command to rerun the failed tests
  for (const test of failedTestPatterns) {
    // Generate the test command with failed test patterns as arguments
    const testProcess = spawnSync(`npx jest ${test}`, { stdio: 'inherit', shell: true });
  }
});
