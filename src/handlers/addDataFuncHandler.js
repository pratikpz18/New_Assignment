const { handler } = require('pactum');
const { sampleConstants } = require('../constants/constants.js');

handler.addDataFuncHandler('SigninUsernamePassword', () => {
    return { "userName": sampleConstants.USERNAME, "password": sampleConstants.PASSWORD }
});
