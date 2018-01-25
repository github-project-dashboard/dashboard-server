const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-path-router')
const apolloServerKoa = require('apollo-server-koa')
const { graphqlKoa } = apolloServerKoa

const graphqlGithubProjectHandler = graphqlKoa({
  schema: require('./graphql/githubProject')
})

const app = new Koa()
const router = new Router()

app.use(bodyParser())

router.post('/graphql', graphqlGithubProjectHandler)
router.get('/graphql', graphqlGithubProjectHandler)

// setup graphiql interface for running queries
// for development
if (process.env.LOCAL_DEV === 'true') {
  const { graphiqlKoa } = apolloServerKoa

  router.get('/graphiql', graphiqlKoa({
    endpointURL: '/graphql'
  }))
}

app.use(router.getRequestHandler())

module.exports = app
