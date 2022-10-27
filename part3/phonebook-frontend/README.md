## Local Development

### Prerequisites

- (Optional) [nvm](https://github.com/nvm-sh/nvm) is installed
- [Node & npm](https://nodejs.org/en/download/) is installed

### Initial Setup

```bash
nvm use # Switches to the Node version specified in the `.nvmrc` file.
nvm install # Only needed if you don't already have the Node version specified in the `.nvmrc` already installed
npm install
```

### Running

Runs development server of this React app at [http://localhost:3000](http://localhost:3000) and also the `phonebook-backend` Express app.

```bash
npm run start:dev
```
