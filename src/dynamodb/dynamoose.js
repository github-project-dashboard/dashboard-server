const dynamoose = require('dynamoose')

if (process.env.LOCAL_DEV === 'true') {
  dynamoose.local()

  dynamoose.AWS.config.update({
    accessKeyId: 'AKID',
    secretAccessKey: 'SECRET',
    region: 'us-east-1'
  })
}

module.exports = dynamoose
