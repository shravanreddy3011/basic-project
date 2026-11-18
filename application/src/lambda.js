const servlerss = require("serverless-http");
const app = require("./app");

module.exports.handler = serverless(app);