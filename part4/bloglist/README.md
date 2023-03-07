# Setup

### Prerequisites

1. `Docker` is installed so MongoDB can be setup on your machine.
2. `nvm` is installed to manage node/npm version.

```bash
    docker pull mongo
    docker run -d -p 27017:27017 --name test-mongo mongo:latest
    nvm install
    nvm use
```

### Run locally

```bash
    npm run dev
```

Make requests to [localhost:3001](http://localhost:3003/api/blogs)
