const { spec, request } = require("pactum");
const { constants } = require('../constants/constants')

module.exports.commonHelper = {

  /**
   * Makes API Request
   * 
   * @param {*} method 
   * @param {*} endpoint 
   * @param {*} statusCode 
   * @param {*} authorization 
   * @param {*} queryParams 
   * @param {*} expectedJson 
   * @param {*} requestBody 
   * 
   * @returns response object
   */
  async makeAPIRequest(
    method = 'get',
    endpoint,
    statusCode = 200,
    authorization = undefined,
    queryParams = undefined,
    expectedJson = undefined,
    requestBody = undefined,
  ) {
    try {
      const request = spec()[method](endpoint);

      if (authorization) {
        request.withHeaders("Authorization", `Bearer ${authorization}`);
      }

      if (queryParams) {
        request.withQueryParams(queryParams);
      }

      if (requestBody) {
        request.withJson(requestBody);
      }

      if (statusCode) {
        request.expectStatus(statusCode);
      }

      if (expectedJson) {
        request.expectJsonMatchStrict(expectedJson);
      }

      const response = await request.inspect();
      return response;
    } catch (error) {
      console.error('Error making API request:', error);
      throw error;
    }
  },

  /**
   * Executes the test based on the given request
   * 
   * @param {*} userFilterFunc 
   * @param {*} resourceType 
   * @param {*} completionPercentageCriteria 
   * @param {*} comparisonOperator 
   * 
   * @returns response object
   */
  async executeTest(userFilterFunc, resourceType, completionPercentageCriteria, comparisonOperator) {
    let users;
    let filteredUsers = [];

    // Fetch all users
    const response = await this.makeAPIRequest('get', `users`, 200, undefined, undefined, constants.USERS_RESPONSE);
    users = response.body;

    // Filter users based on the provided filter function
    filteredUsers = users.filter(userFilterFunc);

    // Ensure we have filtered users
    expect(filteredUsers.length).toBeGreaterThan(0);

    // Fetch resource for each filtered user
    for (const user of filteredUsers) {
      try {
        const response = await this.makeAPIRequest('get', `${resourceType}?userId=${user.id}`, 200, undefined, undefined, constants.TODOS_RESPONSE);
        const resources = response.body;
        user[resourceType] = resources;
        // Ensure user has resources
        expect(resources.length).toBeGreaterThan(0);
      } catch (error) {
        console.error(`Error fetching ${resourceType} for user ${user.id}:`, error);
        throw error;
      }
    }

    // Fetch resource for each filtered user and collect results
    let results = [];

    // Verify completion percentage for each user
    for (const user of filteredUsers) {
      try {
        const resources = user[resourceType];
        const totalTasks = resources.length;
        // Fetch user's total completed resources
        const completedTasks = resources.filter(resource => resource.completed).length;
        const completionPercentage = (completedTasks / totalTasks) * 100;

        // Log the completion percentage for each user
        console.log(`User ${user.id} - Completion Percentage: ${completionPercentage}%`);

        // Below chcek will assert for the first time and will fail the whole assertion so moving it out from thr for loop to collect all users data in results array
        // // Verify the completion percentage based on criteria and comparison operator 
        // switch (comparisonOperator) { 
        //   case 'greaterThan':
        //     expect(completionPercentage).toBeGreaterThan(completionPercentageCriteria);
        //     break;
        //   case 'lessThan':
        //     expect(completionPercentage).toBeLessThan(completionPercentageCriteria);
        //     break;
        //   default:
        //     throw new Error(`Invalid comparison operator: ${comparisonOperator}`);
        // }

        // Collect results
        results.push({
          userId: user.id,
          completionPercentage,
          passed: comparisonOperator === 'greaterThan' ? completionPercentage > completionPercentageCriteria : completionPercentage < completionPercentageCriteria
        });
      } catch (error) {
        console.error(`Error fetching ${resourceType} for user ${user.id}:`, error);
        throw error;
      }
    }

    // Report results
    results.forEach(result => {
      console.log(`[RESULTS] -> User ${result.userId} - Completion Percentage: ${result.completionPercentage}% - ${result.passed ? 'PASSED' : 'FAILED'}`);
    });

    // Assert all results
    results.forEach(result => {
      if (comparisonOperator === 'greaterThan') {
        expect(result.completionPercentage).toBeGreaterThan(completionPercentageCriteria);
      } else {
        expect(result.completionPercentage).toBeLessThan(completionPercentageCriteria);
      }
    });
  }
};