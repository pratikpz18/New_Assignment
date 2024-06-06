const { request } = require("pactum");
const { constants } = require('../constants/constants')
const { commonHelper } = require('../helpers/commonHelper')

const fancodeUsersTest = async (userFilterQueryFunction, resourceType, completionPercentageCriteria, comparisonOperator) => {


  describe(`All the users of City 'FanCode' should have ${comparisonOperator} or equal to ${completionPercentageCriteria}% completed ${resourceType}, @fancode_method`, function () {
    request.setBaseUrl(constants.API_URL_ENDPOINT);
    request.setDefaultTimeout(constants.DEFAULT_TIMEOUT);

    it(`should execute test for FanCode city users with ${comparisonOperator} or equal to ${completionPercentageCriteria}% completed ${resourceType}`, async () => {
      await commonHelper.executeTest(
        userFilterQueryFunction, // Change this to 'filter function', etc., to test different resource types
        resourceType, // Change this to 'posts', 'comments', etc., to test different resource types
        completionPercentageCriteria, // Change this to the desired completion percentage criteria
        comparisonOperator // Change this to 'greaterThan' if needed
      );
    });
  });

}

module.exports = {
  fancodeUsersTest,
};
