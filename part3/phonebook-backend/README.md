## Local Development

### Prerequisites

- (Optional) [nvm](https://github.com/nvm-sh/nvm) is installed
- [Node & npm](https://nodejs.org/en/download/) is installed
- [Fly.io](https://fly.io/) account is created
- [Flyctl](https://fly.io/docs/flyctl/) (Fly.io CLI) is installed

### Initial Setup

```bash
nvm use # Switches to the Node version specified in the `.nvmrc` file.
nvm install # Only needed if you don't already have the Node version specified in the `.nvmrc` already installed
npm install
```

### Running

```bash
npm run dev
```

Use a browser, `cURL`, or a GUI client like `Postman` to hit the API e.g. [http://localhost:3001/api/persons](http://localhost:3001/api/persons)

Also, if you have the `REST Client` extension in VS Code, you can hit the endpoints
by opening the sample requests in the `requests` folder of this project and clicking
the `Send Request` button.

## Deploy app to Production

The below commands deploy the whole app to `Fly.io`. This includes statically serving the production build of the `phonebook-frontend` React project.

```bash
fly auth login
npm run deploy:full
fly open
```
