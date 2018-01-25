/**
 * Lambda handler entry point
 */

const serverless = require('serverless-http')
const app = require('./app')

exports.handler = serverless(app)
