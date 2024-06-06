const { request } = require("pactum");
const { expect } = require('@jest/globals');
const { constants } = require('../constants/constants')
const { commonHelper } = require('../helpers/commonHelper')

describe('All the users of City `FanCode` should have more than half of their todos task completed, @fancode', function () {
    let users;
    let fancodeUsers = [];
    request.setBaseUrl(constants.API_URL_ENDPOINT);
    request.setDefaultTimeout(constants.DEFAULT_TIMEOUT);


    beforeAll(async () => {
        // Fetch all users
        const response = await commonHelper.makeAPIRequest('get', `users`, 200, undefined, undefined, constants.USERS_RESPONSE);
        users = response.body
    });

    it('Identify users belonging to FanCode city', () => {
        // Filter users based on their latitude and longitude
        fancodeUsers = users.filter(user => {
            const lat = parseFloat(user.address.geo.lat);
            const lng = parseFloat(user.address.geo.lng);
            return lat > -40 && lat < 5 && lng > 5 && lng < 100;
        });
        // Ensure we have FanCode users
        expect(fancodeUsers.length).toBeGreaterThan(0);
    });

    it('Fetch todo tasks for each FanCode user', async () => {
        for (const user of fancodeUsers) {
            try {
                // Fetch todos for each user and attach to user object
                const response = await commonHelper.makeAPIRequest('get', `todos?userId=${user.id}`, 200, undefined, undefined, constants.TODOS_RESPONSE);
                const todos = response.body;
                user.todos = todos;
                // Ensure each user has todo tasks
                expect(todos.length).toBeGreaterThan(0);
            } catch (error) {
                console.error(`Error fetching todos for user ${user.id}:`, error);
                throw error;
            }
        }
    });

    it('Verify completion percentage for each FanCode user', () => {
        let results = [];
        for (const user of fancodeUsers) {
            const todos = user.todos;
            const totalTasks = todos.length;
            // Fetch user's total completed todo task
            const completedTasks = todos.filter(todo => todo.completed).length;
            const completionPercentage = (completedTasks / totalTasks) * 100;

            // Log the completion percentage for each user
            console.log(`User ${user.id} - Completion Percentage: ${completionPercentage}%`);

            // Collect results
            results.push({
                userId: user.id,
                completionPercentage,
                passed: completionPercentage > 60 // You can change this threshold as needed
            });
        }

        // Report results
        results.forEach(result => {
            console.log(`User ${result.userId} - Completion Percentage: ${result.completionPercentage}% - ${result.passed ? 'PASSED' : 'FAILED'}`);
        });

        // Assert all results
        results.forEach(result => {
            expect(result.completionPercentage).toBeGreaterThan(60); // Use the same threshold here
        });
    });

    // ****************** FOR HAVING ONE TEST COVERING ALL THE STEPS *****************************

    // it('should have more than half of their todos completed for users in FanCode city', async () => {
    //     try {
    //         // Fetch all users
    //         const userResponse = await commonHelper.makeAPIRequest('get', `users`, 200);
    //         const users = userResponse.body;

    //         // Filter users based on their latitude and longitude
    //         const fancodeUsers = users.filter(user => {
    //             const lat = parseFloat(user.address.geo.lat);
    //             const lng = parseFloat(user.address.geo.lng);
    //             return lat > -40 && lat < 5 && lng > 5 && lng < 100;
    //         });

    //         // Ensure we have FanCode users
    //         expect(fancodeUsers.length).toBeGreaterThan(0);

    //         for (const user of fancodeUsers) {
    //             try {
    //                 // Fetch todos for each user
    //                 const usersTodoResponse = await commonHelper.makeAPIRequest('get', `todos?userId=${user.id}`, 200);
    //                 const todos = usersTodoResponse.body;
    //                 expect(todos.length).toBeGreaterThan(0); // Ensure each user has todo tasks

    //                 // Calculate completion percentage
    //                 const totalTasks = todos.length;
    //                 const completedTasks = todos.filter(todo => todo.completed).length;
    //                 const completionPercentage = (completedTasks / totalTasks) * 100;

    //                 // Log the completion percentage for each user
    //                 console.log(`User ${user.id} - Completion Percentage: ${completionPercentage}%`);

    //                 // Verify the completion percentage is greater than 50%
    //                 expect(completionPercentage).toBeGreaterThan(50);
    //             } catch (error) {
    //                 console.error(`Error fetching todos for user ${user.id}:`, error);
    //                 throw error;
    //             }
    //         }
    //     } catch (error) {
    //         console.error('Error in test execution:', error);
    //         throw error;
    //     }
    // });

    // ****************** FOR HAVING ONE TEST COVERING ALL THE STEPS *****************************

});
