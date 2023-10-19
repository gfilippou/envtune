![envtune](./assets/envtuneLogo.drawio.svg)

Define and manage environment variables in a TypeScript file, and seamlessly switch between environments in your scripts.

## Why

Because you shouldn't have to hardcode environment variables in multiple .env files, or switch between configuration variables

<!-- ## Table of Contents

- [Table of Contents](#table-of-contents)
- [Usage](#usage)
- [Installation](#installation)
  - [Advanced Usage](#advanced-usage)-
- [Configuration](#configuration)
- [Peer Dependencies](#peer-dependencies)
- [Development](#development)
  - [Building the Project](#building-the-project)
  - [Running Tests](#running-tests)
- [Contributing](#contributing)
- [License](#license) -->

## Install

Install with npm `npm install envtune` or yarn `yarn add envtune`

## Simple Usage

1. Create a `.envtunerc.ts` or `.envtunerc.js` file at your project's root, and add all your environments and environment variables

```typescript
// .envtunerc.ts
const prod = {
  ENV_NAME: "Production",

  // React
  REACT_APP_API_URL_QUERY: "https://api.prod.example.com/query",
  REACT_APP_API_URL_DOWNLOAD: "https://api.prod.example.com/download",
  REACT_APP_FAVICON_URL: "https://prod.example.com/favicon.ico",
  HOST: "prod.example.com",
  PORT: 443,
  SSL_CRT_FILE: "/etc/ssl/prod.crt",
  SSL_KEY_FILE: "/etc/ssl/prod.key",
  HTTPS: true,
  REACT_APP_HTTPS: true,
  GENERATE_SOURCEMAP: true,

  // External services
  HUBSPOT_URL: "https://hubspot.prod.example.com",
  SENTRY_URL: "https://sentry.prod.example.com",
  FLAGSMITH_URL: "https://flagsmith.prod.example.com",
};
```

1. Rejoice

## Advanced Configuration

You can configure `envtune` using ...

## Peer Dependencies

This package relies on [env-cmd](https://www.npmjs.com/package/env-cmd) as a peer dependency. Make sure to install it:

```bash
npm install env-cmd
```

Or

```bash
yarn add env-cmd
```

## Development

### Building the Project

To build the project, run the following command:

```bash
npm run build
```

### Running Tests

To run tests, execute:

```bash
npm test
```

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License. See [LICENSE.md](LICENSE.md) for details.
