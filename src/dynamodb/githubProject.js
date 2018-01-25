const dynamoose = require('./dynamoose')

const SCAN_LIMIT = 15

const GithubProject = dynamoose.model('GithubProject', {
  owner: {
    type: String,
    required: true,
    hashKey: true
  },
  repo: {
    type: String,
    required: true,
    rangeKey: true
  },
  url: {
    type: String,
    required: true
  }
}, {
  throughput: {
    read: 10,
    write: 10
  }
})

async function listProjects (startingPoint) {
  const scan = GithubProject.scan()
    .limit(SCAN_LIMIT)

  if (startingPoint) {
    const key = JSON.parse(
      Buffer.from(startingPoint, 'base64').toString('utf8')
    )

    scan.startAt(key)
  }
  const results = await scan.exec()

  let lastKey
  if (results.lastKey) {
    lastKey = Buffer.from(
      JSON.stringify(results.lastKey)
    ).toString('base64')
  }

  return {
    projects: results,
    lastKey
  }
}

function addProject ({ owner, repo, readme }) {
  const githubProject = new GithubProject({
    owner,
    repo,
    url: `https://github.com/${owner}/${repo}`
  })

  return githubProject.save()
}

function removeProject (name) {
  // todo
}

function updateProject (project) {
  // todo
}

module.exports = {
  listProjects,
  addProject,
  removeProject,
  updateProject
}
