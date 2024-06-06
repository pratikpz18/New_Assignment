const { regex, eachLike } = require("pactum-matchers");

// Expected Response Body constants
const responseBodyConstants = {
  TODOS_RESPONSE: eachLike({
    "userId": regex(/([0-9]*)/),
    "id": regex(/([0-9]*)/),
    "title": regex(/[:0-9a-zA-Z =?.\/\_-]+|^$/),
    "completed": regex(/[0-9a-zA-Z_-]+|null/),
  }),
  USERS_RESPONSE: eachLike({
    "id": regex(/([0-9]*)/),
    "name": regex(/[:0-9a-zA-Z =?.\/\_-]+|^$/),
    "username": regex(/[:0-9a-zA-Z =?.\/\_-]+|^$/),
    "email": regex(/[:0-9a-zA-Z =?.\/\_-]+|^$/),
    "address": regex(/[:0-9a-zA-Z =?.\/\_-]+|^$/),
    "phone": regex(/[:0-9a-zA-Z =?.\/\_-]+|^$/),
    "website": regex(/[:0-9a-zA-Z =?.\/\_-]+|^$/),
    "company": regex(/[:0-9a-zA-Z =?.\/\_-]+|^$/),
  }),
}

module.exports.responseBodyConstants = responseBodyConstants
