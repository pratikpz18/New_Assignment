# New_Assignment
New Assignment regarding API Automation

This project involves API automation using the Pactum library with Jest as the test runner. Follow the steps below to set up and run the tests.
## Prerequisites
1. Node.js installed (version `16.10.0` is recommended, but later versions works as well).
2. A code editor like VSCode (optional, but recommended).


## Steps to Run the Tests
1. Clone the repository in your local machine
  ` git clone <repository-url>`
  ` cd <repository-directory>`
2. You should have node installed more specifically node version `16.10.0` (I have build it using this but it should work for latest versions as well)
3. Do `npm install` to install all dependencies
4. Now you are ready to run the tests
5. You can find the test code in `src/__tests__` this path
6. I have 3 files in which 
  - Standard Approach:
    `todosCompletion.js` executes the given steps and returns the results. Check the terminal output when you run the tests.
  - Method Approach:
    `todoCompletionMethodApproach.js` executes the steps in a more scalable way and is dynamic based on your inputs.
      - You can provide all four parameters according to the test expectations:
        `userFilterQueryFunction`: Change this to 'filter function' to test different resource types.
        `resourceType`: Change this to 'posts', 'comments', etc., to test different resource types.
        `completionPercentageCriteria`: Change this to the desired completion percentage criteria.
        `comparisonOperator`: Change this to 'greaterThan' if needed.
7. To run test you have to run it based on files or using tags commands are 
  - With file : `npm run test src/__tests__/todoCompletionMethodApproach.js` (for runnning method approach tests)
  - With file : `npm run test src/__tests__/todosCompletion.jsjs` (for runnning standard approach tests)
  - With Tags : `npm run test -- --testNamePattern='@fancode'`
8. [IMP] If you want to add re-run to your test file please add this to your package-json script ```node run-failed-tests.js"```


##  Folder Structure: 
1. `failed_test_cases`- Here you would find the failed test cases
2. `reports` - Here jest reports which will create a .html file (& more) which you can see on terminal output after the test are finished (path would be similar to this `/Users/pratikzinjurde/Downloads/New_Assignment/reports/report.html`)
3. `src` - Here you will have all the tests related codes and structures
    - `__tests__` - for the test file
    - `constants` - for the constants files
    - `handlers` - for the handlers file (given by pactum) we can use that but i haven't used it for the test purpose
    - `helpers` - for the helper methods
4. `jest.config.js` - for the test run configuration
5. And other support files for custom process to get failed tests file and running failed tests only

##  View Test Results
- Check the terminal for test results.
- For detailed HTML reports, navigate to the reports directory after the tests have finished. Example path: /Users/pratikzinjurde/Downloads/New_Assignment/reports/report.html
