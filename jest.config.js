/** @type {import('jest').Config} */

module.exports = {
    displayName: {
        name: 'TESTS',
        color: 'blue',
    },
    testTimeout: 15000,
    maxConcurrency: 1,
    // maxWorkers: '50%',
    verbose: false,
    reporters: [
        'default',
        [
            'jest-junit',
            { outputDirectory: 'reports', outputName: 'report.xml' }
        ],
        [
            "jest-html-reporters", {
                "publicPath": "reports/",
                "filename": "report.html",
                "pageTitle": "Report",
                "expand": true,
                "openReport": false,
                "urlForTestFiles": "",
            }
        ]
    ],
    testResultsProcessor: './custom-processor.js',
};
