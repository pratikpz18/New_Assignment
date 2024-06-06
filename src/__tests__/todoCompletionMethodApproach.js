const { fancodeUsersTest } = require("./methodWiseTodosCompletion");


// Manipulate this function as per your need
const userFilterQueryFunction = () => {
  return user => {
    const lat = parseFloat(user.address.geo.lat);
    const lng = parseFloat(user.address.geo.lng);
    return lat > -40 && lat < 5 && lng > 5 && lng < 100;
  }
}


// query parameter 1: userFilterQueryFunction, // Change this to 'filter function', etc., to test different resource types
// query parameter 2: resourceType, // Change this to 'posts', 'comments', etc., to test different resource types
// query parameter 3: completionPercentageCriteria, // Change this to the desired completion percentage criteria
// query parameter 4: omparisonOperator // Change this to 'greaterThan' if needed

fancodeUsersTest(userFilterQueryFunction(), 'todos', 50, 'greaterThan');

// // You can uncomment and run this for todo's completion less than 56 percentage
// fancodeUsersTest(userFilterQueryFunction(), 'todos', 56, 'lessThan');
