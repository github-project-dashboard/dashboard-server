const { makeExecutableSchema } = require('graphql-tools')

const {
  addProject,
  listProjects
} = require('../dynamodb/githubProject')

const typeDefs = `
  type GithubProject {
    owner: String!
    repo: String!
    readmeSnippet: String
  }

  type ListResult {
    projects: [ GithubProject ]
    lastKey: String
  }

  type Query {
    listProjects (lastKey: String): ListResult
  }

  type Mutation {
    addProject (repoSlug: String!): GithubProject
    removeProject (name: String): Boolean!
  }
`

const resolvers = {
  Query: {
    listProjects (_, { lastKey }) {
      return listProjects(lastKey)
    }
  },
  Mutation: {
    async addProject (_, { repoSlug }) {
      const [ owner, repo ] = repoSlug.split('/')
      return addProject({ owner, repo })
    }
  }
}

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
})
