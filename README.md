# github-dashboard-project server

A simple backend for the `github-dashboard-project`.

## Development

### Required Dependencies

- [node.js](https://nodejs.org) version 6.9+
- [yarn](https://yarnpkg.com)
- [docker](https://docker.com) and
  [docker-compose](https://docs.docker.com/compose/)

First install npm dependencies:

```sh
yarn install
```

Next, startup DynamoDB.

```sh
docker-compose up
```

Finally, run the server.

```sh
yarn start
```

By default, the server will run on port `8080`. You can change
the port by setting the `PORT` environment variable.

```sh
PORT=9000 yarn start
```

## Querying

This project exposes a [graphql](https://graphql.org)
interface for performing operations.

Assuming the app has started on port `8080`,
you can go to `https://localhost:8080/graphiql`
to access the query tester.

To add a record, run this mutation:

```graphql
mutation {
  addProject(repoSlug: "insert/repoSlugHere") {
    owner
    repo
  }
}
```

To fetch the first few projects, run this query:

```graphql
query {
  listProjects(lastKey: null){
    projects {
      owner,
      repo
    }
    lastKey
  }
}
```

A result could look like this:

```json
{
  "data": {
    "listProjects": {
      "projects": [
        {
          "owner": "charlieduong94",
          "repo": "enzo"
        },
        {
          "owner": "charlieduong94",
          "repo": "koa-path-router"
        },
        {
          "owner": "charlieduong94",
          "repo": "marko-path-router"
        }
      ],
      "lastKey": "<some base64 string>"
    }
  }
}
```

To page through results be sure to pass in the lastKey returned
as input to `listProjects`.

The query to fetch more data would look like this:

```graphql
query {
  listProjects(lastKey: "inputBase64String") {
    projects {
      owner,
      repo
    }
    lastKey
  }
}
```

For more information on the types and operations that
are available, take a look at `./src/graphql/githubProject.js`.
