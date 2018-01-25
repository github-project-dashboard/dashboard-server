/**
 * Local server for development
 */

// NOTE: it's important that this is loaded first

const app = require('./app')
const port = process.env.PORT || 8080

app.listen(port, function () {
  console.log(`Server is now listening on port ${port}...`)
})
