const { variableConstants } = require("./variableConstants");
const { responseBodyConstants } = require("./responseBodyConstants");

const constants = {
  ...variableConstants,
  ...responseBodyConstants,
}

module.exports.constants = constants
